import z from 'zod';

export const schema = z.object({
	name: z.string({
		required_error: 'Track name is required'
	}),
	description: z.string({
		required_error: 'Track description is required'
	}),
	schoolId: z.string({
		required_error: 'School is required'
	})
});
