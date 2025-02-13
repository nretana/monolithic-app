import cx from 'clsx';
import { CommonProps } from '@/modules/core/@core-types/common';
import { AlertProps as BaseAlertProps , Alert as BaseAlert } from '@mantine/core';
import { IconAlertTriangleFilled, 
         IconCircleCheckFilled,
         IconCircleXFilled,
         IconInfoCircleFilled } from '@tabler/icons-react';
import classes from './Alert.module.scss';
import React from 'react';


type AlertProps = BaseAlertProps & CommonProps & {
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

const Alert: React.FC<AlertProps> = (props) => {

    return(<BaseAlert {...props}
                      icon={<AlertIcon severity={props.severity} />}
                      classNames={{ root: cx(classes['mantine-Alert-root'], props.severity ? classes[props.severity] : ''),
                                    icon: classes['mantine-Alert-icon'], 
                                    body: classes['mantine-Alert-body'],
                                    message: classes['mantine-Alert-message'] }}>
                {props.children}
           </BaseAlert>)
}

export default Alert;