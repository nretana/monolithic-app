import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const MobileNav = () => {
    const [opened, { open, close }] = useDisclosure(true);

    return(<Drawer opened={opened} onClose={close} position='left'>
                Mobile nav
           </Drawer>)
}