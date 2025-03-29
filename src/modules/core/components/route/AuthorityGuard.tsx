import type { PropsWithChildren } from 'react';
import useAuth from '@/modules/auth/hooks/useAuth';
import useAuthority from '@/modules/auth/hooks/useAuthority';
import { AccessForbiddenContent } from '@/modules/core/components/shared/AccessForbiddenContent';
import { TokenExpiredModal } from '../shared/TokenExpiredModal';


type AuthorityGuardProps = PropsWithChildren & {
    userAuthority: string[],
    authority: string[]
}

const AuthorityGuard: React.FC<AuthorityGuardProps> = ({ userAuthority = [], authority = [], children }) => {

    const isAuthorized = useAuthority(userAuthority, authority);
    const { tokenExpired } = useAuth();

    return(isAuthorized ? <> {tokenExpired && <TokenExpiredModal opened={true} />}
                             {children} </> 
                        : <AccessForbiddenContent />);
}

export default AuthorityGuard;