import { lazy } from 'react';
import { RouteTree } from '@/modules/core/@core-types/routes';
import { NOTIFICATION_KEY, NOTIFICATION_PATH } from '@/modules/notification/constants/notification.routes.constants';

export const notificationRoutes: RouteTree[] = [
    {
        key: NOTIFICATION_KEY,
        path: NOTIFICATION_PATH,
        component: lazy(() => import('../views/NotificationView')),
        authority: [],
        subRoute: []
    }
];