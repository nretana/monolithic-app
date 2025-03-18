import React, { forwardRef } from 'react';
import cx from 'clsx';
import type { Icon } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import classes from './IconButton.module.css';


export interface IconButtonProps {
    icon: Icon,
    className?: string,
    ariaLabel: string,
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void,
    ref?: any
}

export const IconButton: React.FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {

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