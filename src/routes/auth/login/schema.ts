import * as yup from 'yup';


export type LoginValue = {
    email: string;
    password: string;
}


const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    // Password must be at least 8 characters long, contain at least one uppercase letter,
    // one lowercase letter, one number, and one special character
    password: yup.string()
        .required('Password is required'),
})


export default schema;