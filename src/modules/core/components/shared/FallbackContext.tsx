import { Navigate } from 'react-router-dom';
import { INTERNAL_SERVER_ERROR_PATH } from '@/modules/core/constants/routes.constant';

export const FallbackContent = () => {
    return(<Navigate to={INTERNAL_SERVER_ERROR_PATH} />)
}