import cx from 'clsx';
import { Menu, Text, rem } from '@mantine/core';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { Avatar, useMantineTheme } from '@mantine/core';
import useAuth from '@/modules/auth/hooks/useAuth';
import { useAppSelector } from '@/modules/core/store/hook';
import { notifications } from '@mantine/notifications';
import { systemNotifications } from '@/modules/core/configs/notifications.config';

import classes from './UserMenu.module.css';


const UserMenu = () => {

  const theme = useMantineTheme();
  const { signOut } = useAuth();
  const currentUser = useAppSelector(state => state.auth.user);

  const onSignOut = async() => {
    const response = await signOut();
    if (response?.status === 'failed'){
      notifications.show(systemNotifications.signOutSession);
    }
  }

  return (
    <Menu width={250}>
      <Menu.Target>
        <div className={cx(classes['user-menu-target'], 'flex items-stretch cursor-pointer px-2 p-2 h-full')}>
          <Avatar color={theme.primaryColor} size='lg'>
            <IconUser />
          </Avatar>
          <div className='ps-2 flex justify-center flex-col'>
            <div>
              <Text size='sm' className='block font-bold'>
                {currentUser.name}
              </Text>
              <Text size='sm'>
                {currentUser.email}
              </Text>
            </div>
          </div>
        </div>
      </Menu.Target>
      <Menu.Dropdown className={classes['user-menu']}>
        <Menu.Item leftSection={<IconSettings className={classes['icon']} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconUser className={classes['icon']} />}>Profile</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout className={classes['icon']} />} 
                   onClick={onSignOut}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
