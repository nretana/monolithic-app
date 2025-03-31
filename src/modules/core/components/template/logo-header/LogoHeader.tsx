import { useMantineColorScheme } from '@mantine/core';
import { MODE_LIGHT } from '@/modules/core/constants/theme.constant';
import classes from './LogoHeader.module.css';
import logoLightMode from '@/assets/imgs/icons/brand_logo2.svg';
import logoDarkMode from '@/assets/imgs/icons/brand_logo_dark_mode.svg';


export const LogoHeader = () => {

    const { colorScheme } = useMantineColorScheme();
    const imgUrl = colorScheme === MODE_LIGHT ? logoLightMode: logoDarkMode;

    return(<div className={classes['logo-header']}>
                <a href='/'>
                    <img src={imgUrl} />
                </a>
            </div>)
}