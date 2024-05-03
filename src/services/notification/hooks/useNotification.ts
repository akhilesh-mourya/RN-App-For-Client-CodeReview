import {useContext} from 'react';
import {NotificationContext} from '../context';

export const useNotification = () => {
  const notification = useContext(NotificationContext);
  if (!notification) {
    throw new Error(
      'You forgot to wrap your component in <NotificationProvider>.',
    );
  }

  return notification;
};
