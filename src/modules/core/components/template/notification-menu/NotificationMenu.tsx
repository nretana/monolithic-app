import React, { forwardRef, useState, useEffect } from 'react';
import { Divider, ScrollArea, Box, Indicator, Popover, List, Text, Anchor  } from '@mantine/core';
import IconButton from '@/modules/core/components/shared/icon-button/IconButton';
import { IconBell } from '@tabler/icons-react';
import NotificationMenuItem from './notification-menu-item/NotificationMenuItem';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import type { Notification } from '@/modules/core/@core-types/notification';
import { WS_BASE_URL } from '@/modules/core/constants/api.constant';

import classes from './NotificationMenu.module.scss';


interface NotificationToggleProps extends React.ComponentPropsWithoutRef<'button'> {
    isNewMessage?: boolean,
    isUnreadNotifications: boolean
}

const NotificationToggle: React.FC<NotificationToggleProps> = forwardRef<HTMLButtonElement, NotificationToggleProps>((props, ref) => {
        return(<>
                { props.isNewMessage || props.isUnreadNotifications ?
                    <Indicator inline processing color='red' size={12}>
                        <IconButton icon={IconBell}
                                    ariaLabel='Show notification menu'
                                    ref={ref} 
                                    className='me-2'
                                    {...props} />
                    </Indicator> : 
                    <IconButton icon={IconBell}
                                ariaLabel='Show notification menu'
                                ref={ref} 
                                className='me-2'
                                {...props} /> 
                } </>)
    }
);

const NotificationMenu = () => {

    const { lastMessage, readyState } = useWebSocket(WS_BASE_URL);
    const [notificationHistory , setNotificationHistory] = useState<Notification[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
    }[readyState];

    useEffect(() => {
        if(lastMessage !== null){
            const currentNotification = JSON.parse(lastMessage.data) as Notification;
            const notificationFound = notificationHistory.find(message => message.NotificationId === currentNotification.NotificationId);
            if(!notificationFound){
                setNotificationHistory(prevState => [currentNotification, ...prevState]);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        const unReadCount = notificationHistory.filter(message => !message.IsRead).length;
        setUnreadNotifications(unReadCount);
    }, [notificationHistory]);

    const marksAsReadHandler = (notificationId: string) => {
        setNotificationHistory(prevState => {
            const notificationIndex = prevState.findIndex(message => message.NotificationId === notificationId);

            if(notificationIndex == -1) return prevState;
            if(prevState[notificationIndex].IsRead) return prevState;

            const newArr = [ ...prevState ];
            newArr[notificationIndex].IsRead = true;
            return [...newArr];
        });
    }

   return (<Popover width={350} withArrow={false}>
                <Popover.Target>
                    <NotificationToggle isUnreadNotifications={unreadNotifications > 0} />
                </Popover.Target>
                <Popover.Dropdown className={classes['notification-menu']}>
                    <Text size='xs' 
                          fw={500} 
                          className={classes['notification-menu-label']}>
                        Notifications
                    </Text>
                    <Divider />
                    <ScrollArea h={200}>
                        <List listStyleType='none' 
                              className='w-full' 
                              classNames={{ root: 'w-full', itemWrapper: 'w-full', itemLabel: 'w-full' }}>
                              {notificationHistory.length > 0 && notificationHistory.map((message, index) => {
                                 return(<List.Item key={`notification_${index}`} onClick={() => marksAsReadHandler(message.NotificationId)}>
                                          <NotificationMenuItem notificationItem={message} />
                                        </List.Item>)} )
                               }
                        </List>
                    </ScrollArea>
                    <Divider />
                    <Box className={classes['notification-menu-footer']}>
                        <Anchor href='/'>View all activities</Anchor>
                    </Box>
                </Popover.Dropdown>
            </Popover>)
}

export default NotificationMenu;