import { lucia } from '$lib/server/auth';
import { fail, redirect} from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { checkFormCredentials } from '$lib/server/input-schema';
import prisma from '$lib/prisma';
import { hash } from '@node-rs/argon2';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/');
};

export const actions: Actions = {
	default: async (event) => {
		try {
			const formData = await event.request.formData();
			const username = formData.get('username') as string;
			const password = formData.get('password') as string;
			const input = { username, password };

			const checkedFormCredentials = checkFormCredentials(input);

			if (checkedFormCredentials.success === false) {
				return fail(400);
			}

			const userId = generateIdFromEntropySize(10);
			const passwordHash = await hash(password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			const existingUser = await prisma.user.findUnique({
				where: {
					username
				}
			});

			if (existingUser) {
				return fail(401);
			}

			await prisma.user.create({
				data: {
					username,
					password: passwordHash
				}
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			redirect(302, '/');
		} catch (error) {
			console.log(error);
		}
	}
};
