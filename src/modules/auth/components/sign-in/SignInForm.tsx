
import * as yup from 'yup';
import { useForm } from '@mantine/form';
import { Anchor, Box, Divider, PasswordInput, TextInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { yupResolver } from '@mantine/form';
import useAuth from '@/modules/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useQuery from '@/modules/core/hooks/useQuery';
import { REDIRECT_URL_KEY } from '@/modules/core/constants/app.constant';
import appConfig from '@/modules/core/configs/app.config';
import { SSO_GOOGLE_IDP_HINT_PARAM,
         SSO_GITHUB_IDP_HINT_PARAM } from '@/modules/auth/constants/auth.api.constant';

import Alert from '@/modules/core/components/shared/alert/Alert';
import { useEffect, useState } from 'react';
import LoadingOverlay from '@/modules/core/components/shared/loading-overlay/LoadingOverlay';

type SignInFormState = {
    username: string,
    password: string
}

const signInFormSchema = yup.object().shape({
    username: yup.string().required('Please enter your email address'),
    password: yup.string().required('Please enter your password')
})

const SignInForm = () => {

    const navigate = useNavigate();
    const query = useQuery();
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoadingState, setLoadingState] = useState<boolean>(false);
    const { signIn, signInSSO } = useAuth();
    

    const signInForm = useForm<SignInFormState>({
        initialValues: {
            username: 'madams@test.com',
            password: '12345'
        },
        validate: yupResolver(signInFormSchema)
    });

    const onSubmitForm = async() => {
        setLoadingState(true);
        const response = await signIn({ username: signInForm.values.username,
                                        password: signInForm.values.password });
        if(response && response?.status === "failed"){
            setIsError(true);
            setLoadingState(false);
            setErrorMessage(response.message);
            return;
        }

        setLoadingState(false);
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
    }

    const onClickSignSSO = async (idpHint: string) => {
        await signInSSO(idpHint);
    }

    return(
        <div className='w-full'>
            { isError && <Alert severity='error' className='mb-2'>
                            {errorMessage}
                        </Alert> }

            <Box>
                <LoadingOverlay visible={isLoadingState} />
                <form onSubmit={signInForm.onSubmit(onSubmitForm)}>
                    <div>
                        <div className='mb-3'>
                            <TextInput label='Email' 
                                    key={signInForm.key('username')} 
                                    {...signInForm.getInputProps('username')} />
                        </div>
                        <div className='mb-2'>
                            <PasswordInput label='Password'
                                           key={signInForm.key('password')} 
                                           {...signInForm.getInputProps('password')} />
                        </div>
                        <div className='flex justify-end mb-3'>
                            <Anchor href='/'>Forgot Password</Anchor>
                        </div>
                        <Button type='submit' className='w-full' >Sign In</Button>
                    </div>
                </form>
                <Divider label='Or' className='block my-3' />
                <div className='flex justify-center mb-3'>
                    <Button variant='outline' 
                            type="button"
                            leftSection={<IconBrandGoogle stroke={1} />} 
                            className='me-2'
                            onClick={() => onClickSignSSO(SSO_GOOGLE_IDP_HINT_PARAM)}>Google</Button>
                    <Button variant='outline'
                            type="button" 
                            leftSection={<IconBrandGithub stroke={1} />}
                            onClick={() => onClickSignSSO(SSO_GITHUB_IDP_HINT_PARAM)}>Github</Button>
                </div>
                <Divider className='block mt-4 mb-3' />
                <div className='text-center'>
                    <p className='me-1'>Don't have an account yet?<Anchor href='/sign-up' className='ms-1'>Sign Up</Anchor></p>
                </div>
            </Box>
        </div>)
}

export default SignInForm;