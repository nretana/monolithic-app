import React, { lazy } from 'react';
import { RouteTree } from '@/modules/core/@core-types/routes';
import { SIGNIN_PATH, SIGNUP_PATH } from '@/modules/auth/constants/auth.routes.constant';

export const authRoutes: RouteTree[] = [
    {
        key: 'signin-route',
        path: SIGNIN_PATH,
        component: lazy(() => import('../views/SignInView')),
        authority: [],
        subRoute: []
    },
    {
        key: 'signup-route',
        path: SIGNUP_PATH,
        component: lazy(() => import('../views/SignUpView')),
        authority: [],
        subRoute: []
    }
];