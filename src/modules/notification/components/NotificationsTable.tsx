import { useAppDispatch, useAppSelector } from '@/modules/core/store';
import { injectReducer } from '@/modules/core/store';
import notificationReducer, { setNewNotification } from '@/modules/notification/store/slices/notificationSlice';
import { Button } from '@mantine/core';


injectReducer('notification', notificationReducer);

const NotificationsTable = () => {

    const dispatch = useAppDispatch();
    const feature = useAppSelector(state => state.notification.name);

    const updateFeatureClick = () => {
        dispatch(setNewNotification({ name: 'Margarita', lastName: 'Torres' }));
    }

    return(<div>
                <div>
                    <span>Name:</span>
                    <span>{feature}</span>
                </div>
                <Button onClick={updateFeatureClick}>Update</Button>
            </div>)
}

export default NotificationsTable;