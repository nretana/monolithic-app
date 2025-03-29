import { useAppSelector } from '@/modules/core/store';
import { Box, ScrollArea } from '@mantine/core';
import Menu from '../vertical-menu/Menu';
import classes from './SideNav.module.css'


const SideNav = () => {

    //const isSideNavCollapsed = useAppSelector(state => state.theme.sideNavCollapse);

    return(<>
            <nav className={classes.sidenav}>
            <ScrollArea type='hover' h={350} className={classes['sidenav-scroll']}>
                <Box mih={220} py='md'>
                    <Menu />
                </Box>
            </ScrollArea>
           </nav>
          </>)
}

export default SideNav;