import { lazy } from 'react';
import { RouteTree } from '@/modules/core/@core-types/routes';
import { ADMIN, USER } from '@/modules/core/constants/roles.constants';
import { DASHBOARD_KEY, DASHBOARD_PATH, 
         NOTIFICATIONS_KEY, NOTIFICATIONS_PATH,
         ORDERS_KEY, ORDERS_PATH } from '@/modules/features/constants/featureRoutes.constants';
         

export const featureRoutes: RouteTree[] = [
    {
        key: DASHBOARD_KEY,
        path: DASHBOARD_PATH,
        component: lazy(() => import('../views/DashboardView')),
        authority: [ADMIN, USER],
        subRoute: []
    },
    {
        key: NOTIFICATIONS_KEY,
        path: NOTIFICATIONS_PATH,
        component: lazy(() => import('../views/NotificationsView')),
        authority: [ADMIN, USER],
        subRoute: []
    },
    {
        key: ORDERS_KEY,
        path: ORDERS_PATH,
        component: lazy(() => import('../views/OrdersView')),
        authority: [ADMIN],
        subRoute: []
    }
];