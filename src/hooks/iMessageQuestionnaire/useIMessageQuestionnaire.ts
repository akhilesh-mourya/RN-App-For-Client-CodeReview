import {useEffect, useState} from 'react';
import {PRONOUN_LIST, RELATIONSHIP_TYPE_LIST} from '../../constants/mockData';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {extractNameDetails} from '../../utility';
import {SCREEN_NAME} from '../../enums';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';

export const useIMessageQuestionnaire = () => {
  const {goBack, navigate} = useNavigation();
  const {params} = useRoute();
  const {
    otherUserName,
    myName,
    uploadId,
    isExistingFlow = false,
  }: any = params || {};
  const [step, setStep] = useState(1);
  const pronounList = PRONOUN_LIST || [];
  const [
    selectedOptionForRelationshipType,
    setSelectedOptionForRelationshipType,
  ] = useState(-1);
  const [selectedOptionForPronoun, setSelectedOptionForPronoun] = useState(-1);
  const [selectedRelationshipType, setRelationshipType] = useState('');
  const [selectedRelationshipPronoun, setSelectedRelationshipPronoun] =
    useState('');
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewPronounsFormScreen();
  }, [analytics]);

  const updateOptionForStep = (
    cellPosition: number,
    stepVal: number,
    selectionVal: string,
  ) => {
    switch (stepVal) {
      case 1:
        setSelectedOptionForPronoun(cellPosition);
        setSelectedRelationshipPronoun(selectionVal);
        analytics.trackSelectTheirPronounsOnTheirPronounsPickerScreen(
          MixpanelData[selectionVal],
        );
        break;
      case 2:
        setSelectedOptionForRelationshipType(cellPosition);
        setRelationshipType(selectionVal);
        analytics.trackSelectConnectionOnRelationshipConnectionPickerScreen(
          MixpanelData[selectionVal],
        );
        break;
    }
  };

  const onFinalStepPress = () => {
    const relationshipName = extractNameDetails(otherUserName);
    const reqData = {
      name: relationshipName,
      connection: selectedRelationshipType,
      uploadId: uploadId,
      subject: myName,
      object: otherUserName,
      objectPronoun: selectedRelationshipPronoun,
    };

    analytics.trackTouchContinueButtonOnRelationshipConnectionPickerScreen(
      MixpanelData[selectedRelationshipType],
    );
    navigate(SCREEN_NAME.ChooseAnalysisScreen, {
      createRelationReqData: reqData,
      isUpdateRelationship: isExistingFlow,
      relationshipId: null,
      isFromIMessage: true,
    });
  };

  return {
    step,
    RELATIONSHIP_TYPE_LIST,
    selectedOptionForRelationshipType,
    selectedOptionForPronoun,
    selectedRelationshipPronoun,
    otherUserName,
    pronounList,
    updateOptionForStep,
    onFinalStepPress,
    goBack,
  };
};
