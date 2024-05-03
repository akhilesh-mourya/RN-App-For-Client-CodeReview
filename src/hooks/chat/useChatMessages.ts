/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {useMutation, useQuery} from 'react-query';
import {configureChatMessages, getFilteredCoachChannel} from '../../utility';
import useGetApiHeaders from '../apiService/useGetApiHeaders';
import {
  addQuestionAnswer,
  getMessagesData,
  markLastMessageReadCall,
  sendMessageToServerCall,
} from '../../apiServices/chat';
import useAuth from '../context/useAuth';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  ChatType,
  MessageContentEnum,
  SCREEN_NAME,
  UploadTypeEnum,
} from '../../enums';
import {MessageOptionPressEventType, MixpanelData} from '../../constants/enums';
import {ChatMessagesType, ChatScreenScreenProps} from '../../types';
import useChat from '../context/useChat';
import {
  addMessagesDataInDB,
  checkForAnalysisTypeMessage,
  configureMsgsFillQuitionnairePress,
  configureMsgsOnMaybePress,
  getAssistantLastMessageId,
  getSectionMessages,
  readMessagesDataFromDB,
  updateAttchmentsTypeInDB,
  updateChoicesMsgIntoDB,
  updateFillQuitionnaireMsgIntoDB,
} from '../../utility/chatUtility';
import {
  getLastMessagesOfChannelFromDB,
  updateMessageProcessIntoDB,
} from '../../dbServices/messages';
import {Platform} from 'react-native';
import useRelationshipData from '../context/useRelationships';
import {getAnalysisData, getAnalysisListData} from '../../apiServices/main';
import {useAnalytics} from '../../services/analytics';

export const useChatMessages = (screenProps: ChatScreenScreenProps) => {
  const {getApiconfig} = useGetApiHeaders();
  const {authContextData} = useAuth();
  const {chatContextData} = useChat();
  const {myRelationshipsList, personalitiesList} = useRelationshipData();
  const [coachChannelData, setCoachChannelData] = useState();
  const [showSkeletonAnim, setShowSkeletonAnim] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisType, setAnalysisType] = useState('');

  const selectedExpandedAttachmentRef = useRef(undefined);

  const [
    isOpenUploadConversationSheetThroughPlusIcon,
    setOpenUploadConversationSheetThroughPlusIcon,
  ] = useState(false);

  const [canCallApi, setCanCallApi] = useState(true);
  const [isAttachmentStyleVisible, setAttachmentStyleVisible] = useState(false);
  const [
    isRelationshipHealthStatusVaisible,
    setRelationshipHealthStatusVisible,
  ] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);
  const [isKeyboardAvoidingViewEnabled, setIsKeyboardAvoidingViewEnabled] =
    useState(true);

  const bottomSheetRef = useRef<ActionSheetRef>(null);
  const updateRelationbottomSheetRef = useRef<ActionSheetRef>(null);
  const {navigate, goBack, setParams} = useNavigation();
  const {
    receiverData = authContextData?.myCoachData,
    channelData,
    result,
    sectionListData,
    isIMessageUploadType = true,
    relationShipData = null,
  } = screenProps?.route?.params || {};
  const listViewRef = useRef();
  const [messagesRawData, setMessagesRawData] = useState<any[]>(result);
  const [restructureMessage, setRestructureMessageData] =
    useState<any[]>(sectionListData);
  const isFocused = useIsFocused();
  const analytics = useAnalytics();

  const {refetch, data: messagesData} = useQuery(
    [getApiconfig, channelData?.id || coachChannelData?.id],
    getMessagesData,
    {
      enabled: authContextData.registrationProgress === 'DONE',
      refetchOnWindowFocus: true,
      staleTime: 1000,
    },
  );

  const {data: analysisDataFromApi} = useQuery(
    ['fetchAnalysisData', selectedAnalysisId],
    () => getAnalysisData(selectedAnalysisId),
    {
      enabled: !!selectedAnalysisId,
      staleTime: 1,
    },
  );

  const {data: analysisListData, refetch: refetchAnalysisListCall} = useQuery(
    ['getAnalysisData'],
    () => getAnalysisListData(relationShipData?.id),
    {
      enabled: !!relationShipData,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  );

  const {mutateAsync} = useMutation((requestBody: any) =>
    addQuestionAnswer(requestBody),
  );

  const {mutateAsync: sendMessageToServer} = useMutation((requestBody: any) =>
    sendMessageToServerCall(requestBody),
  );

  const {mutateAsync: markLastMessageRead} = useMutation((messageId: string) =>
    markLastMessageReadCall(messageId),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (canCallApi) {
        refetch();
        refetchAnalysisListCall();
        setTimeout(() => {
          setShowSkeletonAnim(false);
        }, 3000);
      }
      return () => {
        callReadMessageApi();
      };
    }, [refetch, canCallApi]),
  );

  useEffect(() => {
    if (messagesData?.data) {
      storeData(messagesData?.data);
    }
  }, [messagesData]);

  useEffect(() => {
    if (analysisDataFromApi?.data && analysisType) {
      setIsKeyboardAvoidingViewEnabled(false);
      setAnalysisData(analysisDataFromApi?.data);
      analysisType === MessageOptionPressEventType.AttachmentStyleAnalysis
        ? setAttachmentStyleVisible(true)
        : setRelationshipHealthStatusVisible(true);
      setSelectedAnalysisId(null);
    }
  }, [analysisDataFromApi?.data]);

  const callReadMessageApi = (messagesList?: Array<ChatMessagesType>) => {
    const messageId = getAssistantLastMessageId(
      messagesList || messagesRawData,
    );
    if (messageId) {
      markLastMessageRead(messageId);
    }
  };

  const showHideAttachmentStyle = () => {
    setIsKeyboardAvoidingViewEnabled(true);
    setAttachmentStyleVisible(false);

    if (relationShipData) {
      analytics.trackViewRelationshipAssistantChannelScreen(
        relationShipData.id,
      );
    }
  };

  const showHideHealthStatus = () => {
    setIsKeyboardAvoidingViewEnabled(true);
    setRelationshipHealthStatusVisible(false);

    if (relationShipData) {
      analytics.trackViewRelationshipAssistantChannelScreen(
        relationShipData.id,
      );
    }
  };

  const storeData = async (messages: any) => {
    const channelId = coachChannelData?.id || channelData?.id;
    const localMsgData = await getLastMessagesOfChannelFromDB(channelId);
    if (localMsgData?.length > 0) {
      const matchesByDate = messages.filter(x => {
        return (
          new Date(x.createdAt).getTime() >
          new Date(localMsgData[0]?.created_at).getTime()
        );
      });
      matchesByDate.length > 0 &&
        addMessagesDataInDB(matchesByDate.reverse(), channelId);
    } else {
      addMessagesDataInDB(messages.reverse(), channelId);
    }

    if (messages?.length > 0 && messages[0]?.process) {
      await updateMessageProcessIntoDB({
        ...messages[0]?.process,
        message_id: messages[0]?.id,
      });
      getMsgsDataFromDb(channelId);
    }

    messages?.map(item => {
      if (item?.question?.id === 'upload_conversation') {
        updateChoicesMsgIntoDB({
          message_id: item?.id,
          ...item?.question?.choices[0],
        });
      }
    });
  };
  /**
   * Here, If ChannelId inside channelData provided then we use that otherwise we will fetch coachData(For first time redirection)
   */
  useEffect(() => {
    if (
      chatContextData.channelsList?.length > 0 &&
      authContextData.registrationProgress === 'DONE'
    ) {
      const _coachChannelData = channelData
        ? channelData
        : getFilteredCoachChannel(chatContextData.channelsList);
      // Get messages data
      getMsgsDataFromDb(_coachChannelData?.id);
      setCoachChannelData(_coachChannelData);
      refetch();
    }
  }, [
    chatContextData.channelsList,
    authContextData.registrationProgress,
    channelData,
  ]);

  useEffect(() => {
    if (chatContextData?.messagesListContext) {
      setMessagesData(chatContextData?.messagesListContext);
    }
  }, [chatContextData?.messagesListContext]);

  useEffect(() => {
    if (authContextData.registrationProgress === 'DONE' && isFocused) {
      setTimeout(() => {
        switch (receiverData?.type) {
          case ChatType.AssistantRelationship:
            analytics.trackViewRelationshipAssistantChannelScreen(
              relationShipData.id,
            );
            break;
          case ChatType.AssistantGeneral:
            analytics.trackViewGeneralAssistantChannelScreen(
              receiverData?.name.toLowerCase(),
            );
            break;
        }
      }, 50);
    }
  }, [authContextData, isFocused]);

  useEffect(() => {
    return () => {
      chatContextData.setMessagesListContext([]);
    };
  }, []);

  /**
   * @getMsgsDataFromDb to get msgs list from BD
   */
  const getMsgsDataFromDb = async (channelId: string) => {
    readMessagesDataFromDB(channelId);
  };

  /**
   * @param messagesListData will just take new messages list & set configured messages
   */
  const setMessagesData = async (messagesListData: Array<any>) => {
    callReadMessageApi(messagesListData);

    const updatedMessages = configureChatMessages(
      messagesListData,
      receiverData,
      personalitiesList || [],
    );
    const sectionListData = getSectionMessages(updatedMessages);
    setRestructureMessageData(sectionListData);
    setMessagesRawData(messagesListData);
    const promiseArray = [];

    /**
     * Configuration for attachment type message
     */
    // const haveAttchmentWithoutTypeMsg =
    //   checkForAttachmentApiCall(messagesListData);

    messagesListData?.map(msg => {
      if (msg?.attachments?.length > 0 && !msg?.attachments[0]?.type) {
        promiseArray.push(
          new Promise((resolve, reject) => {
            checkForAnalysisTypeMessage(
              msg?.attachments[0]?.content,
              resolve,
              reject,
            );
          }),
        );
      }
    });
    try {
      if (promiseArray.length > 0) {
        const finalResult = await Promise.all(promiseArray);
        const finalMessages = messagesListData?.map((message: any) => {
          const newData = [];
          finalResult.map(attachment => {
            if (message?.attachments?.length > 0) {
              if (attachment?.id === message?.attachments[0]?.content) {
                newData.push({
                  ...message,
                  attachments: [{...message?.attachments[0], ...attachment}],
                });
              }
            }
          });
          if (newData && newData?.length > 0 && newData[0]) {
            return newData[0];
          } else {
            return message;
          }
        });
        const _updatedMessages = configureChatMessages(
          finalMessages,
          receiverData,
        );
        updateAttchmentsTypeInDB(finalMessages); // To Update attchment type in DB Attchment table
        const _sectionListData = getSectionMessages(_updatedMessages);
        setRestructureMessageData(_sectionListData);
        setMessagesRawData(finalMessages);
        chatContextData.setMessagesListContext(finalMessages);
      }
    } catch (error) {
      console.log('error=', error);
    }
  };

  const onMessageOptionPressEvent = (type: string, item: any) => {
    switch (type) {
      case MessageOptionPressEventType.FillQuestionnaire:
        onFillQuestionnairePress(item);
        break;
      case MessageOptionPressEventType.MayBeLater:
        onMayBeLaterPress(item);
        break;
      case MessageOptionPressEventType.UploadConversation:
        analytics.trackSelectOptionOnUploadConversationMessageOnGeneralAssistantChannelScreen(
          'upload a conversation',
        );
        onUploadConvPress(false);
        break;
      case MessageOptionPressEventType.EditRelationship:
        onEditRelationshipPress(item);
        break;
      case MessageOptionPressEventType.GoToRelationships:
        onGoToRelationhipPress();
        break;
      case MessageOptionPressEventType.RelationshipHealthStatus:
      case MessageOptionPressEventType.AttachmentStyleAnalysis:
        selectedExpandedAttachmentRef.current = item.attachments[0];

        const analysisId = item?.attachments?.[0]?.id;
        if (analysisId) {
          analytics.trackOpenAnalysisAttachmentOnRelationshipAssistantChannelScreen(
            relationShipData.id,
            analysisId,
          );
        }

        setAnalysisType(type);
        if (
          (item?.attachments?.length > 0 && !analysisData) ||
          (analysisData && analysisData?.id !== item?.attachments[0]?.content)
        ) {
          setSelectedAnalysisId(item?.attachments[0]?.content);
        } else if (analysisData) {
          if (item?.attachments?.length > 0) {
            setTimeout(() => {
              setIsKeyboardAvoidingViewEnabled(false);
              type === MessageOptionPressEventType.AttachmentStyleAnalysis
                ? setAttachmentStyleVisible(true)
                : setRelationshipHealthStatusVisible(true);
            }, 200);
          }
        }
        break;
      default:
        break;
    }
  };

  const onGoToRelationhipPress = () => {
    analytics.trackSelectOptionOnGettingYourAnalysisReadyMessageOnGeneralAssistantChannelScreen(
      MixpanelData.go_to_relationships,
    );
    goBack();
  };

  const onEditRelationshipPress = (item: any) => {
    const userData = authContextData?.userData;
    const updateQuestionnaire = {
      ...authContextData?.questionnaire,
      gender: userData?.gender || '',
      genderInterest: userData?.genderInterest || '',
      relationshipStatus: userData?.relationshipStatus,
      relationshipType: userData?.relationshipGoal,
    };
    authContextData?.setQuestionnaire(updateQuestionnaire);
    analytics.trackTouchEditRelationshipButtonOnFilledRelationshipMessageOnGeneralAssistantChannelScreen();
    navigate(SCREEN_NAME.FillQuestionnaireScreen);
  };

  const onFillQuitionnaireDone = () => {
    setCanCallApi(false);
    updateFillQuitionnaireMsgIntoDB(messagesRawData, updatedList => {
      const newMsgsList = configureMsgsFillQuitionnairePress(updatedList);
      chatContextData.setMessagesListContext(newMsgsList);
      setMessagesData(newMsgsList);
    });
    setTimeout(() => {
      setCanCallApi(true);
    }, 3000);
  };

  const onFillQuestionnairePress = (item: any) => {
    authContextData?.setQuestionnaire(null);
    analytics.trackSelectOptionOnGetStartedMessageOnGeneralAssistantChannelScreen(
      MixpanelData.fill_out_questionnaire,
    );
    navigate(SCREEN_NAME.FillQuestionnaireScreen, {
      onFillQuitionnaireDoneFromMsg: onFillQuitionnaireDone,
    });
  };

  const onMayBeLaterPress = (item: any) => {
    // Shelving this method as Alex requested to keep buttons
    // updateMayBeLaterMsgIntoDB commenting as discussion 06 Feb
    analytics.trackSelectOptionOnGetStartedMessageOnGeneralAssistantChannelScreen(
      MixpanelData.may_be_later,
    );
    updateFillQuitionnaireMsgIntoDB(messagesRawData, updatedList => {
      const newMsgsList = configureMsgsOnMaybePress(updatedList);
      setMessagesData(newMsgsList);
      chatContextData.setMessagesListContext(newMsgsList);
      const requestBody = {
        messageId: item?.id,
        reqBody: {
          choiceContentId: item?.question?.choices.filter(
            a => a?.content === MessageContentEnum.MayBeLater,
          )[0]?.contentId,
        },
        headers: getApiconfig,
      };
      mutateAsync(requestBody)
        .then(() => {
          setTimeout(() => {
            refetch();
          }, 3000);
        })
        .catch(error => {
          console.log('Error ===', error);
        });
    });
  };

  const goToWhatsappTutorial = () => {
    navigate(SCREEN_NAME.WhatsAppTutorialScreen, {
      isFromChat: true,
    });
  };

  const updateTrackerForPlusIcon = () => {
    switch (channelData?.type) {
      case ChatType?.AssistantRelationship:
        analytics.trackTouchPlusIconOnRelationshipAssistantChannelScreen(
          relationShipData.id,
        );
        break;
      case ChatType?.AssistantGeneral:
        analytics.trackTouchPlusIconOnGeneralAssistantChannelScreen();
        break;
      default:
        break;
    }
  };

  const onUploadConvPress = (isFromPlus = true) => {
    if (isFromPlus) {
      updateTrackerForPlusIcon();
    }

    setOpenUploadConversationSheetThroughPlusIcon(isFromPlus);
    switch (Platform.OS) {
      case 'android':
        channelData?.type === ChatType?.AssistantRelationship
          ? updateRelationbottomSheetRef?.current?.show()
          : goToWhatsappTutorial();
        break;
      case 'ios':
        channelData?.type === ChatType?.AssistantRelationship
          ? updateRelationbottomSheetRef?.current?.show()
          : bottomSheetRef?.current?.show();
        break;
    }
  };

  const onWhatsAppPress = () => {
    bottomSheetRef?.current?.hide();
    updateRelationbottomSheetRef?.current?.hide();
    if (isOpenUploadConversationSheetThroughPlusIcon) {
      analytics.trackTouchAnalyzeWhatsappConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen();
    } else {
      analytics.trackSelectOptionOnUploadConversationMessageOnGeneralAssistantChannelScreen(
        'whatsapp',
      );
    }
    setTimeout(() => {
      goToWhatsappTutorial();
    }, 100);
  };

  const onIMessagePress = () => {
    bottomSheetRef?.current?.hide();
    if (isOpenUploadConversationSheetThroughPlusIcon) {
      analytics.trackTouchAnalyzeIMessageConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen();
    } else {
      analytics.trackSelectOptionOnUploadConversationMessageOnGeneralAssistantChannelScreen(
        'iMessage',
      );
    }
    updateRelationbottomSheetRef?.current?.hide();
    setTimeout(() => {
      navigate(SCREEN_NAME.IMessageTutorialScreen);
    }, 100);
  };

  const onNewAnalysisPress = () => {
    bottomSheetRef?.current?.hide();
    analytics.trackTouchNewAnalysisMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen(
      relationShipData.id,
    );
    updateRelationbottomSheetRef?.current?.hide();
    setTimeout(() => {
      navigate(SCREEN_NAME.ChooseAnalysisScreen, {
        isFromAnalysis: true,
        relationshipId: relationShipData?.id,
        analysisListData: analysisListData?.data || [],
        relationShipData: relationShipData,
      });
    }, 100);
  };

  const updateTracker = (apiResponse: any, msgText: string) => {
    switch (receiverData?.type) {
      case ChatType.AssistantRelationship:
        analytics.trackSendMessageOnRelationshipAssistantChannelScreen(
          relationShipData.id,
          msgText,
        );
        break;
      case ChatType.AssistantGeneral:
        analytics.trackSendMessageOnGeneralAssistantChannelScreen(msgText);
        break;
      default:
        break;
    }
  };

  const sendMessage = (msgText: string) => {
    const requestBody = {
      channelId: coachChannelData?.id || channelData?.id,
      reqBody: {
        content: msgText,
        contentType: 'text',
      },
      headers: getApiconfig,
    };
    sendMessageToServer(requestBody).then(data => {
      updateTracker(data, msgText);
    });
  };

  const onUpdateConvPress = () => {
    bottomSheetRef?.current?.hide();
    updateRelationbottomSheetRef?.current?.hide();
    if (relationShipData?.inputs[0]?.source === UploadTypeEnum.WhatsApp) {
      const inputs = relationShipData?.inputs;
      if (inputs?.length > 0) {
        analytics.trackTouchUpdateYourWhatsappConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen(
          relationShipData.id,
        );
      }
      navigate(SCREEN_NAME.WhatsAppTutorialScreen, {
        isFromAnalysis: true,
        isForSync: true,
        relationShipData: relationShipData,
      });
    } else {
      const inputs = relationShipData?.inputs;
      if (inputs?.length > 0) {
        analytics.trackTouchUpdateYourIMessageConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen(
          'iMessage',
          relationShipData?.name,
          MixpanelData[inputs[0].objectPronoun],
          MixpanelData[relationShipData?.connection] || '',
        );
      }
      navigate(SCREEN_NAME.IMessageSyncLoadingScreen, {
        channelId: channelData?.id || coachChannelData?.id,
      });
    }
  };

  const onProfilePress = () => {
    analytics.trackTouchRelationshipInfoButtonOnRelationshipAssistantChannelScreen(
      relationShipData.id,
    );
    navigate(SCREEN_NAME.RelationshipProfileScreen, {
      relationShipData: relationShipData,
      updateReceiverDataIfEdited: updateReceiverDataIfEdited,
      receiverData: receiverData,
    });
  };

  const updateReceiverDataIfEdited = newReceiverData => {
    setParams({receiverData: {...receiverData, about: newReceiverData?.name}});
  };

  return {
    restructureMessage,
    bottomSheetRef,
    updateRelationbottomSheetRef,
    receiverData: receiverData || coachChannelData,
    messagesRawData,
    showSkeletonAnim,
    isAttachmentStyleVisible,
    isRelationshipHealthStatusVaisible,
    onMessageOptionPressEvent,
    showHideAttachmentStyle,
    showHideHealthStatus,
    onWhatsAppPress,
    onIMessagePress,
    onNewAnalysisPress,
    userData: authContextData?.userData,
    listViewRef,
    onMayBeLaterPress,
    sendMessage,
    onUploadConvPress,
    isIMessageUploadType,
    relationShipData,
    onUpdateConvPress,
    onProfilePress,
    myRelationshipsList,
    analysisData,
    selectedExpandedAttachmentRef,
    isKeyboardAvoidingViewEnabled,
  };
};
