import { useEffect, useState } from 'react';
import { Box, ScrollArea } from '@mantine/core';
import Menu from '../vertical-menu/Menu';
import classes from './SideNav.module.scss'


const SideNav = () => {

    return(<nav className={classes.sidenav}>
            <ScrollArea type='hover' h={350} className={classes['sidenav-scroll']}>
                <Box mih={220} py='md'>
                    <Menu />
                </Box>
            </ScrollArea>
           </nav>)
}

export default SideNav;