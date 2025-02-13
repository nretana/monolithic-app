import { CommonProps } from '@/modules/core/@core-types/common';
import { Container } from '@mantine/core';


import classes from './SideLayout.module.scss';

const SideLayout: React.FC<CommonProps> = ({ children }) => {

    return(<Container fluid={true} className='h-full' px={0}>
        <div className='grid grid-cols-2 h-full'>
            <div className='h-full relative'>
                {children}
            </div>
            <div className='w-full h-dvh'>
                <div className={classes['right-side-layout']} />
            </div>
        </div>
    </Container>)
}

export default SideLayout;