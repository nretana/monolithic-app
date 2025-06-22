import { Title } from '@mantine/core';
import SignInForm from '@/modules/auth//components/sign-in/SignInForm';

const SignInView = () => {
  return (
    <>
      <title> Mono App | Sign In</title>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='max-w-[350px] min-w-[350px]'>
          <Title order={2} className='text-center mb-3'>
            Welcome to App
          </Title>
          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default SignInView;
