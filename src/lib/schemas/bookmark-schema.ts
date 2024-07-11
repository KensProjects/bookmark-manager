import { z } from 'zod';

export const bookmarkSchema = z.object({
	name: z.string().min(1).max(200).optional(),
	url: z.string().url()
});

export const bookmarkIdSchema = z.object({
	id: z.string()
});
export const bookmarkFilterSchema = z.object({
	query: z.string().min(1).optional()
});

export type BookmarkSchema = typeof bookmarkSchema;
export type BookmarkIdSchema = typeof bookmarkIdSchema;
export type BookmarkFilterSchema = typeof bookmarkFilterSchema;
