import React, { HTMLAttributes } from 'react';
import cx from 'clsx';
import type { Icon } from '@tabler/icons-react'
import { ActionIcon, ActionIconProps } from '@mantine/core'


type InputIconProps = {
    icon: Icon,
} & ActionIconProps & HTMLAttributes<HTMLButtonElement>


export const InputIcon: React.FC<InputIconProps> = (props) => {

    const { icon, className, ...restProps } = props;
    const Icon = icon as Icon;

    return (<ActionIcon variant='default'
                        className={cx('border-none', className)}
                        {...restProps}>
                <Icon size={16} stroke={1} />
            </ActionIcon>)
}
