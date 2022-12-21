import * as yup from 'yup';

type Role = 'student' | 'teacher';



export type CreateUserType = {
    email: string;
    password: string;
    passwordConfirm: string;
    role: Role;
    is_active: boolean;
}


const schema = yup.object().shape({
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