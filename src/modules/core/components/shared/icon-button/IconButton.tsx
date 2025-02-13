import cx from 'clsx';
import type { Icon, IconProps } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import classes from './IconButton.module.scss';
import React, { forwardRef } from 'react';

export interface IconButtonProps {
    icon: Icon,
    className?: string,
    ariaLabel: string,
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void,
    ref?: any
}

const IconButton: React.FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {

    const Icon = props.icon;

    return(<ActionIcon className={props.className}
                       aria-label={props.ariaLabel}
                       variant='default' 
                       size='xl'
                       onClick={props.onClick}
                       ref={ref}>
                    <Icon className={cx(classes.icon, classes.light)} stroke={1.5} />
            </ActionIcon>)
});

export default IconButton;