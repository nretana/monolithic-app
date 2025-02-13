import { Anchor, Button, Title } from '@mantine/core';

const NotFoundView = () => {
  return (
    <section className='flex justify-center items-center text-center h-screen'>
      <div>
        <Title order={1}>Page Not Found</Title>
        <p className='my-4'>
          We weren't able to find the page you are looking for. Try going back home page  and see our <Anchor href='/'>Help center</Anchor> section for more information. 
        </p>
        <Button>Home Page</Button>
      </div>
    </section>
  );
};

export default NotFoundView;
