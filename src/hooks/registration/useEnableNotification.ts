import {requestNotifications} from 'react-native-permissions';
import {NavigationProps} from '../../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import useAuth from '../context/useAuth';
import {
  setNotificationPopupVisible,
  setOnboardingStepComplete,
} from '../../utility';
import {
  resetHomeRoute,
  resetToWaitlistRoute,
} from '../../navigation/navigationHelper';
import {useEffect} from 'react';
import {useAnalytics} from '../../services/analytics';
import {usePusher} from '../../services/pusher/hooks/usePuser';
import {useNotification} from '../../services/notification/hooks/useNotification';
export const useEnableNotification = () => {
  const navigation = useNavigation<NavigationProps>();
  const {authContextData} = useAuth();
  const route = useRoute();
  const pusher = usePusher();
  const notification = useNotification();

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewEnableNotificationsScreen();
  }, [analytics]);

  const requestNotificationPermission = () => {
    requestNotifications(['alert', 'sound']).then(({status}) => {
      switch (status) {
        case 'blocked':
        case 'denied':
          analytics.trackSelectDontAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen();
          break;
        case 'granted':
          analytics.trackSelectAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen();
          break;
      }
      setNotificationPopupVisible();

      if (route?.params?.isInWaitlist === false) {
        setOnboardingStepComplete('DONE');
        authContextData.setRegistrationProgressContext('DONE');
        initializePusherAndNotificationServices();
        resetHomeRoute();
      } else {
        setOnboardingStepComplete('WAITLIST_SCREEN');
        authContextData.setRegistrationProgressContext('WAITLIST_SCREEN');
        resetToWaitlistRoute();
      }
    });
  };

  const initializePusherAndNotificationServices = () => {
    if (authContextData?.userData?.id && authContextData?.authToken) {
      pusher.init({
        userId: authContextData?.userData?.id,
        token: authContextData?.authToken,
      });
      notification.initializeNotifications(
        authContextData?.userData?.id,
        authContextData?.authToken,
      );
    }
  };

  const resetNavigation = () => {
    navigation.goBack();
  };

  const onEnablePress = () => {
    analytics.trackTouchEnableNotificationsButtonOnEnableNotificationsScreen();
    requestNotificationPermission();
  };

  return {
    onEnablePress,
    requestNotificationPermission,
    resetNavigation,
  };
};
