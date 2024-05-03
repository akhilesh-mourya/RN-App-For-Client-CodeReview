import {useContext} from 'react';
import {AnalyticsContext} from '../context';

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext);

  if (!analytics) {
    throw new Error(
      'You forgot to wrap your component in <AnalyticsProvider>.',
    );
  }

  return analytics;
};
