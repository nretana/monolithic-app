import React from 'react';
import { LoadingOverlay as BaseLoadingOverlay, LoadingOverlayProps } from '@mantine/core';


export const LoadingOverlay: React.FC<LoadingOverlayProps> = (props) => {

    return(<BaseLoadingOverlay loaderProps={{ type: 'bars' }} {...props} />);
}