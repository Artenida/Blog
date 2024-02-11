import FormComponent from '../components/user/FormComponent';

// Define the interface for the form data
interface FormData {
    username: string;
    email: string;
    bio: string;
    password: string;
    confirmPassword: string;
}

// Define the Inputs interface
interface Inputs {
    type: string;
    id: string;
    name: string; // 'name' should correspond to a key of the FormData interface
    placeholder: string;
    label: string;
}

const inputs: Inputs[] = [
    {
        type: "text",
        id: "username",
        name: 'username', // 'username' corresponds to a key of the FormData interface
        placeholder: " Enter username...",
        label: 'Username'
    },
    {
        type: "email",
        id: "email",
        name: 'email', // 'email' corresponds to a key of the FormData interface
        placeholder: " email@email.com",
        label: 'Email'
    },
    {
        type: "text",
        id: "bio",
        name: 'bio', // 'bio' corresponds to a key of the FormData interface
        placeholder: " Enter bio...",
        label: 'Bio'
    },
    {
        type: "password",
        id: "password",
        name: 'password', // 'password' corresponds to a key of the FormData interface
        placeholder: "******",
        label: 'Password'
    },
    {
        type: "password",
        id: "confirmPassword",
        name: 'confirmPassword', // 'confirmPassword' corresponds to a key of the FormData interface
        placeholder: "******",
        label: 'Confirm password'
    }
];

const formProp = {
    title: 'Become part of us',
    name: 'signUp',
    inputs: inputs
}

const SignUp = () => {
    return (
        <FormComponent formProp={formProp} />
    )
}

export default SignUp;
