import {useContext} from 'react';
import {PusherContext} from '../context';

export const usePusher = () => {
  const pusher = useContext(PusherContext);
  if (!pusher) {
    throw new Error('You forgot to wrap your component in <PusherProvider>.');
  }

  return pusher;
};
