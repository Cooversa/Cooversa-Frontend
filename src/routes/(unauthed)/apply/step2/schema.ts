import * as yup from 'yup';

type Gender = 'male' | 'female' | 'prefer_not_to_say' | 'others';

export type CreateProfileType = {
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    gender: string;
    state: string;
    country: string;
    user: any;
    paid: boolean;
}


const schema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    age: yup.number().required('Age is required').min(18, 'You must be 18 years or older'),
    phone_number: yup.string().required('Phone number is required'),
    gender: yup.string().required('Gender is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
})


export default schema;