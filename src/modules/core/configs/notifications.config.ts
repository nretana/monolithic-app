import { NotificationData } from '@mantine/notifications';

type SystemNotification = {
    signOutSession: NotificationData
}

export const systemNotifications: SystemNotification = {
    signOutSession: {
        title: 'Error', 
        message: `We couldn't sign out from the app.`,
        color: 'red',
        autoClose: false }
}