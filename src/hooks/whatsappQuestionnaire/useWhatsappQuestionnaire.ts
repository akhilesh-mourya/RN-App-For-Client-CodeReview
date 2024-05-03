/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import useAuth from '../context/useAuth';
import {RelationshipReqData} from '../../../@types/common';
import {CreateRelationPronoun, SCREEN_NAME} from '../../enums';
import useRelationshipData from '../context/useRelationships';
import {
  extractNameDetails,
  getRelationshipsForUpload,
  getUpdatedContextDataForPreNames,
  isNamesDiffForUpdateRelation,
} from '../../utility';
import {AuthorsListType} from '../../types';
import {PRONOUN_LIST, RELATIONSHIP_TYPE_LIST} from '../../constants/mockData';
import {
  getIndexOfMatchesAuthor,
  getIndexOfMatchesAuthorWithExistingRelation,
} from '../../helpers/commonFunctions';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';
import {useLoader} from '../loader/useLoader';
import {updateRelationship, updateWhatsappChat} from '../../apiServices/main';

export const useWhatsappQuestionnaire = () => {
  const {params} = useRoute();
  const {
    isFromWhatsAppUpload = false,
    messagesList = [],
    authorsList = [],
    isFromChat = false,
    isFromUpdateAndDiffConv = false,
    relationShipData = null,
  }: any = params || {};
  const navigation = useNavigation();
  const {authContextData} = useAuth();
  const {showLoader, hideLoader} = useLoader();
  const [step, setStep] = useState(1);
  const {myRelationshipsList} = useRelationshipData();
  const {userData} = authContextData;
  const [
    selectedOptionForRelationshipType,
    setSelectedOptionForRelationshipType,
  ] = useState(-1);
  const [relationshipName, setRelationshipName] = useState('');
  const [selectedOptionForUserSelection, setSelectedOptionForUserSelection] =
    useState(getIndexOfMatchesAuthor(authorsList, userData));
  const [
    selectedOptionForExistingUserSelection,
    setSelectedOptionForExistingUserSelection,
  ] = useState(-1);
  const [senders, setSenders] = useState<AuthorsListType>([]);
  const [sendersWhenRelations, setSendersWhenRelations] = useState<Array<any>>(
    [],
  );
  const [isNamesDiff, setIsNamesDiff] = useState(false);
  const [isUpdateFlow, setIsUpdateFlow] = useState(false);
  const [existingRelationhipData, setExistingRelationhipData] =
    useState<any>(null);
  const [isConfirmationPopupVisible, setConfirmationPopupVisible] =
    useState(false);

  const pronounList = PRONOUN_LIST || [];
  const relationshipTypeList = RELATIONSHIP_TYPE_LIST || [];
  const analytics = useAnalytics();
  const existingRelationToUpdateName =
    relationShipData && relationShipData?.inputs?.length > 0
      ? relationShipData?.inputs[0]?.object
      : 'User';

  useEffect(() => {
    if (senders.length === 0) {
      configureAuthers(authorsList);
    }
  }, [senders]);

  const relationshipList = useMemo(() => {
    return getRelationshipsForUpload(
      myRelationshipsList,
      isFromWhatsAppUpload,
      isFromUpdateAndDiffConv,
      relationShipData,
    );
  }, []);

  const onClickCreateNewRelationship = () => {
    setIsUpdateFlow(false);
    setExistingRelationhipData(null);
    setIsNamesDiff(false);
    setSelectedOptionForUserSelection(
      getIndexOfMatchesAuthor(authorsList, userData),
    );
  };

  const getOtherUserName = () => {
    return authContextData?.currCreaterelationshipData?.otherUserName;
  };

  const getPosForPronoun = () => {
    let interest = authContextData?.userData?.genderInterest;
    if (interest) {
      if (interest === 'man') {
        return 0;
      } else if (interest === 'women') {
        return 1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  };

  const configureAuthers = (authers: AuthorsListType) => {
    setSenders(authers);
    const newList = authers?.map(_name => ({
      name: _name,
    }));
    setSendersWhenRelations(newList);
    updateStepOneAndTwoData(
      authers,
      getPosForPronoun() === 0
        ? CreateRelationPronoun?.He
        : getPosForPronoun() === 1
        ? CreateRelationPronoun?.She
        : null,
    );
  };

  const [selectedOptionForPronoun, setSelectedOptionForPronoun] = useState(
    getPosForPronoun(),
  );

  const updateOptionForStep = (pos: number, stepVal: number, val: string) => {
    // Item selection method on the screens
    switch (stepVal) {
      case 1:
        // On first time loading
        setSelectedOptionForUserSelection(pos);
        updateLocalData(stepVal, val);
        break;
      case 2:
        setSelectedOptionForPronoun(pos);
        updateLocalData(stepVal, val);
        analytics.trackSelectTheirPronounsOnTheirPronounsPickerScreen(
          MixpanelData[val],
        );
        break;
      case 3:
        setSelectedOptionForRelationshipType(pos);
        updateLocalData(stepVal, val);
        analytics.trackSelectConnectionOnRelationshipConnectionPickerScreen(
          MixpanelData[val],
        );
        break;
    }
  };

  const updateOptionForExistingUser = (pos: number, item: any) => {
    setIsUpdateFlow(true);
    setExistingRelationhipData(item);
    setSelectedOptionForExistingUserSelection(pos);
    analytics.trackSelectExistingRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen(
      item?.channel?.relationshipId,
    );
    const myName = item?.inputs?.[0]?.subject;
    let data = {
      ...authContextData?.currCreaterelationshipData,
      name: myName,
      isAlreadyExist: true,
      uploadId: authContextData?.uploadedWhatsappId,
      relationshipId: item?.id,
      selectedExistingRelData: item,
      objectPronoun: item?.inputs?.[0]?.objectPronoun,
      otherUserName: item?.inputs?.[0]?.object,
    };
    getPosForPronounFromExistingUser(item?.inputs?.[0]?.objectPronoun);
    authContextData?.setCurrCreateRelationshipData(data);
  };

  const getPosForPronounFromExistingUser = (type: string) => {
    let posPronoun = -1;
    switch (type) {
      case CreateRelationPronoun.He:
        posPronoun = 0;
        break;
      case CreateRelationPronoun.She:
        posPronoun = 1;
        break;
      case CreateRelationPronoun.They:
        posPronoun = 2;
        break;
      default:
        posPronoun = -1;
        break;
    }
    setSelectedOptionForPronoun(posPronoun);
  };

  const removeRelationhipId = () => {
    let data = {
      ...authContextData?.currCreaterelationshipData,
      relationshipId: null,
      isFromSameRelationshipName: false,
    };
    authContextData?.setCurrCreateRelationshipData(data);
  };

  const updateStepOneAndTwoData = (_senders: any, objectPronoun: string) => {
    const index = getIndexOfMatchesAuthor(_senders, userData);
    let myName = _senders[0];
    let otherUserName = _senders[1];
    if (index !== -1) {
      const otherIndex = index === 0 ? 1 : 0;
      otherUserName = _senders[otherIndex];
      myName = _senders[index];
    }
    let data = {
      ...authContextData?.currCreaterelationshipData,
      name: myName,
      otherUserName: otherUserName,
      objectPronoun,
      isAlreadyExist: false,
    };
    authContextData?.setCurrCreateRelationshipData(data);
  };

  const updateStepOneData = (val: string) => {
    const otherUsrName = senders?.find((sender: any) => sender !== val);

    let data = {
      ...authContextData?.currCreaterelationshipData,
      name: val,
      otherUserName: otherUsrName,
      isAlreadyExist: false,
    };
    authContextData?.setCurrCreateRelationshipData(data);
  };

  const updateStepThreeData = (val: string) => {
    let data = {
      ...authContextData?.currCreaterelationshipData,
      connection: val,
    };
    authContextData?.setCurrCreateRelationshipData(data);
  };

  const updateStepTwoData = (val: string) => {
    let data = {
      ...authContextData?.currCreaterelationshipData,
      objectPronoun: val,
    };
    authContextData?.setCurrCreateRelationshipData(data);
  };

  const updateLocalData = (stepVal: number, val: string) => {
    switch (stepVal) {
      case 1:
        updateStepOneData(val);
        break;
      case 2:
        updateStepTwoData(val);
        break;
      case 3:
        updateStepThreeData(val);
        break;
      default:
        break;
    }
  };

  const goBackForPreviousStep = () => {
    if (step === 4) {
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const updateRelationshipName = (name: string) => {
    if (name) {
      setRelationshipName(name);
    } else {
      setRelationshipName('');
    }
  };

  const onExistingUserContinuePress = (callBack: Function) => {
    analytics.trackTouchContinueButtonOnCreateNewOrAddToExistingRelationshipScreen(
      authContextData?.currCreaterelationshipData?.relationshipId ?? '',
    );
    if (
      isNamesDiffForUpdateRelation(
        authContextData?.currCreaterelationshipData,
        authorsList,
      )
    ) {
      setIsNamesDiff(true);
      setSelectedOptionForUserSelection(-1);
      callBack();
      updateStep(2);
    } else {
      const selectedRelationData = getUpdatedContextDataForPreNames(
        authContextData?.currCreaterelationshipData,
      );
      authContextData?.setCurrCreateRelationshipData(selectedRelationData);
      setIsNamesDiff(false);
      setSelectedOptionForUserSelection(
        getIndexOfMatchesAuthorWithExistingRelation(
          authorsList,
          selectedRelationData?.name,
        ),
      );
      callBack();
      updateStep(2);
    }
  };

  const updateStep = (stepVal: number) => {
    setStep(stepVal);
  };

  const callCreateRelationshipAPI = () => {
    if (isUpdateFlow) {
      updateExistingRelationship();
    } else {
      const extractRelationshipName = extractNameDetails(getOtherUserName());
      const isExistingFlow =
        !!authContextData?.currCreaterelationshipData?.relationshipId;
      const reqData: RelationshipReqData = {
        name: extractRelationshipName,
        connection: authContextData?.currCreaterelationshipData?.connection,
        uploadId: authContextData?.uploadedWhatsappId,
        subject: authContextData?.currCreaterelationshipData?.name,
        object: getOtherUserName(),
        objectPronoun:
          authContextData?.currCreaterelationshipData?.objectPronoun,
      };
      analytics.trackTouchContinueButtonOnRelationshipConnectionPickerScreen(
        MixpanelData[authContextData?.currCreaterelationshipData?.connection],
      );
      navigation.navigate(SCREEN_NAME.ChooseAnalysisScreen, {
        createRelationReqData: reqData,
        isUpdateRelationship: isExistingFlow,
        relationshipId:
          authContextData?.currCreaterelationshipData?.relationshipId,
        uploadedChatMessagesList: messagesList,
        isFromChat: isFromChat,
      });
    }
  };

  const onBackButtonPress = (onPrevPress: Function, selectedInex: number) => {
    if (
      selectedInex === 2 &&
      authContextData?.currCreaterelationshipData?.isFromSameRelationshipName
    ) {
      onPrevPress(-2, false);
    } else {
      onPrevPress();
    }
  };

  const afterChatUploaded = async (
    uploadId: number | string,
    objectName: string,
  ) => {
    const data = existingRelationhipData?.inputs[0];
    let updateReqData = {};
    if (isNamesDiff) {
      updateReqData = {
        relationshipId: existingRelationhipData?.id,
        uploadId: authContextData?.uploadedWhatsappId,
        subject: authContextData?.currCreaterelationshipData?.name,
        object: getOtherUserName(),
        objectPronoun:
          authContextData?.currCreaterelationshipData?.objectPronoun,
      };
    }
    updateReqData = {
      uploadId: uploadId,
      subject: senders[selectedOptionForUserSelection],
      object: senders[selectedOptionForUserSelection === 0 ? 1 : 0],
      objectPronoun: data?.objectPronoun,
      relationshipId: existingRelationhipData?.id,
    };
    const apiRes = await updateRelationship(updateReqData);
    if (apiRes) {
      hideLoader();
      navigation.navigate(SCREEN_NAME.WhatsappSyncdSuccessScreen, {
        relationShipData: {
          ...existingRelationhipData,
          object: objectName,
        },
      });
    } else {
      hideLoader();
    }
  };

  const updateExistingRelationship = async () => {
    const objectName = getOtherUserName();
    showLoader();
    const requestBody = {
      messages: messagesList,
    };
    const uploadRes = await updateWhatsappChat(requestBody);
    if (uploadRes && uploadRes?.data) {
      afterChatUploaded(uploadRes?.data?.id, objectName);
    } else {
      hideLoader();
    }
  };

  const updateExistingRelationWithDiffNameConfirmation = () => {
    setConfirmationPopupVisible(true);
  };

  const onConfirmUpdatePress = (callBack: Function = () => {}) => {
    onhideConfirmPopupPress();
    setTimeout(() => {
      onExistingUserContinuePress(callBack);
    }, 100);
  };

  const onhideConfirmPopupPress = () => {
    setConfirmationPopupVisible(false);
  };

  return {
    step,
    updateStep,
    selectedOptionForUserSelection,
    selectedOptionForExistingUserSelection,
    selectedOptionForPronoun,
    selectedOptionForRelationshipType,
    relationshipName,
    callCreateRelationshipAPI,
    userSelectionList: sendersWhenRelations || [],
    updateOptionForStep,
    updateRelationshipName,
    updateOptionForExistingUser,
    goBackForPreviousStep,
    relationshipList,
    pronounList,
    relationshipTypeList,
    senders,
    getOtherUserName,
    removeRelationhipId,
    onExistingUserContinuePress,
    onBackButtonPress,
    isNamesDiff,
    isFromWhatsAppUpload,
    onClickCreateNewRelationship,
    isUpdateFlow,
    updateExistingRelationship,
    isFromUpdateAndDiffConv,
    existingRelationToUpdateName,
    updateExistingRelationWithDiffNameConfirmation,
    isConfirmationPopupVisible,
    onConfirmUpdatePress,
    onhideConfirmPopupPress,
  };
};
