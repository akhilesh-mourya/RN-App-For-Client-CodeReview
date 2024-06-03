/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {Animated, Keyboard, Platform} from 'react-native';
import {useQuery} from 'react-query';
import {OTP_INPUT_CELL_COUNT} from '../../constants/appContants';
import {useLoader} from '../loader/useLoader';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import {useTheme} from 'styled-components';
import {NavigationProps} from '../../types';
import useAuth from '../context/useAuth';
import {
  API_SUCCESS_STATUS_200,
  API_SUCCESS_STATUS_201,
} from '../../constants/apiConstants';
import {
  resetHomeRoute,
  resetToNotificationRoute,
  resetToWaitlistRoute,
} from '../../navigation/navigationHelper';
import {checkAndGetUser} from '../../apiServices/registration';
import {
  getNotificationPopupVisible,
  setOnboardingStepComplete,
  setRefreshToken,
  setUserDataInAsync,
} from '../../utility';
import {useAnalytics} from '../../services/analytics';
import {UserDataType} from '../../../@types/context';
import {usePusher} from '../../services/pusher/hooks/usePuser';
import {useNotification} from '../../services/notification/hooks/useNotification';

let lastFocusedIndex = -1;

export const useVerifyOtp = (otpValue: string, phoneNumber: string) => {
  const codeInputRef = useRef();
  const [isButtonActive, setButtonActive] = useState(false);
  const [hasNotificationPopupShown, setHasNotificationPopupShown] =
    useState(false);
  const navigation = useNavigation<NavigationProps>();
  const {showLoader, hideLoader, hideLoaderAndShowErrorMessage} = useLoader();
  const [authResponse, setAuthResponse] = useState<any>(null);
  const [resendTimeRemaining, setTimeRemaining] = useState<number>(60);
  const theme = useTheme();
  const {authContextData} = useAuth();
  const notification = useNotification();

  const {
    data: currentUserResponse,
    error,
    refetch,
  } = useQuery([authResponse?.accessToken], () => checkAndGetUser());

  const analytics = useAnalytics();
  const pusher = usePusher();

  useEffect(() => {
    analytics.trackViewOTPFormScreen();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTimeRemaining > 0) {
        setTimeRemaining(resendTimeRemaining - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const hasNotificationEnablePopupShown = async () => {
    const hasShown = await getNotificationPopupVisible();
    setHasNotificationPopupShown(hasShown === 'YES' ? true : false);
  };

  useEffect(() => {
    hasNotificationEnablePopupShown();
    setTimeout(() => {
      codeInputRef?.current?.focus();
    }, 200);
  }, []);

  useEffect(() => {
    if (currentUserResponse && authResponse) {
      onUserResponse(currentUserResponse, authResponse);
    }
  }, [currentUserResponse, authResponse]);

  useEffect(() => {
    if (error) {
      hideLoaderAndShowErrorMessage(error);
    }
  }, [error]);

  const initializePusherAndNotificationServices = (userData: UserDataType) => {
    if (userData?.id && authContextData?.authToken) {
      pusher.init({
        userId: userData?.id,
        token: authContextData?.authToken,
      });
      notification.initializeNotifications(
        userData?.id,
        authContextData?.authToken,
      );
    }
  };

  const checkPushnotificationPermissionShown = (
    isInWaitlist = true,
    userData: UserDataType,
  ) => {
    let screenStep = '';
    switch (hasNotificationPopupShown) {
      case false:
        screenStep = 'ENABLE_NOTIFICATION';
        setOnboardingStepComplete(screenStep);
        authContextData.setRegistrationProgressContext(screenStep);
        resetToNotificationRoute({isInWaitlist});
        break;
      case true:
        screenStep = isInWaitlist ? 'WAITLIST_SCREEN' : 'DONE';
        setOnboardingStepComplete(screenStep);
        authContextData.setRegistrationProgressContext(screenStep);
        if (!isInWaitlist) {
          initializePusherAndNotificationServices(userData);
          resetHomeRoute();
        } else {
          resetToWaitlistRoute();
        }
        break;
    }
  };

  const onUserResponse = (apiResponse: any, authRes: any) => {
    const {refreshToken} = authRes;
    setRefreshToken(refreshToken);
    if (
      apiResponse?.status === API_SUCCESS_STATUS_200 ||
      apiResponse?.status === API_SUCCESS_STATUS_201
    ) {
      const userData = apiResponse?.data;
      authContextData?.updateUserData(userData?.data);
      setUserDataInAsync(userData?.data);
      analytics.identify(userData?.data?.id);
      analytics.updateProfile(userData?.data);

      if (!userData?.data?.inWaitlist) {
        checkPushnotificationPermissionShown(false, userData?.data);
      } else {
        checkPushnotificationPermissionShown(true, userData?.data);
      }
      hideLoader(false);
    } else {
      setOnboardingStepComplete('FIRST_NAME');
      authContextData.setRegistrationProgressContext('FIRST_NAME');
      navigation.navigate(SCREEN_NAME.InputNameScreen);
      hideLoader(true);
    }
  };

  const onContinuePress = () => {
    analytics.trackTouchContinueButtonOnOTPFormScreen();

    Keyboard.dismiss();

    showLoader();
    authContextData?.auth0?.auth
      .loginWithSMS({
        phoneNumber: phoneNumber,
        code: otpValue,
        audience: 'amori.app',
        scope: 'offline_access',
      })
      .then((res: any) => {
        setAuthResponse(res);
        authContextData?.setAuthTokenInKeychain(
          phoneNumber?.replaceAll('-', ''),
          res?.accessToken,
        );
        refetch();
        // checkAndGetUser(res?.accessToken); //TODO
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  useEffect(() => {
    if (otpValue?.trim()?.length === OTP_INPUT_CELL_COUNT) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [otpValue]);

  const startBorderColorAnim = (isFocused: boolean, index: number) => {
    const translationBorderColor = new Animated.Value(
      lastFocusedIndex === index ? 1 : 0,
    );
    const translateBorderColor = translationBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.inputBorderNew, theme.colors.primary_new],
    });

    Animated.timing(translationBorderColor, {
      toValue: isFocused ? 1 : 0,
      duration: Platform.OS === 'android' ? 500 : 300,
      useNativeDriver: Platform.OS === 'android' ? true : false,
    }).start();

    setTimeout(() => {
      if (isFocused) {
        lastFocusedIndex = index;
      }
    }, 10);

    return translateBorderColor;
  };

  const onResendOtpPress = () => {
    analytics.trackTouchResendCodeButtonOnOTPFormScreen();

    codeInputRef?.current?.focus();
    showLoader();
    authContextData?.auth0?.auth
      .passwordlessWithSMS({
        phoneNumber: phoneNumber?.replaceAll('-', ''),
      })
      .then(() => {
        hideLoader(true);
        setTimeRemaining(60);
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  const borderStyle = (
    value: string,
    index: number,
    translateBorderColor: any,
  ) => {
    const lastIndex = value.length > 4 || value.length < 4 ? value.length : -1;
    return {
      borderColor:
        (value.length === 5 && index === 4) || (lastIndex === 5 && index === 4)
          ? theme.colors.primary_new
          : translateBorderColor,
    };
  };

  return {
    codeInputRef,
    startBorderColorAnim,
    borderStyle,
    isButtonActive,
    onContinuePress,
    resendTimeRemaining,
    isResendTimeRemaining: resendTimeRemaining > 0,
    setTimeRemaining,
    onResendOtpPress,
  };
};
