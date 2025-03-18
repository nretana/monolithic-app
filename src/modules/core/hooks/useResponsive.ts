import { useEffect, useMemo, useState } from 'react';
import type { ScreenSize } from '@/modules/core/@core-types/theme';
import { useMantineTheme, px } from '@mantine/core';
import throttle from 'lodash/throttle'


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
        console.log("passing here!!!!!", window.innerWidth);
        let screenBreakpoint = window.innerWidth;
        if ((screenBreakpoint <= screenSizes.xs) || (screenBreakpoint <= screenSizes.sm)) {
            console.log("small value");
            setCurrentScreenSize("Small");
        }
        else if (screenBreakpoint <=  screenSizes.md){
            console.log("medium value");
            setCurrentScreenSize("Medium");
        }
        else {
            console.log("large value");
            setCurrentScreenSize("Large");
        }
    }

    useEffect(() => {
        window.onresize = throttle(getCurrentScreenSize, 200);
    }, []);

    return { currentScreenSize }
}