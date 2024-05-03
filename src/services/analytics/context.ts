import {createContext} from 'react';
import {Analytics} from './analytics';

export const AnalyticsContext = createContext<Analytics>(undefined as any);
