import * as yup from 'yup';

type Role = 'student' | 'teacher';

export type CreateUserType = {
	email: string;
	password: string;
	passwordConfirm: string;
	role: Role;
	is_active: boolean;
};

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
			`Password must be at least 8 characters long, contain at least one uppercase letter,
			one lowercase letter, and one number`
		)
		.required('Password is required'),
	passwordConfirm: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default schema;
