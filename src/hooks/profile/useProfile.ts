import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import useAuth from '../context/useAuth';
import {useEffect, useState} from 'react';
import {resetRouteAfterDeleteAccount} from '../../navigation/navigationHelper';
import email from 'react-native-email';
import {t} from 'i18next';
import {Config} from 'react-native-config';
import SendSMS from 'react-native-sms';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import {useLoader} from '../loader/useLoader';
import {useAnalytics} from '../../services/analytics';
import useRelationshipData from '../context/useRelationships';

export const useProfile = () => {
  const {showLoader, hideLoader} = useLoader();
  const navigation = useNavigation();
  const {authContextData} = useAuth();
  const {resetRelationshipSession} = useRelationshipData();
  const {resetSession} = authContextData;
  const [firstName, setFirstName] = useState('');
  const [firstLetterOfName, setFirstLetterOfName] = useState('');
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const analytics = useAnalytics();
  const redirectToNextScreen = (type: number) => {
    switch (type) {
      case 1:
        analytics.trackSelectMyRelationshipProfileMenuOnProfileScreen();
        navigation.navigate(SCREEN_NAME.MyRelationshipProfileScreen);
        break;
      case 2:
        analytics.trackSelectSettingsMenuOnProfileScreen();
        navigation.navigate(SCREEN_NAME.SettingScreen);
        break;
      case 3:
        handleEmail();
        break;
    }
  };

  useEffect(() => {
    if (authContextData?.userData) {
      setFirstName(authContextData?.userData?.firstName);
      setFirstLetterOfName(authContextData?.userData?.firstName?.charAt(0));
    }
  }, []);

  const showLogoutPopup = (flag: boolean) => {
    setLogoutVisible(flag);
  };

  const handleEmail = () => {
    const to = [Config.SEND_FEEDBACK_EMAIL]; // string or array of email addresses
    analytics.trackSelectGiveFeedbackMenuOnProfileScreen();
    if (IS_IOS_PLATFORM) {
      SendSMS.send(
        {
          body: t('Email_Part'),
          recipients: to,
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },
        (completed, cancelled, error) => {
          // Success CallBack
          console.log('Callback', completed, cancelled, error);
        },
      );
    } else {
      email(to, {
        // Optional additional arguments
        cc: [],
        bcc: '',
        subject: 'Feedback',
        body: t('Email_Part'),
        checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
      }).catch(console.error);
    }
  };

  const logoutPress = () => {
    showLoader();
    analytics.trackTouchLogOutButtonOnLogOutConfirmationPopupOnProfileScreen();
    setLogoutVisible(false);
    resetRelationshipSession();
    resetSession();
    setTimeout(() => {
      hideLoader();
      resetRouteAfterDeleteAccount(SCREEN_NAME.WelcomeScreen);
    }, 2000);
  };

  return {
    redirectToNextScreen,
    firstName,
    firstLetterOfName,
    isLogoutVisible,
    showLogoutPopup,
    logoutPress,
  };
};
