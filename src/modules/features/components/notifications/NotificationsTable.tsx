import { useAppDispatch, useAppSelector } from '@/modules/core/store';
import { injectReducer } from '@/modules/core/store';
import featuresReducer, { setNewFeature } from '@/modules/features/store/slices/featureSlice';
import { Button } from '@mantine/core';


injectReducer('feature', featuresReducer);

const NotificationsTable = () => {

    const dispatch = useAppDispatch();
    const feature = useAppSelector(state => state.feature.name);

    const updateFeatureClick = () => {
        dispatch(setNewFeature({ name: 'Margarita', lastName: 'Torres' }));
    }

    console.log('reloading!');
    return(<div>
                <div>
                    <span>Name:</span>
                    <span>{feature}</span>
                </div>
                <Button onClick={updateFeatureClick}>Update</Button>
            </div>)
}

export default NotificationsTable;