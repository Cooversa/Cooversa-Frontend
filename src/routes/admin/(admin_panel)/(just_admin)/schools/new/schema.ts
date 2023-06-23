import z from 'zod';

export const schema = z.object({
	name: z.string({
		required_error: 'Name of the school is required'
	}),
	description: z.string({
		required_error: 'Description of the school is required'
	})
});
