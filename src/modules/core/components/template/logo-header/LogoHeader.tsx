import { useMantineColorScheme } from '@mantine/core';
import getImageUrl from '@/modules/core/utils/getImageUrl';
import { MODE_LIGHT } from '@/modules/core/constants/theme.constant';
import classes from './LogoHeader.module.css';


export const LogoHeader = () => {

    const { colorScheme } = useMantineColorScheme();
    const imgUrl = colorScheme === MODE_LIGHT ? 'icons/brand_logo2.svg': 'icons/brand_logo_dark_mode.svg';

    return(<div className={classes['logo-header']}>
                <a href='/'>
                    <img src={getImageUrl(imgUrl)} />
                </a>
            </div>)
}