import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import {
	bookmarkFilterSchema,
	bookmarkIdSchema,
	bookmarkSchema
} from '$lib/schemas/bookmark-schema';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');

	const createForm = await superValidate(event, zod(bookmarkSchema));
	const deleteForm = await superValidate(event, zod(bookmarkIdSchema));
	const filterForm = await superValidate(event, zod(bookmarkFilterSchema));
	const searchParams = event.url.searchParams;
	let bookmarkPage = searchParams.get('page') ?? '1';

	if (parseInt(bookmarkPage) < 1) {
		bookmarkPage = '1';
	}

	const convertedPage = parseInt(bookmarkPage);

	const userProfile = await prisma.user.findUnique({
		where: {
			id: event.locals.user?.id
		},
		select: {
			username: true,
			bookmarks: { take: 10, skip: (convertedPage - 1) * 10 }
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
		profile,
		count,
		createForm,
		deleteForm,
		filterForm,
		page: convertedPage
	};
};

export const actions: Actions = {
	createBookmark: async (event) => {
		const createForm = await superValidate(event, zod(bookmarkSchema));
		if (!createForm.valid) {
			return fail(400, {
				createForm
			});
		}

		const createdBookmark = await prisma.bookmark.create({
			data: {
				...createForm.data,
				createdById: event.locals.user!.id
			}
		});
		return {
			createForm,
			createdBookmark
		};
	},
	deleteBookmark: async (event) => {
		const deleteForm = await superValidate(event, zod(bookmarkIdSchema));

		const deletedBookmark = await prisma.bookmark.delete({
			where: {
				...deleteForm.data
			}
		});
		return {
			deletedBookmark,
			deleteForm
		};
	},
	filterBookmarks: async (event) => {
		const filterForm = await superValidate(event, zod(bookmarkFilterSchema));

		return { filterForm };
	}
};
