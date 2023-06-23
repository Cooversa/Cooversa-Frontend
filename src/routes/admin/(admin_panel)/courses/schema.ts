import z from 'zod';

export const schema = z.object({
	name: z.string({
		required_error: 'Course name is required'
	}),
	description: z.string({
		required_error: 'Course description is required'
	}),
	excerpt: z.string({
		required_error: 'Course excerpt is required'
	}),
	featuredImage: z.string({
		required_error: 'Course featured image is required'
	}),
	schoolId: z.string().optional(),
	acceptedStatuses: z.array(z.string()).min(1, 'At least one status is required')
});
