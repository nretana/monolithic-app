import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { SINGLE_MENU_ITEM, COLLAPSE_MENU_ITEM } from '@/modules/core/constants/app.constant';
import { ADMIN, USER } from '@/modules/core/constants/roles.constant';
import { ENTITY_MANAGEMENT_KEY,
         ENTITY_MANAGEMENT_PATH } from '@/modules/entity-management/constants/entityManagement.routes.constant';
import { IconLayoutGridAdd, IconUsers  } from '@tabler/icons-react';


export const entityManagementNavigationRoutes: NavigationTree[] = [
    /* {
        key:  DASHBOARD_KEY,
        path: DASHBOARD_PATH,
        title: 'Dashboard',
        icon: IconLayoutGridAdd ,
        type: SINGLE_MENU_ITEM,
        authority: [ADMIN, USER],
        subMenu: []
    }, */
    {
        key:  ENTITY_MANAGEMENT_KEY,
        path: ENTITY_MANAGEMENT_PATH,
        title: 'Entity Management',
        icon: IconUsers,
        type: SINGLE_MENU_ITEM,
        authority: [ADMIN],
        subMenu: []
    }
]