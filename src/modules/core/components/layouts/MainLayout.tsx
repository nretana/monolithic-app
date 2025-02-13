import React from 'react';
import { CommonProps } from '@/modules/core/@core-types/common';
import Header from '@/modules/core/components/template/Header';
import SideBar from '@/modules/core/components/template/sidebar/SideBar';
import MobileNav from '@/modules/core/components/template/mobilenav/MobileNav';
import useResponsive from '@/modules/core/hooks/useResponsive';


const MainLayout: React.FC<CommonProps> = ({ children }) => {

  const { currentScreenSize } = useResponsive();
  console.log('CURRENT SIZE: ', currentScreenSize);

  return (
    <div className='flex items-stretch h-full w-full'>
      {((currentScreenSize === "Small") || (currentScreenSize === "Medium")) && <MobileNav />}
      {(currentScreenSize === "Large") && <SideBar />}
      <div className='w-full relative flex flex-col'>
        <Header />
        <div className='p-4 flex-1'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
