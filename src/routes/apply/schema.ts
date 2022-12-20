import * as yup from 'yup';


export type CreateUserType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    // Password must be at least 8 characters long, contain at least one uppercase letter,
    // one lowercase letter, one number, and one special character
    password: yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
            `Password must be at least 8 characters long, contain at least one uppercase letter, 
            one lowercase letter, one number, and one special character`
        )
        .required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})


export default schema;