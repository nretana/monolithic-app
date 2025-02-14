import { useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import useAuth from '@/modules/auth/hooks/useAuth';
import useQuery from '@/modules/core/hooks/useQuery';
import { useForm, yupResolver } from '@mantine/form';
import { REDIRECT_URL_KEY } from '@/modules/core/constants/app.constant';
import appConfig from '@/modules/core/configs/app.config';
import { Anchor, Box, Button, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import Alert from '@/modules/core/components/shared/alert/Alert';
import LoadingOverlay from '@/modules/core/components/shared/loading-overlay/LoadingOverlay';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';


type SignUpFormState = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const signUpFormSchema = yup.object().shape({
    username: yup.string().required('Please enter your username or email address'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup.string().required('Confirm password doesn\'t match password')
})

const SignUpForm = () => {

    const navigate = useNavigate();
    const query = useQuery();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { signUp } = useAuth();
    const [visible, { toggle }] = useDisclosure(false);


    const signUpForm = useForm<SignUpFormState>({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: yupResolver(signUpFormSchema)
    });

    const onSubmitForm = async() => {
        toggle();
        const response = await signUp({ username: signUpForm.values.username,
                                        email: signUpForm.values.email,
                                        password: signUpForm.values.password });
        if(response && response?.status === "failed"){
            setIsError(true);
            setErrorMessage(response.message);
            return;
        }

        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
    }

    return(
        <div className='w-full'>
            { isError && <Alert severity='error' className='mb-2'>
                            {errorMessage}
                        </Alert> }
            <Box>
                <LoadingOverlay visible={visible} />
                <form onSubmit={signUpForm.onSubmit(onSubmitForm)}>
                    <div>
                        <div className='mb-3'>
                            <TextInput label='Username' 
                                    key={signUpForm.key('username')} 
                                    {...signUpForm.getInputProps('username')} />
                        </div>
                        <div className='mb-3'>
                            <TextInput label='Email' 
                                    key={signUpForm.key('email')} 
                                    {...signUpForm.getInputProps('email')} />
                        </div>
                        <div className='mb-2'>
                            <PasswordInput label='Password'
                                        key={signUpForm.key('password')} 
                                        {...signUpForm.getInputProps('password')} />
                        </div>
                        <div className='mb-2'>
                            <PasswordInput label='Confirm Password'
                                        key={signUpForm.key('confirmPassword')} 
                                        {...signUpForm.getInputProps('confirmPassword')} />
                        </div>
                        <Button type='submit' className='w-full' >Sign Up</Button>
                    </div>
                </form>
                <div className='mt-1'>
                    <Text size='xs'>By signing up, I accept the 
                        <Anchor className='mx-1' href='/terms-service'>Terms of Service</Anchor> 
                        and acknowledge the <Anchor href='/privacy-policy'>Privacy Policy</Anchor>.
                    </Text>
                </div>
                <Divider className='block my-3' />
                <div className='text-center'>
                    <div>Already have an account? <Anchor href='/sign-in'>Sign In</Anchor></div>
                </div>
            </Box>
        </div>)
}

export default SignUpForm;