import { Button, Title } from '@mantine/core';

const InternalServerErrorView = () => {
  return (
    <section className='flex justify-center items-center text-center h-screen'>
      <div>
        <Title order={1}>Internal server error!</Title>
        <p className='my-4'>
          The server encountered an error and could nort complete your request.
          Please, try again later.
        </p>
        <Button component='a' href='/'>Retry</Button>
      </div>
    </section>
  );
};

export default InternalServerErrorView;
