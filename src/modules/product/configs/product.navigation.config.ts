import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { SINGLE_MENU_ITEM } from '@/modules/core/constants/app.constant';
import { PRODUCT_KEY, PRODUCT_PATH } from '../constants/product.routes.constant';
import { ADMIN, USER } from '@/modules/core/constants/roles.constant';
import { IconPackage } from '@tabler/icons-react';

export const productNavigationRoutes: NavigationTree[] = [
    {
        key: PRODUCT_KEY,
        path: PRODUCT_PATH,
        title: 'Products',
        icon: IconPackage,
        type: SINGLE_MENU_ITEM,
        authority: [ADMIN, USER],
        subMenu: []
    }
]  