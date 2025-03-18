import { createBrowserRouter, createRoutesFromElements, Routes, Route, Navigate } from 'react-router-dom';
import type { RouteTree } from '@/modules/core/@core-types/routes';
import { protectedRoutes, publicRoutes, miscRoutes, errorRoutes } from '@/modules/core/configs/routes/all.routes.config';
import { appConfig } from '@/modules/core/configs/app.config';
import { BASE_PATH } from '@/modules/core/constants/app.constant';
import { PROTECTED_ROUTE, PUBLIC_ROUTE, OTHER_ROUTE } from '@/modules/core/constants/routes.constant';
import AppLayout from '@/modules/core/components/layouts/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { FallbackContent } from '@/modules/core/components/shared/FallbackContext';

const AppRouter = () => {

    const allRoutes = createRoutesFromElements(
        <Route>
            <Route errorElement={<FallbackContent />}>
                <Route path={BASE_PATH} element={<ProtectedRoute />}>
                    <Route path={BASE_PATH} element={<Navigate replace to={appConfig.authenticatedEntryPath} />} />
                    {protectedRoutes.map((route: RouteTree) => <Route key={route.key}
                                                                    path={route.path} 
                                                                    element={<AppLayout route={route} 
                                                                                        routeType={PROTECTED_ROUTE} />} />)}
                </Route>
                <Route path={BASE_PATH} element={<PublicRoute />}>
                    {publicRoutes.map((route: RouteTree) => <Route key={route.key}
                                                                path={route.path}
                                                                element={<AppLayout route={route} 
                                                                                    routeType={PUBLIC_ROUTE} />} />)}
                </Route>
                {miscRoutes.map((route: RouteTree) => <Route key={route.key} 
                                                            path={route.path} 
                                                            element={<AppLayout route={route} 
                                                                                routeType={OTHER_ROUTE} />} /> )}
            </Route>
            {errorRoutes.map((route: RouteTree) => <Route key={route.key} 
                                                            path={route.path} 
                                                            element={<AppLayout route={route} 
                                                                                routeType={OTHER_ROUTE} />} /> )}
        </Route>);

    return allRoutes;
}

export const allRoutes = createBrowserRouter(AppRouter(),  { future: {
    v7_relativeSplatPath: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
    v7_fetcherPersist: true
  }});