import prisma from '$lib/prisma';

export async function getProfile({ id }: { id: string }) {
	return await prisma.user.findUnique({
		where: {
			id
		},
		select: {
			username: true,
			bookmarks: true
		}
	});
}

export type UserProfile = Awaited<ReturnType<typeof getProfile>>;
