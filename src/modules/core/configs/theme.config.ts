import { Anchor, Button, Chip, Table, createTheme } from '@mantine/core';


export type ThemeConfig = {
    sideNavCollapse: boolean
}

export const themeConfig: ThemeConfig = {
    sideNavCollapse: false
}

/* mantine core theme */
export const theme = createTheme({
  primaryColor: 'orange',
  defaultRadius: '0.25rem',
  breakpoints: {
    xs: '640px',
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1536px',
  },
  components: {
    Anchor: Anchor.extend({
        defaultProps: {
            fz:"inherit"
        }
    })
  }
});