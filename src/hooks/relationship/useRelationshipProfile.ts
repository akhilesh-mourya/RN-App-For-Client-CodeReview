import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {
  deleteRelationship,
  getAnalysisListData,
  getRelationshipInfo,
} from '../../apiServices/main';
import {useTranslation} from 'react-i18next';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ErroPopupType, SCREEN_NAME, UploadTypeEnum} from '../../enums';
import {getLastSyncedDate} from '../../helpers/commonFunctions';
import {useLoader} from '../loader/useLoader';
import {resetHomeRoute} from '../../navigation/navigationHelper';
import useAuth from '../context/useAuth';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';
import useRelationshipData from '../context/useRelationships';
import Emitter from '../../eventService';

export const useRelationshipProfile = () => {
  const {params} = useRoute();
  const bottomSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const {navigate, goBack} = useNavigation();
  const {authContextData} = useAuth();
  const analytics = useAnalytics();
  const {setAnalysisList, analysisList} = useRelationshipData();
  const {showErrorMessage, showLoader, hideLoader} = useLoader();
  const [relationshipProfileCursor, setRelationshipProfileCursor] =
    useState('');
  const {
    relationShipData = null,
    updateReceiverDataIfEdited = () => {},
    receiverData = {},
  } = params || {};
  const {data: analysisData, refetch} = useQuery(
    ['getAnalysisData', relationshipProfileCursor],
    () => getAnalysisListData(relationShipData?.id, relationshipProfileCursor),
    {
      enabled: !!relationShipData,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  );

  const [analysisListData, setAnalysisListData] = useState([]);
  const [relationshipInfo, setRelationshipInfo] = useState(relationShipData);
  const [isAttachmentStyleVisible, setAttachmentStyleVisible] = useState(false);
  const [meta, setMeta] = useState();
  const [
    isRelationshipHealthStatusVaisible,
    setRelationshipHealthStatusVisible,
  ] = useState(false);
  const [relationAnalysisData, setRelationAnalysisData] = useState(null);

  const {
    data: apiRelationshipObj,
    refetch: fetchRelationshipData,
    isLoading,
  } = useQuery(
    'fetchRelationshipData',
    () => getRelationshipInfo(relationShipData?.id),
    {
      enabled: !!relationShipData,
      cacheTime: 0,
      refetchOnWindowFocus: true,
      staleTime: 5000,
    },
  );

  const {mutateAsync} = useMutation((relationshipId: string | number) =>
    deleteRelationship(relationshipId, authContextData?.authToken),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (relationShipData) {
        refetch();
        fetchRelationshipData();
      }
    }, [relationShipData, refetch]),
  );

  useEffect(() => {
    if (analysisData?.data) {
      setAnalysisList(analysisData?.data);
    }
  }, [analysisData]);

  useEffect(() => {
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoading]);

  useEffect(() => {
    if (apiRelationshipObj?.data) {
      setRelationshipInfo(apiRelationshipObj?.data);
    }
  }, [apiRelationshipObj]);

  useEffect(() => {
    Emitter.on('analysis_ready', handleAnalysisReady);
    return () => {
      Emitter.off('analysis_ready', () => {});
    };
  }, []);

  const handleAnalysisReady = () => {
    refetch();
    fetchRelationshipData();
  };

  const getUploadType = () => {
    if (relationshipInfo?.inputs[0]?.source === UploadTypeEnum.WhatsApp) {
      return t('WhatsApp');
    } else {
      return t('iMessage');
    }
  };

  const lastSyncedDate = () => {
    return getLastSyncedDate(relationshipInfo?.inputs[0]?.messagesUpdatedAt);
  };

  const onTrippleDotPress = () => {
    analytics.trackTouchMenuButtonOnRelationshipDetailScreen(
      relationShipData.id,
    );
    bottomSheetRef?.current?.show();
  };

  const onEditPress = () => {
    bottomSheetRef?.current?.hide();
    analytics.trackTouchEditNameMenuOnMenuSheetOnRelationshipDetailScreen(
      relationShipData.id,
    );
    navigate(SCREEN_NAME.EditRelationshipNameScreen, {
      relationShipData: relationshipInfo,
    });
  };

  const onDeletePress = () => {
    bottomSheetRef?.current?.hide();
    analytics.trackTouchDeleteRelationshipMenuOnMenuSheetOnRelationshipDetailScreen(
      relationShipData.id,
    );
    setTimeout(() => {
      showErrorMessage({
        errorMessage: t('Delete_Relationship_Title'),
        errorPopupType: ErroPopupType.DeleteConfirmation,
        onSuccessCallBack: onConfirmDelete,
        onCancelCallBack: onCancelDelete,
      });
    }, 300);
  };

  const onCancelDelete = () => {
    analytics.trackTouchCancelButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen(
      relationShipData.id,
    );
  };

  const onConfirmDelete = () => {
    showLoader();
    analytics.trackTouchDeleteButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen(
      relationShipData.id,
    );
    setTimeout(() => {
      mutateAsync(relationshipInfo?.id)
        .then(() => {
          hideLoader();
          resetHomeRoute();
        })
        .catch(error => {
          hideLoader();
          console.log('Error', error);
        });
    }, 300);
  };

  const loadMore = (cursor: string) => {
    setRelationshipProfileCursor(cursor);
  };

  const onNewAnalysisPress = () => {
    analytics.trackTouchNewAnalysisButtonOnRelationshipDetailScreen(
      relationShipData.id,
    );
    navigate(SCREEN_NAME.ChooseAnalysisScreen, {
      isFromAnalysis: true,
      relationshipId: relationshipInfo?.id,
      analysisListData: analysisData?.data || [],
      relationShipData: relationShipData,
    });
  };

  const onSyncPress = () => {
    analytics.trackTouchSyncButtonOnRelationshipDetailScreen(
      relationShipData.id,
    );
    if (relationshipInfo?.inputs[0]?.source === UploadTypeEnum.WhatsApp) {
      navigate(SCREEN_NAME.WhatsAppTutorialScreen, {
        isFromAnalysis: true,
        isForSync: true,
        relationShipData: relationshipInfo,
      });
    } else {
      navigate(SCREEN_NAME.IMessageSyncLoadingScreen, {
        channelId: relationShipData?.channel?.id,
      });
    }
  };

  const onGoBack = () => {
    updateReceiverDataIfEdited(relationshipInfo);
    goBack();
  };

  const updateTracker = (analysisData: any) => {
    if (analysisData) {
      analytics.trackTouchAnalysisCardOnRelationshipDetailScreen(
        relationShipData.id,
        analysisData.id,
      );
    }
  };

  const onAnalysisPress = analysisData => {
    setRelationAnalysisData(analysisData);
    updateTracker(analysisData);
    analysisData?.type === 'relationship_health_status'
      ? setRelationshipHealthStatusVisible(true)
      : setAttachmentStyleVisible(true);
  };

  const showHideAttachmentStyle = () => {
    setRelationAnalysisData(null);
    setAttachmentStyleVisible(false);
    analytics.trackViewRelationshipDetailScreen(relationShipData.id);
  };

  useEffect(() => {
    if (analysisData?.data && analysisListData?.length > 0) {
      setAnalysisListData([...analysisListData, ...analysisData?.data]);
      setMeta(analysisData?.meta);
    } else if (analysisData?.data && analysisListData?.length === 0) {
      setAnalysisListData([...analysisData?.data]);
      setMeta(analysisData?.meta);
    }
  }, [analysisData]);

  const showHideHealthStatus = () => {
    setRelationAnalysisData(null);
    setRelationshipHealthStatusVisible(false);
  };

  return {
    analysisListData: analysisList || [],
    t,
    bottomSheetRef,
    relationShipData: relationshipInfo,
    onTrippleDotPress,
    onEditPress,
    onDeletePress,
    getUploadType,
    lastSyncedDate,
    onGoBack,
    onNewAnalysisPress,
    onSyncPress,
    onAnalysisPress,
    isAttachmentStyleVisible,
    isRelationshipHealthStatusVaisible,
    showHideAttachmentStyle,
    showHideHealthStatus,
    relationAnalysisData,
    receiverData,
    loadMore,
    meta,
  };
};
