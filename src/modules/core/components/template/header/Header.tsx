import ThemeToggle from '../theme-toggle/ThemeToggle';
import UserMenu from '../user-menu/UserMenu';
import SideBarToggle from '../sidebar-toggle/SideBarToggle';
import { NotificationMenu } from '../notification-menu/NotificationMenu';

import classes from './Header.module.css';

const Header = () => {

    return(<header className={`${classes.header} flex justify-between items-center w-full px-4 py-2`}>
            <div>
                <SideBarToggle />
            </div>
            <div className='flex items-center'>
                <ThemeToggle />
                <NotificationMenu />
                <UserMenu />
            </div>
          </header>)
}

export default Header;