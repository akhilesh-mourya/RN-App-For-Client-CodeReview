import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import {NavigationProps} from '../../types';
import {Animated, Keyboard} from 'react-native';
import {Country} from 'react-native-country-picker-modal';
import {formatNumberAndCheckValidity} from '../../helpers/commonFunctions';
import {useTheme} from 'styled-components';
import useAuth from '../context/useAuth';
import {useLoader} from '../loader/useLoader';
import {useAnalytics} from '../../services/analytics';

export const usePhoneNumberInput = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>({
    cca2: __DEV__ ? 'IN' : 'US',
    callingCode: __DEV__ ? ['91'] : ['1'],
  });
  const [phoneNum, setPhoneNum] = useState<any>('');
  const [isButtonActive, setButtonActive] = useState<any>(false);
  const [isError, setError] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const {authContextData} = useAuth();
  const {
    showLoader,
    hideLoader,
    hideLoaderAndShowErrorMessage,
    updateOldErrorUI,
  } = useLoader();
  const [translationFieldFocusAnim] = useState(new Animated.Value(0));
  const theme = useTheme();
  const translateFieldFocusAnim = translationFieldFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.inputBorderNew, theme.colors.primary_new],
  });

  const translateFieldFocusBGAnim = translationFieldFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.grey_80, theme.colors.black_10_new],
  });

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewPhoneNumberFormScreen();
  }, [analytics]);

  const startFieldFocusAnimation = (isFocused: boolean) => {
    Animated.timing(translationFieldFocusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    updateOldErrorUI(false);
  }, []);

  const onCountrySelect = (country: Country) => {
    const callingCode = country.callingCode[0];

    if (callingCode) {
      analytics.trackSelectCountryOnCountryPickerOnPhoneNumberFormScreen(
        country.cca2,
        callingCode,
      );
    }

    setSelectedCountry(country);
    onNumberChange(phoneNum);
  };

  const onNumberChange = (text: string) => {
    const {formattedNum, isValidNum} = formatNumberAndCheckValidity(
      text,
      selectedCountry?.cca2,
    );
    setButtonActive(isValidNum);
    setPhoneNum(formattedNum);
    if (text?.length >= 12 && !isValidNum) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onLoginPress = (phoneNumber: string) => {
    showLoader();

    analytics.trackTouchContinueButtonOnPhoneNumberFormScreen(
      selectedCountry.cca2,
      selectedCountry.callingCode[0],
      phoneNum,
    );

    authContextData?.auth0?.auth
      .passwordlessWithSMS({
        phoneNumber: phoneNumber?.replaceAll('-', ''),
      })
      .then(() => {
        hideLoader();
        navigation.navigate(SCREEN_NAME.VerifyOtpScreen, {
          phoneNumber: `+${selectedCountry?.callingCode[0]}${phoneNum}`,
        });
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  const onContinuePress = (phoneNumber: string) => {
    Keyboard.dismiss();
    onLoginPress(phoneNumber);
  };

  return {
    selectedCountry,
    phoneNum,
    isButtonActive,
    isError,
    translateFieldFocusAnim,
    translateFieldFocusBGAnim,
    onContinuePress,
    onCountrySelect,
    setButtonActive,
    onNumberChange,
    startFieldFocusAnimation,
  };
};
