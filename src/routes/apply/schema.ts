import * as yup from 'yup';
import { z } from 'zod';

type Role = 'student' | 'teacher';

export type CreateUserType = {
	email: string;
	password: string;
	passwordConfirm: string;
	role: Role;
	is_active: boolean;
};

const mySchema = z.object({
	email: z
		.string({
            required_error: 'Email is required',
        })
		.email('Invalid email')
		.min(1, 'Email must be at least 1 character')
		.max(255, 'Email must be at most 255 characters'),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
            `Password must be at least 8 characters long, contain at least one uppercase letter, 
            one lowercase letter, one number, and one special character`
        ),
    confirmPassword: z
        .string({
            required_error: 'Confirm password is required',
        })
}).superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        })
    }
});

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	// Password must be at least 8 characters long, contain at least one uppercase letter,
	// one lowercase letter, one number, and one special character
	password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
			`Password must be at least 8 characters long, contain at least one uppercase letter, 
            one lowercase letter, one number, and one special character`
		)
		.required('Password is required'),
	passwordConfirm: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default schema;
