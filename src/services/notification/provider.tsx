import React from 'react';
import Notification from './index';
import {NotificationContext} from './context';

export const NotificationProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {current: notification} = React.useRef(new Notification());

  return (
    <NotificationContext.Provider value={notification}>
      {children}
    </NotificationContext.Provider>
  );
};
