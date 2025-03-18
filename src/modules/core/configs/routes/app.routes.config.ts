import { RouteTree } from '@/modules/core/@core-types/routes';
import { entityManagementRoutes } from '@/modules/entity-management/config/entityManagementRoutes.config';
import { notificationRoutes } from '@/modules/notification/config/notificationRoutes.config';
import { productRoutes } from '@/modules/product/config/productRoutes.config';

export const appRoutes: RouteTree[] = [
   ...entityManagementRoutes,
   ...productRoutes,
   ...notificationRoutes
];