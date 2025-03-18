import cx from 'clsx';
import dayjs from 'dayjs';
import type { Notification } from '@/modules/core/@core-types/notification';
import { Text } from '@mantine/core';
import { NotificationAvatar } from '@/modules/core/components/template/notification-menu/notification-avatar/NotificationAvatar';
import classes from './NotificationMenuItem.module.css';


const NotificationMenuItem = ({ notificationItem } : { notificationItem: Notification }) => {

  const timeDiff = dayjs(notificationItem.CreatedAt).fromNow();

  return (
    <div className={cx(classes['notification-menu-item'], (notificationItem.IsRead && classes['read']), 'px-3 p-2')}>
      <div className='flex justify-between w-full'>
        <div className='flex'>
          <NotificationAvatar notificationType={notificationItem.Type} />
          <div className='ps-2 flex justify-center flex-col'>
            <div>
              <Text size='sm' className='block font-semibold'>
                {notificationItem.Message}
              </Text>
              {/* <Text size='xs'>7 March 2023 <small>•</small> 12: 30 PM</Text> */}
              <Text size='xs'>{timeDiff}</Text>
            </div>
          </div>
        </div>
        <div className={notificationItem.IsRead ? classes['read'] : classes['unread']}></div>
      </div>
    </div>
  );
};

export default NotificationMenuItem;
