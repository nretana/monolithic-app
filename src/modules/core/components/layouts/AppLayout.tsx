import { RouteTree, RouteType } from '@/modules/core/@core-types/routes';
import React, { lazy, Suspense, useCallback, useEffect, useMemo } from 'react';
import MainLayout from './MainLayout';
import AuthorityGuard from '@/modules/core/components/route/AuthorityGuard';
import ViewRoute from '@/modules/core/components/route/ViewRoute';
import { PROTECTED_ROUTE, PUBLIC_ROUTE, OTHER_ROUTE } from '@/modules/core/constants/routes.constant';
import { useAppDispatch, useAppSelector } from '@/modules/core/store/hook';
import useAuth from '@/modules/auth/hooks/useAuth';
import { setCurrentRouteKey } from '@/modules/core/store';
import LoadingContent from '@/modules/core/components/shared/LoadingContent';


type AppLayoutProps = {
  route: RouteTree;
  routeType: RouteType;
};

const AppLayout: React.FC<AppLayoutProps> = ({ route, routeType }) => {
  const dispatch = useAppDispatch();
  const userAuthority = useAppSelector(state => state.auth.user.authority) as string[];
  const { authenticated } = useAuth();
  

  const onChangeRouteKey = useCallback(() => {
    dispatch(setCurrentRouteKey(route.key));
  }, [route.key]);

  useEffect(() => {
    onChangeRouteKey()
  }, [onChangeRouteKey]);

  const Layout = useMemo(() => {
    if (authenticated) {
      return MainLayout;
    }

    return lazy(() => import('@/modules/core/components/layouts/AuthLayout'));
    
  }, [authenticated]);

  return (
    <Suspense fallback={<LoadingContent />}>
      {routeType === PROTECTED_ROUTE &&
        <Layout>
          <AuthorityGuard userAuthority={userAuthority} 
                          authority={route.authority}>
            <ViewRoute routeKey={route.key} 
                       component={route.component} />
          </AuthorityGuard>
        </Layout>}

      {routeType === PUBLIC_ROUTE &&
        <Layout>
          <ViewRoute routeKey={route.key} 
                     component={route.component} />
        </Layout>}
      
        {routeType === OTHER_ROUTE &&
        <ViewRoute routeKey={route.key} 
                   component={route.component} />}

    </Suspense>
  );
};

export default AppLayout;
