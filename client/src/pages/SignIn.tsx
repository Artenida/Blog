import FormComponent from '../components/user/FormComponent'

const inputs = [
    {
        type:"text",
        id:"username",
        name: 'username',
        placeholder:" Enter username...",
        label : 'Username'
    },
    {
        type:"password",
        id:"password",
        name: 'password',
        placeholder:"******",
        label : 'Password'
    }
];

const formProp = {
    title: 'Already part of us',
    name:'signIn',
    inputs:inputs
}


const SignIn = () =>  {
    return (
        < FormComponent formProp={formProp}/>
    )
}

export default SignIn;