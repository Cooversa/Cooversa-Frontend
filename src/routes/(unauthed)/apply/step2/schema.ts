import * as yup from 'yup';

type Gender = 'male' | 'female' | 'prefer_not_to_say' | 'others';

export type CreateProfileType = {
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    gender: string;
    state: string;
    country: string;
}


const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    age: yup.number().required('Age is required').min(18, 'You must be 18 years or older'),
    phoneNumber: yup.string().required('Phone number is required'),
    gender: yup.string().required('Gender is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
})


export default schema;