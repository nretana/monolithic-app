import { Title } from '@mantine/core';
import SignUpForm from '@/modules/auth/components/sign-up/SignUpForm';

const SignUpView = () => {

    return(<div className='flex items-center justify-center w-full h-full'>
                <div className='max-w-[350px] min-w-[350px]'>
                    <Title order={2} className='text-center mb-3'>Create your Account</Title>
                    <SignUpForm />
                </div>
            </div>)
}

export default SignUpView;