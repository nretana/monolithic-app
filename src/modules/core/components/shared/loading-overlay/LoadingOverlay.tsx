import React from 'react';
import { LoadingOverlay as BaseLoadingOverlay, LoadingOverlayProps } from '@mantine/core';


const LoadingOverlay: React.FC<LoadingOverlayProps> = (props) => {

    return(<BaseLoadingOverlay loaderProps={{ type: 'bars', color: 'blue' }} {...props} />);
}

export default LoadingOverlay;