import {useAnalytics} from '../analytics';
const NotificationHelper = () => {
  const analytics = useAnalytics();
  const trackEvent = (notificationProperties: any) => {
    analytics.trackTouchAnalysisIsReadyNotification();
  };

  return {trackEvent};
};

export default NotificationHelper;
