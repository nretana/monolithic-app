import { useResponsive } from '@/modules/core/hooks/useResponsive';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import UserMenu from '../user-menu/UserMenu';
import SideBarToggle from '../sidebar-toggle/SideBarToggle';
import { NotificationMenu } from '../notification-menu/NotificationMenu';
import { SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE } from '@/modules/core/constants/theme.constant';

import classes from './Header.module.css';

const Header = () => {

    const { currentScreenSize } = useResponsive();

    return(<header className={`${classes.header} flex justify-between items-center w-full px-4`}>
            <div>
               { (currentScreenSize === SMALL_SIZE || currentScreenSize === MEDIUM_SIZE) && <SideBarToggle /> }
            </div>
            <div className='flex items-center'>
                <ThemeToggle />
                <NotificationMenu />
                <UserMenu />
            </div>
          </header>)
}

export default Header;