import React from 'react';
import cx from 'clsx';
import { CommonProps } from '@/modules/core/@core-types/common';
import { AlertProps as MantineAlertProps , Alert as MantineAlert } from '@mantine/core';
import { IconAlertTriangleFilled, 
         IconCircleCheckFilled,
         IconCircleXFilled,
         IconInfoCircleFilled } from '@tabler/icons-react';
import classes from './Alert.module.css';


type AlertProps = MantineAlertProps & CommonProps & {
    severity?: 'success' | 'info' | 'warning' | 'error'
}; 

const AlertIcon: React.FC<{ severity?: 'success' | 'info' | 'warning' | 'error'}> = ({ severity }): React.ReactNode => {
    switch(severity){
        case 'success':
            return <IconCircleCheckFilled size={24} />;
        case 'warning':
            return  <IconAlertTriangleFilled size={24} />;
        case 'error':
            return  <IconCircleXFilled size={24} />;
        case 'info':
        default:
            return  <IconInfoCircleFilled size={24} />
    }
}

export const Alert: React.FC<AlertProps> = (props) => {

    return(<MantineAlert {...props}
                         icon={<AlertIcon severity={props.severity} />}
                         classNames={{ root: cx(classes['app-Alert-root'], props.severity ? classes[props.severity] : ''),
                                       icon: classes['app-Alert-icon'], 
                                       body: classes['app-Alert-body'],
                                       message: classes['app-Alert-message'] }}>
                {props.children}
           </MantineAlert>)
}