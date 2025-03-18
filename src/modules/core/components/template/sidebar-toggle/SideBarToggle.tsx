import { IconMenu2 } from '@tabler/icons-react';
import { IconButton } from '@/modules/core/components/shared/icon-button/IconButton';
import { useResponsive } from '@/modules/core/hooks/useResponsive';

const SideBarToggle = () => {

    const { currentScreenSize } = useResponsive();

    const onCollapseMenuHandler = () => {
        if(currentScreenSize === "Small" || currentScreenSize === "Medium"){
            //collapse small menu
        }
        else {
            //collapse large menu
        }
    }
    
    return(<IconButton icon={IconMenu2} 
                       ariaLabel="Collapse menu" 
                       onClick={onCollapseMenuHandler} />)
}

export default SideBarToggle;