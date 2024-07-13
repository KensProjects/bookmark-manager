import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { formSchema } from '$lib/schemas/auth-schema';
import prisma from '$lib/prisma';
import { hash } from '@node-rs/argon2';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/');
	const registerForm = await superValidate(event, zod(formSchema));
	return { registerForm };
};

export const actions: Actions = {
	default: async (event) => {
		const registerForm = await superValidate(event, zod(formSchema));

		try {
			const existingUser = await prisma.user.findUnique({
				where: { username: registerForm.data.username }
			});
			if (existingUser) {
				return setError(registerForm, 'username', 'Registration error!');
			}

			const hashedPassword = await hash(registerForm.data.password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			const newUser = await prisma.user.create({
				data: { ...registerForm.data, password: hashedPassword }
			});
			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			return { registerForm };
		} catch (err) {
			console.error(err);
		}
	}
};
