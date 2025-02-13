import type { PropsWithChildren } from 'react';
import useAuthority from '@/modules/auth/hooks/useAuthority';
import AccessForbiddenContent from '@/modules/core/components/shared/AccessForbiddenContent';


type AuthorityGuardProps = PropsWithChildren & {
    userAuthority: string[],
    authority: string[]
}

const AuthorityGuard: React.FC<AuthorityGuardProps> = ({ userAuthority = [], authority = [], children }) => {

    const isAuthorized = useAuthority(userAuthority, authority);

    return(isAuthorized ? <>{children}</> : <AccessForbiddenContent />);
}

export default AuthorityGuard;