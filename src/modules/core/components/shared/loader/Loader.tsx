import { Loader as BaseLoader, LoaderProps } from '@mantine/core';
import React from 'react';


export const Loader: React.FC<LoaderProps> = (props) => {
    return(<BaseLoader type='bars' size='lg' {...props} />);
}