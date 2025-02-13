import { lazy } from 'react';
import { RouteTree } from '@/modules/core/@core-types/routes';
import { PROFILE_KEY, PROFILE_PATH } from '../constants/profileRoutes.constants';

export const profileRoutes: RouteTree[] = [
    {
        key: PROFILE_KEY,
        path: PROFILE_PATH,
        component: lazy(() => import('../views/ProfileView')),
        authority: [],
        subRoute: []
    }
];