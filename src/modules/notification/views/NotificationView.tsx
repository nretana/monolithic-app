import { Title } from '@mantine/core';
import NotificationsTable from '../components/NotificationsTable';

const NotificationView = () => {
  return (
    <>
      <title> Mono App | Notifications</title>
      <section>
        <Title order={2} className='mb-3'>
          Notifications
        </Title>
        <NotificationsTable />
      </section>
    </>
  );
};

export default NotificationView;
