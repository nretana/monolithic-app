import { useMemo } from 'react';
import { useMantineTheme } from '@mantine/core';

const useGenColor = () => {
  const theme = useMantineTheme();
  const colorList = useMemo(() => {
    return Object.entries(theme.colors)
                 .filter(([key, value]) => key !== 'dark')
                 .map(([key, value]) => [key, value[3]]);
  }, [theme.colors]);

  const getRandomColor = () => {
    const randomColorIndex = Math.floor(Math.random() * colorList.length);
    const genColor = colorList[randomColorIndex][1];
    return genColor;
  }

  return { getRandomColor, colorList };
};

export default useGenColor;
