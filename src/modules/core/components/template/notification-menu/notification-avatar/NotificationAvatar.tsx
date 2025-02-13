import { Avatar } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import useGenColor from '@/modules/core/hooks/useGenColor';

const NotificationAvatar = ({ notificationType } : { notificationType: string }) => {
    const { colorList } = useGenColor();
    let notificationColor = '';
    switch(notificationType){
        case 'Profile':
            notificationColor = colorList[1][1];
            break;
        case 'Order':
            notificationColor = colorList[4][1];
            break;
        case 'Payment':
            notificationColor = colorList[6][1];
            break;
        case 'Content':
            notificationColor = colorList[8][1];
            break;
        case 'Course':
            notificationColor = colorList[9][1];
            break;
        case 'User':
            notificationColor = colorList[10][1];
            break;
        default:
            notificationColor = colorList[0][1];
            break;
    }

    return(<Avatar color={notificationColor} size='md'>
               <IconUser />
           </Avatar>);
}

export default NotificationAvatar;
