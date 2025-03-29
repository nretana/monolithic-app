import React from 'react';
import { CommonProps } from '@/modules/core/@core-types/common';
import { useResponsive } from '@/modules/core/hooks/useResponsive';
import { SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE } from '@/modules/core/constants/theme.constant';
import Header from '@/modules/core/components/template/header/Header';
import { SideBar } from '@/modules/core/components/template/sidebar/SideBar';
import { MobileNav } from '@/modules/core/components/template/mobilenav/MobileNav';


const MainLayout: React.FC<CommonProps> = ({ children }) => {

  const { currentScreenSize } = useResponsive();

  return (
    <div className='flex items-stretch h-max w-full'>
      {((currentScreenSize === SMALL_SIZE) || (currentScreenSize === MEDIUM_SIZE)) && <MobileNav />}
      {(currentScreenSize ===  LARGE_SIZE) && <SideBar />}
      <div className='w-full relative flex flex-col'>
        <Header />
        <div className='p-4 flex-1'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
