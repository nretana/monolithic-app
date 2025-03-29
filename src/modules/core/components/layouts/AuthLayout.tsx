import React from 'react';
import type { CommonProps } from '@/modules/core/@core-types/common';
import { COVER_LAYOUT, SIDE_LAYOUT } from '@/modules/core/constants/app.constant';
import { CoverLayout } from './cover-layout/CoverLayout';
import { SideLayout } from './side-layout/SideLayout';


type AuthLayoutProps = CommonProps & {
    layoutType?: 'cover' | 'side'
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, layoutType = COVER_LAYOUT }) => {
    return( <>
            {layoutType === COVER_LAYOUT ?
            <CoverLayout>
                {children}
            </CoverLayout> :
            <SideLayout>
                {children}
            </SideLayout>}
        </>)
}

export default AuthLayout;