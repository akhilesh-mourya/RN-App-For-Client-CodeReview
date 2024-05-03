import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';
import {checkAndGetUser, redeemCode} from '../../apiServices/registration';
import {RedeemCodeReqData} from '../../../@types/common';
import {Keyboard} from 'react-native';
import {useAnalytics} from '../../services/analytics';
import useAuth from '../context/useAuth';
import {usePusher} from '../../services/pusher/hooks/usePuser';
import {setUserDataInAsync} from '../../utility';
import {useLoader} from '../loader/useLoader';
import {ErroPopupType} from '../../enums';
import {resetToPhoneNumberRoute} from '../../navigation/navigationHelper';
import {useNotification} from '../../services/notification/hooks/useNotification';

export const useReferralCode = (props: any) => {
  const {isVisible, onHidePress, onContinuePress} = props;
  const {t} = useTranslation();
  const [referralText, setReferralText] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [inputError, setInputError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {authContextData} = useAuth();
  const pusher = usePusher();
  const analytics = useAnalytics();
  const {showErrorMessage} = useLoader();
  const notification = useNotification();

  const {mutateAsync} = useMutation((requestBody: RedeemCodeReqData) =>
    redeemCode(requestBody),
  );

  const onTextChange = (text: string) => {
    setReferralText(text);
    setInputError('');
  };

  const onClosePress = () => {
    analytics.trackTouchDismissButtonOnReferralCodeInputPopupOnWaitlistScreen();
    updateAfterClosePopup();
  };

  const updateAfterClosePopup = () => {
    onHidePress();
    setReferralText('');
    setInputError('');
    setInputFocus(false);
  };

  const handleAPIError = () => {
    setLoading(false);
    if (referralText === 'HSR2024') {
      onHidePress();
      setReferralText('');
      setInputError('');
      setTimeout(() => {
        showErrorMessage({
          errorMessage:
            'Your priority code has been used successfully. We will notify you when your profile has been reviewed.',
          errorPopupType: ErroPopupType.OnlyError,
        });
      }, 400);
    } else {
      setInputError(t('Code_Invalid'));
    }
  };

  const onSubmitPress = () => {
    analytics.trackTouchSubmitButtonOnReferralCodeInputPopupOnWaitlistScreen(
      referralText,
    );

    setLoading(true);
    const requestBody: RedeemCodeReqData = {
      value: referralText,
    };
    mutateAsync(requestBody)
      .then(async () => {
        Keyboard.dismiss();

        const userData = await checkAndGetUser();
        if (!userData?.data?.data?.inWaitlist && userData?.data?.data?.id) {
          authContextData?.updateUserData(userData?.data?.data);
          setUserDataInAsync(userData?.data?.data);
          setLoading(false);
          updateAfterClosePopup();
          const userId = userData?.data?.data?.id;
          if (userId && authContextData?.authToken) {
            //Initialize Notification
            notification.initializeNotifications(
              userId,
              authContextData?.authToken,
            );

            // Initialze Pusher
            pusher.init({
              userId,
              token: authContextData?.authToken,
            });
          }

          setTimeout(() => {
            onContinuePress();
          }, 300);
        } else if (!userData?.data?.data?.id) {
          resetToPhoneNumberRoute();
        } else {
          handleAPIError();
        }
      })
      .catch(() => {
        handleAPIError();
      });
  };

  return {
    t,
    referralText,
    inputFocus,
    inputError,
    isVisible,
    isLoading,
    setInputFocus,
    onSubmitPress,
    onClosePress,
    onTextChange,
  };
};
