import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SCREEN_NAME} from '../../enums';
import {Delete_Reason_List} from '../../constants/mockData';
import {
  deleteUser,
  getPersonalitiesData,
  updateUser,
} from '../../apiServices/registration';
import useGetApiHeaders from '../apiService/useGetApiHeaders';
import {useMutation, useQuery} from 'react-query';
import {useLoader} from '../loader/useLoader';
import {Animated, Linking, Platform} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import theme from '../../theme';
import useAuth from '../context/useAuth';
import {DeleteUserReqData, UpdateUserReqData} from '../../../@types/common';
import {
  getFilteredCoachChannel,
  setRelationshipCreated,
  setUserDataInAsync,
} from '../../utility';
import DeviceInfo from 'react-native-device-info';
import {resetRouteAfterDeleteAccount} from '../../navigation/navigationHelper';
import useChat from '../context/useChat';
import {
  readMessagesDataFromDB,
  updateMsgContentIntoDB,
} from '../../utility/chatUtility';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';
import useRelationshipData from '../context/useRelationships';

export const useSetting = () => {
  const [otherReason, setOtherReason] = useState('');
  const deleteAccountReasonList = Delete_Reason_List || [];
  const {authContextData} = useAuth();
  const {resetRelationshipSession} = useRelationshipData();
  const {resetSession} = authContextData;
  const {chatContextData} = useChat();
  const [
    isDeleteAccountReasonContinueActive,
    setDeleteAccountReasonContinueActive,
  ] = useState(false);
  const navigation = useNavigation();
  const [assistantId, setAssistantId] = useState(
    authContextData?.userData?.assistantId,
  );
  const analytics = useAnalytics();
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedName, setSelectedName] = useState('');
  const [reason, setReason] = useState('');
  const [isSwitchPopUpVisible, setSwitchPopupVisible] = useState(false);
  const appVersion = DeviceInfo.getVersion();
  const buildVersion = DeviceInfo.getBuildNumber();
  const redirectToPreviousScreen = (isDeleteCancel = false) => {
    if (isDeleteCancel === true) {
      analytics.trackTouchCancelButtonOnConfirmDeleteAccountScreen();
    }
    navigation.goBack();
  };
  const {getApiconfig} = useGetApiHeaders();
  const {data: personalityListData} = useQuery('getPersonalities', () =>
    getPersonalitiesData(getApiconfig),
  );

  const {showLoader, hideLoader} = useLoader();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const {isLoading: isDeleteUserLoading, mutateAsync} = useMutation(
    (requestBody: DeleteUserReqData) =>
      deleteUser(requestBody, authContextData?.authToken),
  );

  const onPressShowPopUp = () => {
    if (isSwitchPopUpVisible) {
      analytics.trackTouchCancelButtonOnSwitchCoachPersonalityPopup();
    } else {
      analytics.trackTouchSwitchPersonalityOnCoachPersonalityScreen();
    }
    setSwitchPopupVisible(!isSwitchPopUpVisible);
  };

  const {
    isLoading: isUpdatedUserLoading,
    mutateAsync: updateSwitchPersonality,
  } = useMutation((requestBody: UpdateUserReqData) =>
    updateUser(requestBody, authContextData?.authToken),
  );

  const onSelectPersonalityPress = (selectePersonality: any) => {
    onPressShowPopUp();
    setSelectedId(selectePersonality?.id);
    setSelectedName(selectePersonality?.name);
  };

  const startDotAnimation = (offsetProgress: number) => {
    Animated.timing(scrollX, {
      toValue: -offsetProgress,
      duration: 1,
      useNativeDriver: Platform.OS === 'android' ? true : false,
    }).start();
  };

  useEffect(() => {
    if (isDeleteUserLoading || isUpdatedUserLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isDeleteUserLoading, isUpdatedUserLoading]);

  const getCardAnimInterpolation = (index: number) => {
    let translateCardOpacity;
    const inputRangeArr = Array.from(
      {length: personalityList?.length},
      (_, k) => k,
    );

    const outputRangeArr = Array.from(
      {length: personalityList?.length},
      (_, k) => (index === k ? 1 : 0.5),
    );

    translateCardOpacity = translationCardOpacity[index].interpolate({
      inputRange: [...inputRangeArr],
      outputRange: [...outputRangeArr],
    });
    return translateCardOpacity;
  };

  const personalityList = personalityListData?.data;

  const translationCardOpacity = Array(personalityList?.length || 0).fill(
    new Animated.Value(0),
  );

  const redirectToNextScreen = (type: number) => {
    switch (type) {
      case 2:
        analytics.trackSelectCoachPersonalityMenuOnSettingsScreen();
        navigation.navigate(SCREEN_NAME.SwitchCoachScreen);
        break;
      case 3:
        navigation.navigate(SCREEN_NAME.PushNotificationScreen);
        break;
      case 6:
        analytics.trackTouchDeleteAccountButtonOnSettingsScreen();
        navigation.navigate(SCREEN_NAME.DeleteAccountReasonScreen);
        break;
      case 7:
        const mappedReason = MixpanelData[reason];

        analytics.trackTouchContinueButtonOnDeleteAccountScreen(
          mappedReason,
          otherReason,
        );

        navigation.navigate(SCREEN_NAME.DeleteAccountConfirmScreen, {
          reason: reason,
          otherReason: otherReason,
        });
        break;
    }
  };

  const onSwitchContinuePress = () => {
    const requestBody: UpdateUserReqData = {
      assistantId: selectedId,
    };
    analytics.trackTouchSwitchOnSwitchPersonalityPopup(selectedName);
    setSwitchPopupVisible(false);
    updateSwitchPersonality(requestBody)
      .then(userData => {
        setUserDataInAsync(userData?.data);
        const newData = {
          ...userData?.data,
          initialBotMessagesStatus: {
            isFillQuestionnarireDone: true,
          },
        };
        authContextData?.updateUserData(newData);
        setAssistantId(selectedId);
        // updateCoachDataIntoDB(); // Updating coach initial message to reflect on chat screen
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  const updateCoachDataIntoDB = async () => {
    const channelData = getFilteredCoachChannel(chatContextData?.channelsList);
    if (channelData) {
      const result = await readMessagesDataFromDB(channelData?.id);
      if (result?.length > 0) {
        const messageData = result[result?.length - 1];
        if (messageData && messageData?.senderType === 'assistant') {
          const selectedCoachData = personalityList?.find(
            coach => coach?.id == selectedId,
          );
          const updatedMsg = {
            ...messageData,
            content: selectedCoachData?.intro,
          };
          await updateMsgContentIntoDB(updatedMsg);
        }
      }
    }
  };

  const updateReasonForDeleteAccount = (val: string) => {
    setDeleteAccountReasonContinueActive(true);
    setReason(val);
  };

  const updateOtherReason = (reasonVal: string) => {
    if (reasonVal) {
      setOtherReason(reasonVal);
      setDeleteAccountReasonContinueActive(true);
    } else {
      setOtherReason('');
      setDeleteAccountReasonContinueActive(false);
    }
  };

  const startCardAnimation = (absoluteProgress: number) => {
    translationCardOpacity?.map((_, index) => {
      Animated.timing(translationCardOpacity[index], {
        toValue: absoluteProgress,
        duration: 1,
        useNativeDriver: Platform.OS === 'android' ? true : false,
      }).start();
    });
  };

  const openWebBrowser = async (
    url: string,
    isExternal: boolean = false,
    type: number,
  ) => {
    switch (type) {
      case 0:
        analytics.trackSelectPrivacyPolicyMenuOnSettingsScreen();
        break;
      case 1:
        analytics.trackSelectTermsAndConditionsMenuOnSettingsScreen();
        break;
      default:
        break;
    }
    if (isExternal) {
      Linking.openURL(url);
      return;
    }
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: theme.colors.base,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: false,
        toolbarColor: theme.colors.base,
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
      });
    } else {
      Linking.openURL(url);
    }
  };

  const callDeleteUserAPI = (reason: string, otherReason: string) => {
    const reqData: DeleteUserReqData = {
      reason: reason,
    };

    const reasonString = (MixpanelData as any)[reason];

    analytics.trackTouchConfirmButtonOnConfirmDeleteAccountScreen(
      reasonString,
      otherReason,
    );

    mutateAsync(reqData)
      .then(() => {
        analytics.trackViewDeleteAccountSuccessScreen();
        resetSession();
        resetRelationshipSession();
        setRelationshipCreated('NO');
        resetRouteAfterDeleteAccount(SCREEN_NAME.DeleteAccountSuccessScreen);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  return {
    appVersion,
    buildVersion,
    deleteAccountReasonList,
    reason,
    isDeleteAccountReasonContinueActive,
    scrollX,
    personalityList: personalityList || [],
    otherReason,
    assistantId,
    isSwitchPopUpVisible,
    onSwitchContinuePress,
    onPressShowPopUp,
    callDeleteUserAPI,
    updateReasonForDeleteAccount,
    updateOtherReason,
    getCardAnimInterpolation,
    onSelectPersonalityPress,
    startDotAnimation,
    startCardAnimation,
    openWebBrowser,
    redirectToPreviousScreen,
    redirectToNextScreen,
  };
};
