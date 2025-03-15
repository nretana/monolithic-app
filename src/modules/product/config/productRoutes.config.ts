import { lazy } from 'react';
import { RouteTree } from '@/modules/core/@core-types/routes';
import { PRODUCT_KEY, PRODUCT_PATH } from '@/modules/product/constants/product.routes.constant';

export const productRoutes: RouteTree[] = [
    {
        key: PRODUCT_KEY,
        path: PRODUCT_PATH,
        component: lazy(() => import('../views/ProductView')),
        authority: [],
        subRoute: []
    }
];