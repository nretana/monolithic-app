import React from 'react';
import { Loader } from './loader/Loader';

export const LoadingContent: React.FC = () => {
    return(<div className='absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'>
            <Loader />
       </div>)
}