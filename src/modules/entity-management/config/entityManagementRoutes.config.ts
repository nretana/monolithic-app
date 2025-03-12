import { lazy } from 'react';
import { RouteTree } from '@/modules/core/@core-types/routes';
import { ADMIN, USER } from '@/modules/core/constants/roles.constant';
import { ENTITY_MANAGEMENT_KEY, ENTITY_MANAGEMENT_PATH } from '@/modules/entity-management/constants/entityManagement.routes.constant';
         

export const entityManagementRoutes: RouteTree[] = [
    {
        key: ENTITY_MANAGEMENT_KEY,
        path: ENTITY_MANAGEMENT_PATH,
        component: lazy(() => import('../views/EntityManagementView')),
        authority: [ADMIN, USER],
        subRoute: []
    }
];