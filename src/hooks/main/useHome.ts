/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from 'react-query';
import useGetApiHeaders from '../apiService/useGetApiHeaders';
import useAuth from '../context/useAuth';
import {
  getAssistantByIdData,
  getChannelsList,
  getRelationshipsData,
} from '../../apiServices/main';
import React, {useEffect, useRef, useState} from 'react';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {SCREEN_NAME, UploadTypeEnum} from '../../enums';
import useChat from '../context/useChat';
import {CoachDataProps} from '../../constants/mockData';
import {
  configureChatMessages,
  getFilteredCoachChannel,
  setAIMatchMakingDataAsync,
} from '../../utility';
import useRelationshipData from '../context/useRelationships';
import {Platform} from 'react-native';
import {
  checkCoachLastMesageRead,
  configureRelationshipsDataIfLastMessage,
  getSectionMessages,
  readMessagesDataFromDB,
} from '../../utility/chatUtility';
import {ChatMessagesType} from '../../types';
import {useLoader} from '../loader/useLoader';
import {getCurrentAIMatchmaking} from '../../apiServices/aiMatchmaking';
import {
  resetToPhoneNumberRoute,
  resetToWaitlistRoute,
} from '../../navigation/navigationHelper';
import {useAnalytics} from '../../services/analytics';
import {MixpanelData} from '../../constants/enums';
import {checkAndGetUser} from '../../apiServices/registration';
import {useNotification} from '../../services/notification/hooks/useNotification';

export const useHome = () => {
  const bottomSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation<NavigationProp>();
  const {authContextData} = useAuth();
  const {
    setMyRelationshipsList,
    myRelationshipsList,
    fetchPersonalities,
    resetRelationshipSession,
  } = useRelationshipData();
  const {hasRefreshedTheToken, resetSession, refreshAccessToken, userData} =
    authContextData;
  const {chatContextData} = useChat();
  const {getApiconfig} = useGetApiHeaders();
  const {updateOldErrorUI} = useLoader();
  const [call, setCall] = useState(false);
  const [lastMessageDataForCoach, setLastMessageForCoach] =
    useState<ChatMessagesType | null>(null);
  const [assistantData, setAssistantData] = useState(false);
  const analytics = useAnalytics();
  const notification = useNotification();
  const {data: currentAIMatchmakingData} = useQuery(
    'getCurrentAIMatchmaking',
    () => getCurrentAIMatchmaking(),
    {
      cacheTime: 3000,
      refetchOnWindowFocus: true,
      staleTime: 3000,
      enabled: authContextData.registrationProgress === 'DONE',
    },
  );
  const {data: channelsList, refetch: channelRefetch} = useQuery(
    'getChannels',
    () => getChannelsList(getApiconfig),
    {
      cacheTime: 3000,
      refetchOnWindowFocus: true,
      staleTime: 3000,
      enabled: authContextData.registrationProgress === 'DONE',
    },
  );
  global.channelRefetch = channelRefetch;
  const {
    refetch: assistantRefetch,
    isLoading: getAssistantLoading,
    data: assistentRawData,
  } = useQuery(
    'getAssistant',
    () =>
      getAssistantByIdData(
        getApiconfig,
        authContextData?.userData?.assistantId,
      ),
    {
      enabled:
        authContextData.registrationProgress === 'DONE' &&
        authContextData.authToken &&
        authContextData?.userData?.assistantId
          ? true
          : false,
    },
  );

  const {
    data: relationShipsData,
    isLoading: getRelationShipsLoading,
    refetch: relationshipRefetch,
  } = useQuery('getRelationsShips', () => getRelationshipsData(getApiconfig), {
    enabled: authContextData.registrationProgress === 'DONE',
  });

  useEffect(() => {
    const process = authContextData?.registrationProgress;
    if (process !== 'WAITLIST_SCREEN') {
      updateOldErrorUI(true);
    } else {
      updateOldErrorUI(false);
    }
  }, []);

  useEffect(() => {
    if (currentAIMatchmakingData) {
      authContextData?.setAIMatchmakingData(currentAIMatchmakingData);
      setAIMatchMakingDataAsync(currentAIMatchmakingData);
    }
  }, [currentAIMatchmakingData]);

  useEffect(() => {
    if (channelsList?.data) {
      chatContextData?.setChannelsList(channelsList?.data);
    }
  }, [channelsList]);

  useEffect(() => {
    if (
      hasRefreshedTheToken &&
      authContextData.registrationProgress === 'DONE'
    ) {
      channelRefetch();
      relationshipRefetch();
      assistantRefetch();
    }
  }, [hasRefreshedTheToken]);

  const getUserDataFromServer = async () => {
    try {
      const userdata = await checkAndGetUser();
      const userError = JSON.stringify(userdata);
      const finalError = JSON.parse(userError);
      if (finalError?.status >= 400 && finalError?.status < 500) {
        if (finalError?.status === 401) {
          const hasTokenRefreshed = refreshAccessToken(userData?.phoneNumber);
          if (!hasTokenRefreshed) {
            resetSession();
            resetRelationshipSession();
            resetToPhoneNumberRoute();
          }
        } else {
          resetSession();
          resetRelationshipSession();
          resetToPhoneNumberRoute();
        }
      } else if (
        userdata?.data?.data?.inWaitlist &&
        authContextData.registrationProgress === 'DONE'
      ) {
        resetToWaitlistRoute();
      }
    } catch (error) {}
  };

  /**
   * To Show Last Message on Coach Chat
   */
  useFocusEffect(
    React.useCallback(() => {
      if (
        authContextData.registrationProgress === 'DONE' &&
        authContextData.authToken &&
        authContextData?.userData?.assistantId
      ) {
        configureDataOnAssistantLoad(assistentRawData, channelsList);
        channelRefetch();
        relationshipRefetch();
        fetchPersonalities();
        getUserDataFromServer();
      }
    }, [
      authContextData.registrationProgress,
      authContextData.userData,
      channelsList,
    ]),
  );

  useEffect(() => {
    if (assistentRawData && channelsList) {
      configureDataOnAssistantLoad(assistentRawData, channelsList);
    }
  }, [assistentRawData, authContextData, channelsList]);

  useEffect(() => {
    if (authContextData?.userData && assistentRawData) {
      if (
        authContextData?.userData?.assistantId !== assistentRawData?.data?.id
      ) {
        assistantRefetch();
      }
    }
  }, [authContextData?.userData]);

  useEffect(() => {
    if (relationShipsData?.data && channelsList?.data) {
      const configuredList = configureRelationshipsDataIfLastMessage(
        relationShipsData?.data,
        channelsList?.data,
        authContextData?.userData?.id,
      );
      setMyRelationshipsList(configuredList);
      notification.setRelationshipData(configuredList);
    }
  }, [relationShipsData, channelsList]);

  const configureDataOnAssistantLoad = async (
    assistentRawData: any,
    _channelsList: any,
  ) => {
    if (assistentRawData && channelsList?.data) {
      const {data} = assistentRawData;
      authContextData?.setMyCoachData(data);
      const channelData = getFilteredCoachChannel(channelsList?.data);
      const updatedCoachMsg: any = checkCoachLastMesageRead(
        channelData,
        authContextData?.userData?.id,
      );
      setLastMessageForCoach(updatedCoachMsg);
      setAssistantData(assistentRawData);
      notification.setAssistantData(assistentRawData?.data);
    }
  };

  const onWhatsAppPress = () => {
    bottomSheetRef?.current?.hide();
    analytics.trackTouchAnalyzeWhatsappConversationMenuOnUploadConversationSheetOnHomeScreen();
    setTimeout(() => {
      navigation?.navigate(SCREEN_NAME.WhatsAppTutorialScreen);
    }, 100);
  };

  const onIMessagePress = () => {
    bottomSheetRef?.current?.hide();
    analytics.trackTouchAnalyzeIMessageConversationMenuOnUploadConversationSheetOnHomeScreen();
    setTimeout(() => {
      navigation?.navigate(SCREEN_NAME.IMessageTutorialScreen);
    }, 100);
  };

  const getSubjectThroughRelationship = (item: any) => {
    let subject = '';
    const inputs = item?.inputs;
    if (inputs?.length > 0) {
      subject = inputs[0].subject;
    }
    return subject;
  };

  const onCoachPress = async (coach: CoachDataProps) => {
    analytics.trackTouchGeneralAssistantCardOnHomeScreen(
      coach?.name.toLowerCase() || '',
    );

    const channelData = getFilteredCoachChannel(chatContextData?.channelsList);
    if (channelData) {
      const result = await readMessagesDataFromDB(channelData?.id);
      const updatedMessages = configureChatMessages(result, {
        ...coach,
        type: channelData?.type,
        about: '',
      });
      const sectionListData = await getSectionMessages(updatedMessages);
      navigation.navigate(SCREEN_NAME.ChatScreen, {
        receiverData: {
          ...coach,
          type: channelData?.type,
          about: '',
          subject: '',
        },
        channelData: channelData,
        result,
        sectionListData,
      });
    }
  };

  const onRelationshipItemPress = async (item: any, coach: CoachDataProps) => {
    if (item?.inputs?.length > 0) {
      analytics.trackTouchRelationshipCardOnHomeScreen(
        item.id,
        item?.channel?.id || '',
        item?.inputs[0]?.source || '',
        item?.name || '',
        MixpanelData[item?.inputs[0]?.objectPronoun] || '',
        MixpanelData[item?.connection] || '',
      );
    }

    const result = await readMessagesDataFromDB(item?.channel?.id);
    const updatedMessages = configureChatMessages(result, {
      ...coach,
      type: item?.channel?.type,
      about: item?.name,
    });
    const sectionListData = await getSectionMessages(updatedMessages);
    navigation.navigate(SCREEN_NAME.ChatScreen, {
      receiverData: {
        ...coach,
        type: item?.channel?.type,
        about: item?.name,
        subject: getSubjectThroughRelationship(item),
      },
      channelData: item?.channel,
      result,
      sectionListData,
      isIMessageUploadType:
        item?.inputs[0]?.source === UploadTypeEnum?.IMessage,
      relationShipData: item,
    });
  };

  const isMyRelationshipBoxShown = () => {
    return authContextData?.userData?.gender ? false : true;
  };

  const onUploadConvPress = () => {
    analytics.trackTouchUploadConversationButtonOnHomeScreen();

    switch (Platform.OS) {
      case 'android':
        navigation?.navigate(SCREEN_NAME.WhatsAppTutorialScreen);
        break;
      case 'ios':
        bottomSheetRef?.current?.show();
        break;
    }
  };

  const onFillQuestionnairePress = () => {
    navigation?.navigate(SCREEN_NAME.FillQuestionnaireScreen); //MyRelationshipProfileScreen
  };

  return {
    bottomSheetRef,
    navigation,
    myName: authContextData?.userData?.firstName || 'User',
    isLoading: getAssistantLoading || getRelationShipsLoading,
    myAssistantData: assistantData?.data,
    myRelationShips: myRelationshipsList || [],
    lastMessageDataForCoach,
    call,
    setCall,
    onUploadConvPress,
    onRelationshipItemPress,
    onWhatsAppPress,
    onIMessagePress,
    onCoachPress,
    isMyRelationshipBoxShown,
    onFillQuestionnairePress,
  };
};
