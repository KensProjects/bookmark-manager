import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { verify } from '@node-rs/argon2';

import { checkFormCredentials } from '$lib/server/input-schema';
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

			const checkedInput = checkFormCredentials(input);

			if (!checkedInput.success) {
				return fail(400);
			}

			const existingUser = await prisma.user.findUnique({
				where: { username }
			});
			if (!existingUser) {
				return fail(400, {
					message: 'Login failed!'
				});
			}

			const validPassword = await verify(existingUser.password, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});
			if (!validPassword) {
				return fail(400, {
					message: 'Login failed!'
				});
			}

			const session = await lucia.createSession(existingUser.id, {});
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
