import prisma from '$lib/prisma';

export default async function deleteBookmark(bookmarkId: string) {
	if (!bookmarkId) return;
	try {
		return await prisma.bookmark.delete({
			where: {
				id: bookmarkId
			}
		});
	} catch (error) {
		console.error(error);
	}
}
