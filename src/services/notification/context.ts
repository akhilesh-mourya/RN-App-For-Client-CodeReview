import {createContext} from 'react';
import Notification from './index';

export const NotificationContext = createContext<Notification>(
  undefined as any,
);
