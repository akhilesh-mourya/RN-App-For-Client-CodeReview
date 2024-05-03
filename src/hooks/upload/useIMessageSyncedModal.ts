import {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useLoader} from '../loader/useLoader';
import {SCREEN_NAME} from '../../enums';
import {getInTimeFormat} from '../../helpers/commonFunctions';
import {useMutation} from 'react-query';
import {deleteUpload} from '../../apiServices/registration';
import {useAnalytics} from '../../services/analytics';

export const useIMessageSyncedModal = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {showLoader, hideLoader, hideLoaderAndShowErrorMessage} = useLoader();
  const [authors, setAuthers] = useState({});
  const {iMessageInfo, uploadData}: any = params || {};
  const [isCancelUploadVisible, setCancelUploadVisible] = useState(false);
  const {mutateAsync: deleteUploadCall} = useMutation((uploadId: string) =>
    deleteUpload(uploadId),
  );
  const navigation = useNavigation();
  const onCancelUploadPress = () => {
    analytics.trackTouchCancelUploadOnIMessageScreen();
    showHideCancelUploadPopup();
  };

  const onNevermindPress = () => {
    analytics.trackTouchNevermindButtonOnCancelConfirmationPopupOnIMessageSyncedScreen();
    showHideCancelUploadPopup();
  };
  const showHideCancelUploadPopup = () => {
    setCancelUploadVisible(!isCancelUploadVisible);
  };

  const analytics = useAnalytics();
  const lastSyncedDate = () => {
    return getInTimeFormat(uploadData?.createdAt);
  };

  useEffect(() => {
    getUploadInfo();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewIMessageSyncedScreen();
    }
  }, [analytics, isFocused]);

  const getUploadInfo = async () => {
    showLoader();
    try {
      const names = {};
      iMessageInfo?.senders?.map(item => {
        if (item?.role === 'subject') {
          names.subject = item?.name;
        } else {
          names.object = item?.name;
        }
      });
      setAuthers(names);
      hideLoader();
    } catch (error) {
      hideLoaderAndShowErrorMessage(error);
    }
  };

  const deleteRelationship = () => {
    analytics.trackTouchYesButtonOnCancelConfirmationPopupOnIMessageSyncedScreen();
    setCancelUploadVisible(false);
    showLoader();
    deleteUploadCall(uploadData?.id)
      ?.then(() => {
        hideLoader();
        navigation.goBack();
      })
      .catch(error => {
        hideLoader();
      });
  };
  const onContinuePress = () => {
    analytics.trackTouchContinueButtonOnIMessageSyncedScreen();
    navigate(SCREEN_NAME.FillIMessageQuestionnaireScreen, {
      otherUserName: authors?.object,
      myName: authors?.subject,
      uploadId: uploadData?.id,
      isExistingFlow: false,
    });
  };

  return {
    authors,
    onContinuePress,
    showHideCancelUploadPopup,
    isCancelUploadVisible,
    lastSyncedDate,
    deleteRelationship,
    onCancelUploadPress,
    onNevermindPress,
  };
};
