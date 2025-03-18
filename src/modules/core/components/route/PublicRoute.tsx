import { Navigate, Outlet } from 'react-router-dom';
import { appConfig } from '@/modules/core/configs/app.config';
import useAuth from '@/modules/auth/hooks/useAuth';

const PublicRoute = () => {

    const { authenticated } = useAuth();

    return(authenticated ? <Navigate to={appConfig.authenticatedEntryPath} /> : <Outlet />)
}

export default PublicRoute;