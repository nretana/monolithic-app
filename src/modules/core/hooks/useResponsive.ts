import { useEffect, useMemo, useState } from 'react';
import type { ScreenSize } from '@/modules/core/@core-types/theme';
import { useMantineTheme, px } from '@mantine/core';
import throttle from 'lodash/throttle'
import { SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE } from '@/modules/core/constants/theme.constant';

export const useResponsive = () => {

    const theme = useMantineTheme();
    const [currentScreenSize, setCurrentScreenSize] = useState<ScreenSize>("Large");
    const screenSizes = useMemo(() => 
        ({ xs: px(theme.breakpoints.xs) as number,
           sm: px(theme.breakpoints.sm) as number,
           md: px(theme.breakpoints.md) as number,
           lg: px(theme.breakpoints.lg) as number,
           xl: px(theme.breakpoints.xl) as number
        }), [theme.breakpoints]);

    const getCurrentScreenSize = () => {
        let screenBreakpoint = window.innerWidth;
        if ((screenBreakpoint <= screenSizes.xs) || (screenBreakpoint <= screenSizes.sm)) {
            setCurrentScreenSize(SMALL_SIZE);
        }
        else if (screenBreakpoint <=  screenSizes.md){
            setCurrentScreenSize(MEDIUM_SIZE);
        }
        else {
            setCurrentScreenSize(LARGE_SIZE);
        }
    }

    useEffect(() => getCurrentScreenSize(), []);

    useEffect(() => {
        window.addEventListener('resize', throttle(getCurrentScreenSize, 200));
        return () => window.removeEventListener('resize', getCurrentScreenSize);
    }, [currentScreenSize]);

    return { currentScreenSize }
}