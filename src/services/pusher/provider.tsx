import React from 'react';
import {PusherSocket} from './index';
import {PusherContext} from './context';

export const PusherProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {current: pusher} = React.useRef(new PusherSocket());

  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
};
