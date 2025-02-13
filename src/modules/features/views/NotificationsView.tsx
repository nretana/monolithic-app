import { Title } from '@mantine/core';
import NotificationsTable from '../components/notifications/NotificationsTable';

const NotificationsView = () => {
  return (
    <section>
      <Title order={2} className='mb-3'>
        Notifications
      </Title>
      <NotificationsTable />
    </section>
  );
};

export default NotificationsView;
