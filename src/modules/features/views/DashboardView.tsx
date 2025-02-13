import { Title } from '@mantine/core';
import DashboardTable from '@/modules/features/components/dashboard/DashboardTable';


const DashBoardView = () => {

    return(<section className='relative h-full'>
        <Title order={2} className='mb-3'>Dashboard</Title>
        <DashboardTable />
    </section>)
}

export default DashBoardView