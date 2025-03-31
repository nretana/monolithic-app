import { RouteTree } from '@/modules/core/@core-types/routes';
import { entityManagementRoutes } from '@/modules/entity-management/configs/entityManagement.routes.config';
import { notificationRoutes } from '@/modules/notification/configs/notification.routes.config';
import { productRoutes } from '@/modules/product/configs/product.routes.config';

export const appRoutes: RouteTree[] = [
   ...entityManagementRoutes,
   ...productRoutes,
   ...notificationRoutes
];