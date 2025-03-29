import { IconMenu2 } from '@tabler/icons-react';
import { IconButton } from '@/modules/core/components/shared/icon-button/IconButton';
import { setSideNavCollapse, useAppDispatch, useAppSelector } from '@/modules/core/store';


const SideBarToggle = () => {

    const dispatch = useAppDispatch();
    const isSideNavCollapsed = useAppSelector(state => state.theme.sideNavCollapse);

    const onCollapseMenuHandler = () => dispatch(setSideNavCollapse(!isSideNavCollapsed));
    
    return(<IconButton icon={IconMenu2} 
                       ariaLabel='Collapse menu'
                       onClick={onCollapseMenuHandler} />)
}

export default SideBarToggle;