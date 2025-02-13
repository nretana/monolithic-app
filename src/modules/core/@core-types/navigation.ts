import type { Icon } from '@tabler/icons-react';

export type NavigationTree = {
    key: string,
    path: string,
    title: string,
    icon?: Icon | "",
    type: "single" | "collapse"
    authority: string[],
    subMenu: NavigationTree[]
}