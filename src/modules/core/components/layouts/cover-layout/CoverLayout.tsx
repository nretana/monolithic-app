import { CommonProps } from '@/modules/core/@core-types/common';
import { Container } from '@mantine/core';
import { Card } from '@mantine/core';

import classes from './CoverLayout.module.css';

export const CoverLayout: React.FC<CommonProps> = ({ children }) => {

    return(<Container fluid={true} className='h-full' px={0}>
        <div className={`grid grid-cols-1 place-content-center content-center place-items-center h-full ${classes['side-layout']}`}>
            <div className='h-full relativemd:col-span-1'>
                <Card className='p-6' withBorder>
                    {children}
                </Card>
            </div>
        </div>
    </Container>)
}