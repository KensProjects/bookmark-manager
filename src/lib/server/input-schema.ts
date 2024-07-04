import { z } from 'zod';

const formSchema = z.object({
	username: z.string().min(6).max(32).trim(),
	password: z.string().min(8).max(64).trim()
});

export function checkFormCredentials(input: z.infer<typeof formSchema>) {
	return formSchema.safeParse(input);
}

export type FormSchema = typeof formSchema;
