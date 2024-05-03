import {useIsFocused, useNavigation} from '@react-navigation/native';
import {resetRouteAfterDeleteAccount} from '../../navigation/navigationHelper';
import {SCREEN_NAME} from '../../enums';
import {Linking} from 'react-native';
import {useEffect} from 'react';
import {useAnalytics} from '../../services/analytics';

export const useWelcome = () => {
  const navigation = useNavigation();
  const analytics = useAnalytics();
  const redirectToNextScreen = (type: number) => {
    switch (type) {
      case 1:
        resetRouteAfterDeleteAccount(SCREEN_NAME.WelcomeScreen);
        break;
      case 2:
        analytics.trackTouchSignInOnWelcomeScreen();
        navigation.navigate(SCREEN_NAME.InputPhoneNumberScreen);
        break;
      case 3:
        analytics.trackTouchGetStartedOnWelcomeScreen();
        navigation.navigate(SCREEN_NAME.Onboarding);
        break;
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewWelcomeScreen();
    }
  }, [analytics, isFocused]);

  const openWebBrowser = async (url: string, type: number) => {
    switch (type) {
      case 0:
        analytics.trackSelectPrivacyPolicyMenuOnWelcomeScreen();
        break;
      case 1:
        analytics.trackSelectTermsOfServiceMenuOnWelcomeScreen();
        break;
      default:
        break;
    }
    Linking.openURL(url);
  };

  return {
    redirectToNextScreen,
    openWebBrowser,
  };
};
