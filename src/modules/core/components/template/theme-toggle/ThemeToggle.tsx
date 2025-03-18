import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { IconButton } from '@/modules/core/components/shared/icon-button/IconButton';


const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <IconButton icon={(computedColorScheme === 'light' ? IconMoon : IconSun )}
                ariaLabel={(computedColorScheme === 'light' ? 'Turn off light theme' : 'Turn on light theme')}
                className='me-2'
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')} />
  );
}

export default ThemeToggle;
