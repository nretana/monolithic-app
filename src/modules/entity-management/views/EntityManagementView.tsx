import { Title } from '@mantine/core';
import EntityManagement from '@/modules/entity-management/components/EntityManagement';

const EntityManagementView = () => {
  return (
    <>
      <title> Mono App | Entity Management</title>
      <section className='relative h-full'>
        <Title order={2} className='mb-3'>
          Dashboard
        </Title>
        <EntityManagement />
      </section>
    </>
  );
};

export default EntityManagementView;
