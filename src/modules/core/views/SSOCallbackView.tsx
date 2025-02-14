import { useEffect } from 'react';
import { useAuth as useOidc } from 'react-oidc-context';
import LoadingContent from '@/modules/core/components/shared/LoadingContent';
import useQuery from '@/modules/core/hooks/useQuery';
import { SIGN_IN_AUTH_FLOW } from '@/modules/auth/constants/auth.api.constant';
import useAuth from '@/modules/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import appConfig from '../configs/app.config';

const SSOCallbackView = () => {

  const { user, error, isAuthenticated } = useOidc();
  const query = useQuery();
  const { signInSSOCallback } = useAuth();
  const navigate = useNavigate();

  const authFlow = query.get('authflow') || '';

  useEffect(() => {
    console.log(error);
    if(error){
      navigate(appConfig.authenticatedEntryPath);
      return;
    }

    if(isAuthenticated && user && authFlow === SIGN_IN_AUTH_FLOW){
      signInSSOCallback(user);
    }
  }, [isAuthenticated, error]);

  return <LoadingContent />;
};

export default SSOCallbackView;
