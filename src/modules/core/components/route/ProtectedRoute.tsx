import { Navigate, Outlet } from 'react-router-dom';
import { appConfig } from '@/modules/core/configs/app.config';
import useAuth from '@/modules/auth/hooks/useAuth';

const ProtectedRoute = () => {

    const { authenticated } = useAuth();

    return(!authenticated ? <Navigate to={appConfig.unAuthenticatedEntryPath} /> : <Outlet />)
}

export default ProtectedRoute;