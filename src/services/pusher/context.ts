import {createContext} from 'react';
import {PusherSocket} from './index';

export const PusherContext = createContext<PusherSocket>(undefined as any);
