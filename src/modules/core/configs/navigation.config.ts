import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { entityManagementNavigationRoutes } from '@/modules/entity-management/configs/entityManagement.navigation.config';
import { notificationNavigationRoutes } from '@/modules/notification/configs/notification.navigation.config';
import { productNavigationRoutes } from '@/modules/product/configs/product.navigation.config';

export const navigationRoutes: NavigationTree[] = [
    ...entityManagementNavigationRoutes,
    ...productNavigationRoutes,
    ...notificationNavigationRoutes
];