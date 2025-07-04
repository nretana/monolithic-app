import { useMantineColorScheme } from '@mantine/core';
import { MODE_LIGHT } from '@/modules/core/constants/theme.constant';
import classes from './LogoHeader.module.css';
import logoLightMode from '@/assets/imgs/icons/brand_logo.svg';
import logoDarkMode from '@/assets/imgs/icons/brand_logo_dark.svg';

export const LogoHeader = () => {
  const { colorScheme } = useMantineColorScheme();
  const imgUrl = colorScheme === MODE_LIGHT ? logoLightMode : logoDarkMode;

  return (
    <div className={classes['logo-header']}>
      <a href='/' aria-label='Go to MonoApp.com homepage'>
        <img src={imgUrl} alt='' />
      </a>
    </div>
  );
};
