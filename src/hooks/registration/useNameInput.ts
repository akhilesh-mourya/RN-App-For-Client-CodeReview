import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import {NavigationProps} from '../../types';
import {
  setUserDataInAsync,
  setOnboardingStepComplete,
  validateName,
} from '../../utility';
import useAuth from '../context/useAuth';
import {capitalizeFirstLater} from '../../helpers/commonFunctions';
import {useAnalytics} from '../../services/analytics';

export const useNameInput = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [isButtonActive, setButtonActive] = useState(false);
  const [firstNameInputFocused, setFirstNameFocus] = useState(false);
  const [lastNameInputFocused, setLastNameFocus] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const {authContextData} = useAuth();

  const analytics = useAnalytics();

  useEffect(() => {
    if (firstName === '') {
      setFirstNameError('');
    }
  }, [firstName]);

  useEffect(() => {
    analytics.trackViewNameFormScreen();
  }, [analytics]);

  const onFirstNameChange = (text: string) => {
    const fNameValidationError = validateName(text, true);
    setFirstNameError(fNameValidationError);
    setButtonActive(fNameValidationError.length === 0);
    setFirstName(text);
  };

  const onLastNameChange = (text: string) => {
    const lName = text.replace(/\d/g, '');
    const lNameValidationError = validateName(text);
    setLastNameError(lNameValidationError);
    setButtonActive(lNameValidationError.length === 0);
    setLastName(lName);
  };

  const onContinuePress = () => {
    let name = firstName;
    name += lastName ? ' ' + lastName : '';
    analytics.trackTouchContinueButtonOnNameFormScreen(name);

    setOnboardingStepComplete('CREATE_USER');

    const normalizedFirstName = capitalizeFirstLater(firstName.trim());
    const normalizedLastName = lastName.trim();

    setUserDataInAsync({
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
    });

    authContextData.setRegistrationProgressContext('CREATE_USER');
    authContextData?.updateUserData({
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
    });

    navigation.navigate(SCREEN_NAME.SelectPersonalityScreen);
  };

  return {
    firstName,
    lastName,
    isButtonActive,
    firstNameInputFocused,
    lastNameInputFocused,
    firstNameError,
    lastNameError,
    onContinuePress,
    onFirstNameChange,
    onLastNameChange,
    setFirstNameFocus,
    setLastNameFocus,
  };
};
