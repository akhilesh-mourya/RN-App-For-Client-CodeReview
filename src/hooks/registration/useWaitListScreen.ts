import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useAuth from '../context/useAuth';
import {setOnboardingStepComplete} from '../../utility';
import {useLoader} from '../loader/useLoader';
import {useAnalytics} from '../../services/analytics';

export const useWaitListScreen = () => {
  const {t} = useTranslation();
  const {goBack} = useNavigation();
  const {authContextData} = useAuth();
  const [isPopupVisible, setPopUpVisible] = useState(false);
  const {updateOldErrorUI} = useLoader();
  const [isReferPopupVisible, setReferPopUpVisible] = useState(false);

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewWaitlistScreen();
  }, [analytics]);

  const onReferrSuccess = () => {
    authContextData.setRegistrationProgressContext('DONE');
    updateOldErrorUI(false);
    setOnboardingStepComplete('DONE');
    goBack();
  };

  const toggleModal = () => {
    setReferPopUpVisible(!isReferPopupVisible);
  };

  return {
    t,
    isPopupVisible,
    isReferPopupVisible,
    setPopUpVisible,
    onReferrSuccess,
    toggleModal,
  };
};
