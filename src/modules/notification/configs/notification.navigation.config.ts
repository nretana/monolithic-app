import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { SINGLE_MENU_ITEM, COLLAPSE_MENU_ITEM } from '@/modules/core/constants/app.constant';
import { NOTIFICATION_PANEL_KEY, NOTIFICATION_KEY, NOTIFICATION_PATH } from '../constants/notification.routes.constants';
import { ADMIN, USER } from '@/modules/core/constants/roles.constant';
import { IconBell } from '@tabler/icons-react';


export const notificationNavigationRoutes: NavigationTree[] = [
    {
        key: NOTIFICATION_PANEL_KEY,
        path: '',
        title: 'Notifications',
        icon: IconBell,
        type: COLLAPSE_MENU_ITEM,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: NOTIFICATION_KEY,
                path: NOTIFICATION_PATH,
                title: 'Messages',
                icon: '',
                type: SINGLE_MENU_ITEM,
                authority: [ADMIN, USER],
                subMenu: []
            }
        ]
    }
]  