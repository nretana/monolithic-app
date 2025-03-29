import { Box, Drawer, ScrollArea} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Menu from '../vertical-menu/Menu';
import { LogoHeader } from '../logo-header/LogoHeader';
import { setSideNavCollapse, useAppDispatch, useAppSelector } from '@/modules/core/store';

import classes from './MobileNav.module.css';
import { useEffect } from 'react';


export const MobileNav = () => {
    const [opened, { open, close }] = useDisclosure(true);
    const dispatch = useAppDispatch();
    const isSideNavCollapsed = useAppSelector(state => state.theme.sideNavCollapse);
    const currentRouteKey = useAppSelector(state => state.base.currentRouteKey);

    const onClose = () => {
        dispatch(setSideNavCollapse(!isSideNavCollapsed));
        close();
    }

    useEffect(() => {
        if(opened || isSideNavCollapsed) {
            onClose();
        }
    }, [currentRouteKey]);

    const mobileNavHeader = <LogoHeader />

    return(<>{ isSideNavCollapsed && 
            <Drawer classNames={{ root: classes['mobile-nav'],
                                  body: classes['mobile-nav-body'] }}
                    title={mobileNavHeader}
                    opened={isSideNavCollapsed || opened} 
                    onClose={onClose} 
                    position='left' 
                    size='xs' 
                    offset={8} 
                    radius='sm' 
                    zIndex={410}
                    removeScrollProps={{ removeScrollBar: true }}>
                        <Box mih={220}>
                           <ScrollArea type='hover' mih={350}>
                            <Menu />
                           </ScrollArea>
                        </Box>
            </Drawer> } </>)
}