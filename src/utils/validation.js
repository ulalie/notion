import { z } from 'zod'

export const User = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(8),
	date: z.number(),
})

export const UserSingUp = z
	.object({
		email: z.string().email({ message: 'Please enter a valid email' }),
		password: z
			.string()
			.min(8)
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter',
			})
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter',
			})
			.regex(/[0-9]/, { message: 'Password must contain at least one number' }), // Исправлено
		repeatPass: z.string(),
	})
	.refine(data => data.password === data.repeatPass, {
		message: 'Passwords must be equal',
		path: ['repeatPass'],
	})

export const NoteScheme = z.object({
	title: z.string().min(1, { message: "Title can't be empty" }),
	body: z.string().optional(),
})
