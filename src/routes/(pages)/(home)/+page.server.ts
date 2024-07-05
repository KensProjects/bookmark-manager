import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { checkBookmark } from '$lib/server/bookmark-schema';
import type { Actions, PageServerLoad } from './$types';

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

		const createdBookmark = { name, url, createdById: event.locals.user.id }
		
			return await prisma.bookmark.create({
				data: createdBookmark
			});
		
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
