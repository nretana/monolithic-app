import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { IconButton } from '@/modules/core/components/shared/icon-button/IconButton';
import { MODE_DARK, MODE_LIGHT } from '@/modules/core/constants/theme.constant';


const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(MODE_LIGHT, { getInitialValueInEffect: true });

  return (
    <IconButton icon={(computedColorScheme === MODE_LIGHT ? IconMoon : IconSun )}
                ariaLabel={(computedColorScheme === MODE_LIGHT ? 'Turn off light theme' : 'Turn on light theme')}
                className='me-3'
                onClick={() => setColorScheme(computedColorScheme === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)} />
  );
}

export default ThemeToggle;
