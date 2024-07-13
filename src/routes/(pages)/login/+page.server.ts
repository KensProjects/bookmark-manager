import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { verify } from '@node-rs/argon2';

import { formSchema } from '$lib/schemas/auth-schema';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/');
	const loginForm = await superValidate(event, zod(formSchema));
	return { loginForm };
};

export const actions: Actions = {
	default: async (event) => {
		const loginForm = await superValidate(event, zod(formSchema));

		try {
			const existingUser = await prisma.user.findUnique({
				where: { username: loginForm.data.username }
			});
			if (!existingUser) {
				return setError(loginForm, 'username', 'Authenicaiton error!');
			}

			const validPassword = await verify(existingUser.password, loginForm.data.password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});
			if (!validPassword) {
				return setError(loginForm, 'username', 'Authenicaiton error!');
			}

			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			return { loginForm };
		} catch (err) {
			console.error(err);
		}
	}
};
