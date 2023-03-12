import * as yup from 'yup';
import { z } from 'Zod';

export type CreateProfileType = {
	firstName: string;
	lastName: string;
	age: number;
	phoneNumber: string;
	gender: string;
	state: string;
	country: string;
};

// const schema = yup.object().shape({
// 	firstName: yup.string().required('First name is required'),
// 	lastName: yup.string().required('Last name is required'),
// 	age: yup.number().required('Age is required').min(18, 'You must be 18 years or older'),
// 	phoneNumber: yup.string().required('Phone number is required'),
// 	gender: yup.string().required('Gender is required'),
// 	state: yup.string().required('State is required'),
// 	country: yup.string().required('Country is required')
// });

const schema = z.object({
	firstName: z.string({ required_error: 'First name is required' }),
	lastName: z.string({ required_error: 'Last name is required' }),
	age: z.number({ required_error: 'Age is required' }).min(18, 'You must be 18 years or older'),
	phoneNumber: z.string({ required_error: 'Phone number is required' }),
	gender: z.string({ required_error: 'Gender is required' }),
	state: z.string({ required_error: 'State is required' }),
	country: z.string({ required_error: 'Country is required' })
});

export default schema;
