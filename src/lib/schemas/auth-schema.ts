import { z } from 'zod';

export const formSchema = z.object({
	username: z.string({ message: 'Invalid credentials' }).min(6).max(32).trim(),
	password: z.string({ message: 'Invalid credentials' }).min(8).max(64).trim()
});

export type FormSchema = typeof formSchema;
