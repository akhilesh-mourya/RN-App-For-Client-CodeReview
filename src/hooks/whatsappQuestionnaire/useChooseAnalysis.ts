import {useTranslation} from 'react-i18next';
import {
  AnalysisDataList,
  isSelectedAnalysysAlreadyExist,
} from '../../helpers/commonFunctions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CreateAnalysysReqData,
  RelationshipReqData,
} from '../../../@types/common';
import {useMutation} from 'react-query';
import {
  createAnalysysCall,
  createRelationship,
  updateRelationship,
  uploadWhatsappChat,
} from '../../apiServices/main';
import useAuth from '../context/useAuth';
import {useLoader} from '../loader/useLoader';
import {ErroPopupType, UploadTypeEnum} from '../../enums';
import {
  goBackMultipleScreens,
  resetToChatFromAnalysis,
  resetToHomeFromAnalysis,
} from '../../navigation/navigationHelper';
import useGetApiHeaders from '../apiService/useGetApiHeaders';
import useRelationshipData from '../context/useRelationships';
import useChat from '../context/useChat';
import {
  configureChatMessages,
  getFilteredCoachChannel,
  getIsRelationshipCreated,
  setRelationshipCreated,
} from '../../utility';
import {
  getSectionMessages,
  readMessagesDataFromDB,
} from '../../utility/chatUtility';
import {useEffect} from 'react';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';

export const useChooseAnalysis = () => {
  const {params} = useRoute();
  const {t} = useTranslation();
  const {navigate, goBack} = useNavigation();
  const {authContextData} = useAuth();
  const {chatContextData} = useChat();

  const {getApiconfig} = useGetApiHeaders();
  const {callgetRelationships, myRelationshipsList} = useRelationshipData();
  const {
    showLoader,
    hideLoader,
    hideLoaderAndShowErrorMessage,
    showErrorMessage,
  } = useLoader();
  const {mutateAsync} = useMutation((requestBody: RelationshipReqData) =>
    createRelationship(requestBody, getApiconfig),
  );
  const {mutateAsync: uploadChatCall} = useMutation((requestBody: any) =>
    uploadWhatsappChat(requestBody, getApiconfig),
  );
  const {mutateAsync: createAnalysys} = useMutation((requestBody: any) =>
    createAnalysysCall(requestBody),
  );
  const {
    createRelationReqData,
    isUpdateRelationship,
    relationshipId,
    uploadedChatMessagesList,
    isFromIMessage = false,
    isFromAnalysis = false,
    analysisListData = [],
    isFromChat = true,
    relationShipData,
  }: any = params || {};
  const {mutateAsync: updateRelationshipMutate} = useMutation(
    (requestBody: RelationshipReqData) =>
      updateRelationship(requestBody, getApiconfig),
  );
  const analytics = useAnalytics();
  const resetNavigationOnDone = () => {
    if (isFromChat) {
      goBackMultipleScreens(3);
    } else {
      resetToHomeFromAnalysis();
    }
  };

  useEffect(() => {
    analytics.trackViewAnalysisTypePickerScreen();
  }, []);

  const handleRedirectionAfterAnalysis = async (data: any) => {
    const hasCreated: string = await getIsRelationshipCreated();
    setRelationshipCreated();
    if (
      myRelationshipsList?.length === 0 &&
      isFromChat &&
      hasCreated !== 'YES'
    ) {
      goBackMultipleScreens(3);
    } else if (myRelationshipsList?.length === 0 && hasCreated !== 'YES') {
      const channelData = getFilteredCoachChannel(
        chatContextData?.channelsList,
      );
      if (channelData) {
        const result = await readMessagesDataFromDB(channelData?.id);
        const updatedMessages = configureChatMessages(result, {
          ...authContextData?.myCoachData,
          type: channelData?.type,
          about: '',
        });
        const sectionListData = await getSectionMessages(updatedMessages);
        const _params = {
          receiverData: {
            ...authContextData?.myCoachData,
            type: channelData?.type,
            about: '',
          },
          channelData: channelData,
          result,
          sectionListData,
        };
        resetToChatFromAnalysis(_params);
      } else {
        resetToHomeFromAnalysis();
      }
    } else {
      const _params = {
        receiverData: {
          ...authContextData?.myCoachData,
          type: data?.data?.channel?.type,
          about: data?.data?.name,
          subject:
            data?.data?.inputs?.length > 0 ? data?.data?.inputs[0].subject : '',
        },
        channelData: data?.data?.channel,
        isIMessageUploadType:
          data?.data?.inputs[0]?.source === UploadTypeEnum?.IMessage,
        relationShipData: data?.data,
      };
      resetToChatFromAnalysis(_params);
    }
  };

  const createRelationshipCall = (reqData: RelationshipReqData) => {
    mutateAsync(reqData)
      .then(data => {
        callgetRelationships(); // To Sync Relationship data
        authContextData?.updateUserData({
          ...authContextData?.userData,
          initialBotMessagesStatus: {
            ...(authContextData?.userData?.initialBotMessagesStatus || {}),
            isConversationUploaded: true,
          },
        });
        setTimeout(() => {
          hideLoader();
          chatContextData?.setMessagesListContext(null);
          authContextData?.setCurrCreateRelationshipData(null);
          handleRedirectionAfterAnalysis(data);
        }, 1000);
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };
  const updateRelationshipCall = reqData => {
    const updateReqData = {
      uploadId: reqData?.uploadId,
      subject: reqData?.subject,
      object: reqData?.object,
      objectPronoun: reqData?.objectPronoun,
      relationshipId: relationshipId,
    };
    updateRelationshipMutate(updateReqData)
      .then(({}) => {
        callgetRelationships(); // To Sync Relationship data
        authContextData?.updateUserData({
          ...authContextData?.userData,
          initialBotMessagesStatus: {
            ...(authContextData?.userData?.initialBotMessagesStatus || {}),
            isConversationUploaded: true,
          },
        });
        hideLoader();
        authContextData?.setCurrCreateRelationshipData(null);
        resetNavigationOnDone();
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };
  const afterChatUploaded = (analysisData: any, uploadedId: string) => {
    const analysisType = analysisData?.value;
    const reqData: RelationshipReqData = {
      ...createRelationReqData,
      initialAnalysisType: analysisType,
      uploadId: uploadedId,
    };
    if (isUpdateRelationship) {
      updateRelationshipCall(reqData);
    } else {
      createRelationshipCall(reqData);
    }
  };
  const callWhatsappFlow = (analysisData: any) => {
    showLoader();
    const requestBody = {
      messages: uploadedChatMessagesList,
    };
    uploadChatCall(requestBody)
      .then(data => {
        authContextData?.setUploadedWhatsappId(data?.data?.id);
        afterChatUploaded(analysisData, data?.data?.id);
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };
  const callIMessageFlow = (analysisData: any) => {
    showLoader();
    afterChatUploaded(analysisData, createRelationReqData?.uploadId);
  };
  const onNewAnalysisCall = (analysisData: any) => {
    showLoader();
    const reqData: CreateAnalysysReqData = {
      type: analysisData?.value,
    };
    createAnalysys({reqData: reqData, relationshipId: relationshipId})
      .then(() => {
        hideLoader();
        goBack();
      })
      .catch(() => {
        hideLoader();
      });
  };

  const updateAnalysisTrackerWithParams = (analysis: string) => {
    if (createRelationReqData) {
      analytics.trackSelectAnalysisTypeOnAnalysisTypePickerScreen(
        analysis,
        relationshipId,
      );
    } else if (relationShipData) {
      analytics.trackSelectAnalysisTypeOnAnalysisTypePickerScreen(
        analysis,
        relationshipId,
      );
    } else {
      analytics.trackSelectAnalysisTypeOnAnalysisTypePickerScreen(analysis);
    }
  };

  const updateTracker = (analysisData: any) => {
    updateAnalysisTrackerWithParams(MixpanelData[analysisData?.value]);
  };
  const onChooseAnalysis = (analysisData: any) => {
    updateTracker(analysisData);

    if (isFromIMessage) {
      callIMessageFlow(analysisData);
    } else if (isFromAnalysis) {
      const isAnalysysAlreadyExist = isSelectedAnalysysAlreadyExist(
        analysisListData,
        analysisData?.value,
      );
      if (isAnalysysAlreadyExist) {
        showErrorMessage({
          errorMessage: t('Analysys_Already_Exist_Popup_Label'),
          errorPopupType: ErroPopupType.ErrorWithCancelButton,
          onSuccessCallBack: () => onNewAnalysisCall(analysisData),
          okButtonLable: t('I_Am_Sure'),
          cancelButtonLabel: t('Cancel'),
        });
      } else {
        onNewAnalysisCall(analysisData);
      }
    } else {
      callWhatsappFlow(analysisData);
    }
  };

  return {
    t,
    AnalysisDataList: AnalysisDataList,
    navigate,
    onChooseAnalysis,
  };
};
