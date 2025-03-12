import { RouteTree } from '@/modules/core/@core-types/routes';
import { entityManagementRoutes } from '@/modules/entity-management/config/entityManagementRoutes.config';
import { notificationRoutes } from '@/modules/notification/config/notificationRoutes.config';

export const appRoutes: RouteTree[] = [
   ...entityManagementRoutes,
   ...notificationRoutes
];