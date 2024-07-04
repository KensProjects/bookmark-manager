import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../../(home)/$types';
import prisma from '$lib/prisma';
import { checkBookmark } from '$lib/server/bookmark-schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');

	const userProfile = await prisma.user.findUnique({
		where: {
			id: event.locals.user?.id
		},
		select: {
			username: true,
			bookmarks: true
		}
	});
	const bookmarks = await prisma.user.findUnique({
		where: {
			id: event.locals.user?.id
		},
		select: {
			_count: {
				select: {
					bookmarks: true
				}
			}
		}
	});
	const bookmarkCount = bookmarks?._count.bookmarks ?? 0;

	const [profile, count] = await Promise.all([userProfile, bookmarkCount]);

	return {
		user: event.locals.user,
		profile: profile,
		bookmarkCount: count
	};
};

export const actions: Actions = {
	createBookmark: async (event) => {
		if (!event.locals.user) redirect(302, '/login');

		const formData = await event.request.formData();
		let name = formData.get('bookmark-name') as string | undefined;
		if (!name) name = undefined;
		const url = formData.get('bookmark-url') as string;
		const bookmarkInput = { name, url };

		const checkedBookmarkInfo = checkBookmark(bookmarkInput);

		if (!checkedBookmarkInfo.success) {
			return fail(400);
		}

		if (name) {
			return await prisma.bookmark.create({
				data: {
					name,
					url,
					createdById: event.locals.user.id
				}
			});
		} else {
			return await prisma.bookmark.create({
				data: {
					url,
					createdById: event.locals.user.id
				}
			});
		}
	},
	deleteBookmark: async (event) => {
		const { id } = Object.fromEntries(await event.request.formData()) as { id: string };

		try {
			return await prisma.bookmark.delete({
				where: {
					id
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
};
