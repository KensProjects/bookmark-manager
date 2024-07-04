import { z } from 'zod';

const bookmarkSchema = z.object({
	name: z.string().min(1).max(200).optional(),
	url: z.string().url()
});

export function checkBookmark(input: z.infer<typeof bookmarkSchema>) {
	return bookmarkSchema.safeParse(input);
}

export type BookmarkSchema = typeof bookmarkSchema;
