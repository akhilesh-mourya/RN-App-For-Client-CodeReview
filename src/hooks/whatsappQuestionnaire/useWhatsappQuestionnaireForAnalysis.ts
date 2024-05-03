/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthorsListType} from '../../types';
import {useMutation} from 'react-query';
import {updateRelationship, uploadWhatsappChat} from '../../apiServices/main';
import {RelationshipReqData} from '../../../@types/common';
import {useLoader} from '../loader/useLoader';
import {SCREEN_NAME} from '../../enums';
import {isNamesDiffForUpdateRelation} from '../../utility';
import {
  getIndexOfMatchesAuthor,
  getIndexOfMatchesAuthorWithExistingRelation,
} from '../../helpers/commonFunctions';
import useAuth from '../context/useAuth';
import {useAnalytics} from '../../services/analytics';

export const useWhatsappQuestionnaireForAnalysis = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {authContextData} = useAuth();
  const {userData} = authContextData;
  const {showLoader, hideLoader, hideLoaderAndShowErrorMessage} = useLoader();
  const {authorsList, relationShipData, messagesList}: any = params || {};
  const analytics = useAnalytics();
  const [selectedOptionForUserSelection, setSelectedOptionForUserSelection] =
    useState(getIndexOfMatchesAuthor(authorsList, userData));
  const [senders, setSenders] = useState<AuthorsListType>([]);
  const [isNamesDiff] = useState(
    isNamesDiffForUpdateRelation(
      {selectedExistingRelData: relationShipData},
      authorsList,
    ),
  );
  const {mutateAsync: updateRelationshipMutate} = useMutation(
    (requestBody: RelationshipReqData) => updateRelationship(requestBody),
  );
  const {mutateAsync: uploadChatCall} = useMutation((requestBody: any) =>
    uploadWhatsappChat(requestBody),
  );

  // TODO: UGHHH CHECK THIS
  // useEffect(() => {
  //   analytics.trackViewSelectNameThatBelongsToYouScreen();
  // });

  useEffect(() => {
    if (senders.length === 0) {
      configureAuthers(authorsList);
    }
  }, [senders]);

  useEffect(() => {
    if (!isNamesDiff && selectedOptionForUserSelection < 0) {
      const subject =
        relationShipData?.inputs?.length > 0
          ? relationShipData?.inputs[0]?.subject || ''
          : '';
      setSelectedOptionForUserSelection(
        getIndexOfMatchesAuthorWithExistingRelation(authorsList, subject),
      );
    }
  }, [isNamesDiff]);

  const getOtherUserName = () => {
    if (selectedOptionForUserSelection === 1) {
      return senders[0];
    } else {
      return senders[1];
    }
  };

  const configureAuthers = (authers: AuthorsListType) => {
    setSenders(authers);
  };

  const updateOptionForStep = (pos: number, stepVal: number, val: string) => {
    setSelectedOptionForUserSelection(pos);
  };

  const afterChatUploaded = (uploadId: number | string, objectName: string) => {
    const data = relationShipData?.inputs[0];
    const updateReqData = {
      uploadId: uploadId,
      subject: senders[selectedOptionForUserSelection],
      object: senders[selectedOptionForUserSelection === 0 ? 1 : 0],
      objectPronoun: data?.objectPronoun,
      relationshipId: relationShipData?.id,
    };
    updateRelationshipMutate(updateReqData)
      .then(() => {
        hideLoader();
        navigate(SCREEN_NAME.WhatsappSyncdSuccessScreen, {
          relationShipData: {
            ...relationShipData,
            object: objectName,
          },
        });
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  const onContinuePress = () => {
    const objectName = getOtherUserName();
    showLoader();
    const requestBody = {
      messages: messagesList,
    };
    uploadChatCall(requestBody)
      .then(data => {
        afterChatUploaded(data?.data?.id, objectName);
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  return {
    selectedOptionForUserSelection,
    updateOptionForStep,
    senders,
    isNamesDiff,
    getOtherUserName,
    onContinuePress,
  };
};
