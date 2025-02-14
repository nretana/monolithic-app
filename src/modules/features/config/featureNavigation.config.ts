
import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { SINGLE_MENU_ITEM, COLLAPSE_MENU_ITEM } from '@/modules/core/constants/app.constant';
import { ADMIN, USER } from '@/modules/core/constants/roles.constant';
import { FEATURES_PANEL_KEY,
         DASHBOARD_KEY,
         DASHBOARD_PATH,
         NOTIFICATIONS_KEY,
         NOTIFICATIONS_PATH,
         ORDERS_KEY,
         ORDERS_PATH } from '@/modules/features/constants/feature.routes.constant';
import { IconLayoutGridAdd, IconListTree  } from '@tabler/icons-react';


export const featureNavigationRoutes: NavigationTree[] = [
    {
        key:  DASHBOARD_KEY,
        path: DASHBOARD_PATH,
        title: 'Dashboard',
        icon: IconLayoutGridAdd ,
        type: SINGLE_MENU_ITEM,
        authority: [ADMIN, USER],
        subMenu: []
    },
    {
        key: FEATURES_PANEL_KEY,
        path: '',
        title: 'Features',
        icon: IconListTree,
        type: COLLAPSE_MENU_ITEM,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: NOTIFICATIONS_KEY,
                path: NOTIFICATIONS_PATH,
                title: 'Notifications',
                icon: '',
                type: SINGLE_MENU_ITEM,
                authority: [ADMIN, USER],
                subMenu: []
            },
            {
                key: ORDERS_KEY,
                path: ORDERS_PATH,
                title: 'Orders',
                icon: '',
                type: SINGLE_MENU_ITEM,
                authority: [ADMIN, USER],
                subMenu: []
            }
        ]
    }
]  