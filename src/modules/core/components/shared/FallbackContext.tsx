import { Navigate } from 'react-router-dom';
import { INTERNAL_SERVER_ERROR_PATH } from '@/modules/core/constants/routes.constant';

const FallbackContent = () => {
    return(<Navigate to={INTERNAL_SERVER_ERROR_PATH} />)
}

export default FallbackContent;