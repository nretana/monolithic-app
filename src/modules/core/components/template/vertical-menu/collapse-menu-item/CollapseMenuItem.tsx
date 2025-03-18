import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NavigationTree } from '@/modules/core/@core-types/navigation';
import { Box, Collapse, Group, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { Icon, IconChevronRight } from '@tabler/icons-react';
import classes from './CollapseMenuItem.module.css';


type CollapseMenuItemProps = {
    route: NavigationTree,
    routeKeyActive: string,
    initiallyOpened?: boolean
}

const CollapsibleMenuItem: React.FC<CollapseMenuItemProps> = ({ route, routeKeyActive, initiallyOpened }) => {

    const navigate = useNavigate();
    const [opened, setOpened] = useState(initiallyOpened || false);
    const hasLinks = route.subMenu.length > 0;
    const Icon = route.icon as Icon;

    const items = route.subMenu.map((route: NavigationTree) => (
      <UnstyledButton key={route.key}
                      type='button' 
                      onClick={(event) => { navigate(route.path); } }
                      className={classes['menu-item-link']}
                      data-active={route.key === routeKeyActive || undefined}>
          <Group justify='space-between' gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              {route.title}
            </Box>
          </Group>
      </UnstyledButton>
    ));



    const onClickCollapsiblePanel = (event: React.MouseEvent<HTMLButtonElement>, route: NavigationTree) => {
        event.preventDefault();
        setOpened((currentState) => !currentState);
    }

    return(<>
      <UnstyledButton type='button'
                      onClick={(event) => onClickCollapsiblePanel(event, route)}
                      className={classes['collapse-menu-item']}
                      data-active={route.key === routeKeyActive || undefined}>
        <Group justify='space-between' gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant='transparent' className={classes.icon} size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml='md'>{route.title}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: '16px',
                height: '16px',
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

export default CollapsibleMenuItem;