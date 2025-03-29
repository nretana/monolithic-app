import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { entityManagementNavigationRoutes } from '@/modules/entity-management/configs/entityManagementNavigation.config';
import { notificationNavigationRoutes } from '@/modules/notification/config/notificationNavigation.config';
import { productNavigationRoutes } from '@/modules/product/configs/productNavigation.config';

export const navigationRoutes: NavigationTree[] = [
    ...entityManagementNavigationRoutes,
    ...productNavigationRoutes,
    ...notificationNavigationRoutes
];