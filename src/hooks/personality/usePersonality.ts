/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Animated, Platform} from 'react-native';
import {useQuery} from 'react-query';
import {useMutation} from 'react-query';
import {useLoader} from '../loader/useLoader';
import {createUser, getPersonalitiesData} from '../../apiServices/registration';
import useGetApiHeaders from '../apiService/useGetApiHeaders';
import {CreateUserReqData} from '../../../@types/common';
import {
  getNotificationPopupVisible,
  setOnboardingStepComplete,
  setUserDataInAsync,
} from '../../utility';
import useAuth from '../context/useAuth';
import useDB from '../context/useDB';
import {CoachDataProps} from '../../constants/mockData';
import {addAssistantDataInDB} from '../../dbServices/assistant';
import {ADD_ASSISTANT_QUERY} from '../../constants/sqliteQueryConstants';
import {
  resetToNotificationRoute,
  resetToWaitlistRoute,
} from '../../navigation/navigationHelper';
import {useAnalytics} from '../../services/analytics';

export const usePersonality = () => {
  const {getApiconfig, authToken} = useGetApiHeaders();
  const [headers, setHeaders] = useState(getApiconfig);
  const [hasNotificationPopupShown, setHasNotificationPopupShown] =
    useState(false);
  const {data: personalityListData, isLoading} = useQuery(
    ['getPersonalities', headers],
    () => getPersonalitiesData(headers),
  );

  const {dbGLobalRef} = useDB();
  const createUserMutation = useMutation(createUser);

  const {
    showLoader,
    hideLoader,
    hideLoaderAndShowErrorMessage,
    updateOldErrorUI,
  } = useLoader();
  const {authContextData} = useAuth();

  const personalityList = personalityListData?.data;

  const analytics = useAnalytics();

  useEffect(() => {
    if (authToken) {
      setHeaders({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  }, [authToken]);

  useEffect(() => {
    analytics.trackViewCoachPersonalityPickerScreen();
  }, []);

  useEffect(() => {
    hasNotificationEnablePopupShown();
    updateOldErrorUI(false);
  }, []);

  useEffect(() => {
    if (isLoading || createUserMutation.isLoading) {
      showLoader();
    } else {
      hideLoader(true);
    }
  }, [isLoading, createUserMutation.isLoading]);

  const hasNotificationEnablePopupShown = async () => {
    const hasShown = await getNotificationPopupVisible();
    setHasNotificationPopupShown(hasShown === 'YES' ? true : false);
  };

  const translationCardOpacity = Array(personalityList?.length || 0).fill(
    new Animated.Value(0),
  );
  const scrollX = React.useRef(new Animated.Value(0)).current;

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

  const startCardAnimation = (absoluteProgress: number) => {
    translationCardOpacity?.map((_, index) => {
      Animated.timing(translationCardOpacity[index], {
        toValue: absoluteProgress,
        duration: 1,
        useNativeDriver: Platform.OS === 'android' ? true : false,
      }).start();
    });
  };

  const startDotAnimation = (offsetProgress: number) => {
    Animated.timing(scrollX, {
      toValue: -offsetProgress,
      duration: 1,
      useNativeDriver: Platform.OS === 'android' ? true : false,
    }).start();
  };

  const selectCoachThroughSelectPersonality = (
    selectedPersonality: CoachDataProps,
  ) => {
    analytics.trackTouchSelectPersonalityButtonOnCoachPersonalityPickerScreen(
      selectedPersonality.name,
    );

    onSelectPersonalityPress(selectedPersonality);
  };

  const onSelectPersonalityPress = async (
    selectedPersonality: CoachDataProps,
  ) => {
    const contextUserData = authContextData.userData;

    if (!contextUserData) {
      return;
    }

    const requestData: CreateUserReqData = {
      assistantId: selectedPersonality.id,
      firstName: contextUserData.firstName,
    };

    if (contextUserData.lastName) {
      requestData.lastName = contextUserData.lastName;
    }

    try {
      const responseUserData = await createUserMutation.mutateAsync(
        requestData,
      );

      setUserDataInAsync(responseUserData);
      authContextData.updateUserData(responseUserData);

      const params = Object.values(selectedPersonality);
      addAssistantDataInDB(dbGLobalRef, ADD_ASSISTANT_QUERY, params);

      analytics.identify(responseUserData?.id);
      analytics.updateProfile(responseUserData);

      if (hasNotificationPopupShown) {
        setOnboardingStepComplete('WAITLIST_SCREEN');
        authContextData.setRegistrationProgressContext('WAITLIST_SCREEN');
        resetToWaitlistRoute();
      } else {
        setOnboardingStepComplete('ENABLE_NOTIFICATION');
        authContextData.setRegistrationProgressContext('ENABLE_NOTIFICATION');
        resetToNotificationRoute({isInWaitlist: true});
      }
    } catch (err) {
      hideLoaderAndShowErrorMessage(err);
    }
  };

  const onSkipContinuePress = () => {
    analytics.trackTouchContinueButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen();
    onSelectPersonalityPress(personalityList[0]);
  };

  return {
    scrollX,
    getCardAnimInterpolation,
    startCardAnimation,
    startDotAnimation,
    selectCoachThroughSelectPersonality,
    onSkipContinuePress,
    personalityList: personalityList || [],
  };
};
