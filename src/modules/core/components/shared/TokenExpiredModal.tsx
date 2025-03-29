import { Button, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import useAuth from '@/modules/auth/hooks/useAuth';
import { IconClockHour8 } from '@tabler/icons-react';
import { systemNotifications } from '@/modules/core/configs/notifications.config';


export type TokenExpiredModalProps = {
    opened: boolean,
    close?: () => void | undefined
}

export const TokenExpiredModal: React.FC<TokenExpiredModalProps> = ({ opened, close }) => {

    const { signOut } = useAuth();

    const signOutHandler = async() => {
        const response = await signOut();
        if (response?.status === 'failed'){
            notifications.show(systemNotifications.signOutSession);
        }
    }

    return(<>
            <Modal.Root opened={opened} 
                        onClose={close || (() => {})}
                        centered>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title className='font-semibold'>Session Expired</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='flex flex-col min-h-[120px]'>
                        <div className='flex grow'>
                            <IconClockHour8 className='mr-2' />
                            <p className='mb-4'>Your session has expired. You will be redirected to sign in page.</p>
                        </div>
                        <div className='flex justify-end'>
                            <Button onClick={signOutHandler}>Sign In</Button>
                        </div>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
           </>)
}