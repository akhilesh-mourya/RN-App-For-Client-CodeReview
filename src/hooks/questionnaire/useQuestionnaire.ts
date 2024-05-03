import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  GENDER_INTEREST_LIST,
  GENDER_LIST,
  PRONOUN_LIST,
  QuestionnaireProps,
} from '../../constants/mockData';
import useAuth from '../context/useAuth';
import {UpdateUserReqData} from '../../../@types/common';
import {updateUser} from '../../apiServices/registration';
import {useLoader} from '../loader/useLoader';
import {useMutation} from 'react-query';
import {getFilteredCoachChannel, setUserDataInAsync} from '../../utility';
import {
  relationshipGoalsList,
  relationshipStatusList,
} from '../../helpers/commonFunctions';
import {
  CreateRelationPronoun,
  MyBasicsStatus,
  QuestionnaireGender,
  QuestionnaireGenderInterset,
  QuestionnairePronoun,
  QuestionnaireRelationshipGoal,
  QuestionnaireRelationshipStatus,
} from '../../enums';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';
import useChat from '../context/useChat';
import {
  readMessagesDataFromDB,
  updateFillQuitionnaireMsgIntoDB,
} from '../../utility/chatUtility';

export const useQuestionnaire = () => {
  const {authContextData} = useAuth();
  const {params} = useRoute();
  const {chatContextData} = useChat();
  const [step, setStep] = useState(1);
  const userData = authContextData?.userData;
  const [selectedOptionForStepOne, setSelectedOptionForStepOne] = useState(
    QuestionnaireGender[userData?.gender] ?? 0,
  );
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireProps>();
  const [selectedOptionForStepTwo, setSelectedOptionForStepTwo] = useState(
    QuestionnaireGenderInterset[userData?.genderInterest] ?? -1,
  );
  const [selectedOptionForStepThree, setSelectedOptionForStepThree] = useState(
    QuestionnaireRelationshipStatus[userData?.relationshipStatus] ?? -1,
  );
  const [selectedOptionForStepFour, setSelectedOptionForStepFour] = useState(
    QuestionnaireRelationshipGoal[userData?.relationshipGoal] ?? -1,
  );
  const [selectedPosForPronoun, setSelectedPosForPronoun] = useState(
    QuestionnairePronoun[userData?.pronoun] ?? -1,
  );
  const [progressVal, setProgressVal] = useState(25);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isOtherFieldAsInput, setOtherFieldAsInput] = useState(false);
  const stepWidth = 25;
  const [genderList, setGenderList] = useState(GENDER_LIST || []);
  const fullGenderList = GENDER_LIST || [];
  const [isGenderListPopupVisible, setGenderListPopupVisible] = useState(false);
  const {onFillQuitionnaireDoneFromMsg = null} = params || {};

  const getOtherGender = () => {
    const data = genderList?.filter(item => item?.value === userData?.gender);
    if (data?.length > 0) {
      return data?.[0].name;
    }
  };

  useEffect(() => {
    setQuestionnaire({
      ...questionnaire,
      gender: userData?.gender || '',
      pronoun: userData?.pronoun || '',
      genderInterest: userData?.genderInterest || '',
      relationshipStatus: userData?.relationshipStatus || '',
      relationshipType: userData?.relationshipGoal || '',
    });
  }, [userData]);

  const [questionnaireOtherVal, setQuestionnaireOtherVal] = useState(
    getOtherGender() ?? 'Other',
  );
  const analytics = useAnalytics();

  const updateTracker = (stepVal: number) => {
    switch (stepVal) {
      case 1:
        analytics.trackTouchContinueButtonOnGenderIdentityFormScreen(
          MyBasicsStatus[`${authContextData?.questionnaire?.gender}`],
        );
        break;
      case 2:
        analytics.trackTouchContinueButtonOnGenderInterestFormScreen(
          authContextData?.questionnaire?.genderInterest,
        );
        break;
      case 3:
        analytics.trackTouchContinueButtonOnRelationshipStatusFormScreen(
          MyBasicsStatus[
            `${authContextData?.questionnaire?.relationshipStatus}`
          ],
        );
        break;
      case 4:
        analytics.trackTouchContinueButtonOnRelationshipGoalsFormScreen(
          MyBasicsStatus[`${authContextData?.questionnaire?.relationshipType}`],
        );
        break;
      case 5:
        analytics.trackTouchContinueButtonOnPronounsFormScreen(
          MixpanelData[authContextData?.questionnaire?.pronoun],
        );
        break;
      default:
        break;
    }
  };

  const updateStep = (nextStep: number = 1) => {
    updateTracker(nextStep < 5 ? (step === 5 ? 5 : nextStep - 1) : 1);
    setStep(nextStep);
    setProgressVal(100);
  };
  const navigation = useNavigation();
  const {isLoading: isCreateUserLoading, mutateAsync} = useMutation(
    (requestBody: UpdateUserReqData) =>
      updateUser(requestBody, authContextData?.authToken),
  );

  const {showLoader, hideLoader, hideLoaderAndShowErrorMessage} = useLoader();
  const fullRelationshipStatusList = relationshipStatusList || [];
  const fullRelationshipTypeList = relationshipGoalsList || [];
  const genderInterestList = GENDER_INTEREST_LIST || [];
  const pronounList = PRONOUN_LIST || [];

  useEffect(() => {
    if (isCreateUserLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isCreateUserLoading]);

  // TODO: This is not correct, why use set timeout.
  useEffect(() => {
    switch (step) {
      case 1:
        analytics.trackViewGenderIdentityFormScreen();
        break;
      case 2:
        analytics.trackViewGenderInterestFormScreen();
        break;
      case 3:
        analytics.trackViewRelationshipStatusFormScreen();
        break;
      case 4:
        analytics.trackViewRelationshipGoalsFormScreen();
        break;
      case 5:
        analytics.trackViewPronounsFormScreen();
        break;
    }
  }, [step]);

  const updateOptionForStep = (pos: number, stepVal: number, value: string) => {
    switch (stepVal) {
      case 1:
        updateLocalDataForStepOne(pos, value);
        break;
      case 2:
        setSelectedOptionForStepTwo(pos);
        let val = {...authContextData?.questionnaire, genderInterest: value};
        authContextData?.setQuestionnaire(val);
        break;
      case 3:
        if (value !== 'Others') {
          setSelectedOptionForStepThree(pos);
          let val = {
            ...authContextData?.questionnaire,
            relationshipStatus: value,
          };
          authContextData?.setQuestionnaire(val);
        }
        break;
      case 4:
        if (value !== 'Others') {
          setSelectedOptionForStepFour(pos);
          let val = {
            ...authContextData?.questionnaire,
            relationshipType: value,
          };
          authContextData?.setQuestionnaire(val);
        }
        break;
      case 5:
        updatePronounFromGender(pos + 1);
        setSelectedPosForPronoun(pos);
        break;
    }
  };

  const updateLocalDataForStepOne = (pos: number, value: string) => {
    switch (pos) {
      case 3:
        setGenderList(GENDER_LIST);
        setGenderListPopupVisible(true);
        break;
      case 1:
      case 2:
        setSelectedOptionForStepOne(pos);
        setQuestionnaireOtherVal('Other');
        setSelectedPosForPronoun(pos);
        let val = {
          ...authContextData?.questionnaire,
          gender: value,
          pronoun: getPronounEnum(pos),
        };
        authContextData?.setQuestionnaire(val);
        break;
    }
  };

  const updateOtherVal = (name: string, value: string) => {
    setQuestionnaireOtherVal(name);
    setSelectedOptionForStepOne(3);
    setSelectedPosForPronoun(-1);
    updatePronounFromGender(3);
    let val = {
      ...authContextData?.questionnaire,
      gender: value,
    };
    authContextData?.setQuestionnaire(val);
    setGenderListPopupVisible(false);
  };

  const getPronounEnum = (pos: number) => {
    switch (pos) {
      case 1:
        return CreateRelationPronoun?.He;
      case 2:
        return CreateRelationPronoun?.She;
      case 3:
        return CreateRelationPronoun?.They;
    }
  };

  const updatePronounFromGender = (pos: number) => {
    let val = {
      ...authContextData?.questionnaire,
      pronoun: getPronounEnum(pos),
    };
    authContextData?.setQuestionnaire(val);
  };

  const getValue = (value: string) => {
    if (value) {
      return value;
    } else {
      return '';
    }
  };

  const updateQuestionnaireLastTwoStep = (value: string, pos: number) => {
    switch (pos) {
      case 3:
        let valStatus = {
          ...authContextData?.questionnaire,
          relationshipStatusCustom: getValue(value),
        };
        setSelectedOptionForStepThree(
          value ? relationshipStatusList?.length - 1 : -1,
        );
        authContextData?.setQuestionnaire(valStatus);
        break;
      case 4:
        let val = {
          ...authContextData?.questionnaire,
          relationshipTypeCustom: getValue(value),
        };
        authContextData?.setQuestionnaire(val);
        setSelectedOptionForStepFour(
          value ? relationshipGoalsList?.length - 1 : -1,
        );
        break;
    }
  };

  const updateGenderList = (search: string) => {
    if (search) {
      let list = fullGenderList?.filter(item => item.name.includes(search));
      setGenderList(list);
    } else {
      setGenderList(GENDER_LIST);
    }
  };

  const isFirstStepContinueActive = () => {
    return selectedOptionForStepOne > 0;
  };

  const isSecoundStepContinueActive = () => {
    return selectedOptionForStepTwo > -1;
  };

  const isThirdStepContinueActive = () => {
    return selectedOptionForStepThree > -1;
  };

  const isFourthStepContinueActive = () => {
    return selectedOptionForStepFour > -1;
  };

  const showHidePopUp = () => {
    if (!isPopUpVisible) {
      analytics.trackTouchDismissButtonOnQuestionnaireScreen();
    } else {
      analytics.trackTouchStayButtonOnQuitConfirmationPopupOnQuestionnaireScreen();
    }
    setPopUpVisible(!isPopUpVisible);
  };

  const hideGenderPopUp = () => {
    setGenderListPopupVisible(false);
  };

  const updateOtherFieldAsInputValue = (flag: boolean) => {
    setOtherFieldAsInput(flag);
  };

  const isShowingQuestionnairePopup = () => {
    let flag = false;
    console.log(
      'Fill Questionnaire',
      questionnaire,
      authContextData?.questionnaire,
    );
    const updateGender = questionnaire?.gender;
    const localGender = authContextData?.questionnaire?.gender;
    if (authContextData?.questionnaire) {
      if (updateGender !== localGender) {
        flag = true;
      }
    }

    return flag;
  };

  const goBackForPreviousQuestionnaire = () => {
    analytics.trackTouchBackButtonOnQuestionnaireScreen();
    switch (step) {
      case 5:
        setStep(1);
        setProgressVal(stepWidth);
        break;
      default:
        if (step > 1) {
          setStep(step - 1);
          setProgressVal((step - 1) * stepWidth);
        } else {
          if (isShowingQuestionnairePopup()) {
            setPopUpVisible(true);
          } else {
            navigation.goBack();
          }
        }
        break;
    }
  };

  const redirectToPreviousScreen = () => {
    analytics.trackTouchYesIAmSureButtonOnQuitConfirmationPopupOnQuestionnaireScreen();
    setPopUpVisible(false);
    navigation.goBack();
  };

  const callUpdateFillQuitionnaireMsgIntoDB = async () => {
    try {
      const channelData = getFilteredCoachChannel(
        chatContextData?.channelsList,
      );
      if (channelData) {
        const result = await readMessagesDataFromDB(channelData?.id);
        updateFillQuitionnaireMsgIntoDB(result);
      }
    } catch (error) {}
  };

  const onFinalStepContinuePress = () => {
    updateTracker(4);
    const requestBody: UpdateUserReqData = {
      gender: authContextData?.questionnaire?.gender,
      genderInterest: authContextData?.questionnaire?.genderInterest,
      relationshipStatus:
        authContextData?.questionnaire?.relationshipStatus ?? 'custom',
      relationshipGoal:
        authContextData?.questionnaire?.relationshipType ?? 'custom',
      relationshipStatusCustom:
        authContextData?.questionnaire?.relationshipStatusCustom,
      relationshipGoalCustom:
        authContextData?.questionnaire?.relationshipTypeCustom,
      pronoun: authContextData?.questionnaire?.pronoun,
    };
    mutateAsync(requestBody)
      .then(userData => {
        callUpdateFillQuitionnaireMsgIntoDB();
        setUserDataInAsync(userData?.data);
        const newData = {
          ...userData?.data,
          initialBotMessagesStatus: {
            isFillQuestionnarireDone: true,
          },
        };
        authContextData?.updateUserData(newData);
        setTimeout(() => {
          onFillQuitionnaireDoneFromMsg && onFillQuitionnaireDoneFromMsg();
          setTimeout(() => {
            navigation.goBack();
          }, 400);
        }, 100);
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error);
      });
  };

  return {
    step,
    selectedOptionForStepOne,
    selectedOptionForStepTwo,
    selectedOptionForStepThree,
    selectedOptionForStepFour,
    progressVal,
    isPopUpVisible,
    isOtherFieldAsInput,
    genderList,
    isGenderListPopupVisible,
    questionnaireOtherVal,
    fullRelationshipStatusList,
    fullRelationshipTypeList,
    genderInterestList,
    pronounList,
    selectedPosForPronoun,
    updateGenderList,
    updateStep,
    updateOtherVal,
    updateOptionForStep,
    updateQuestionnaireLastTwoStep,
    isFirstStepContinueActive,
    isSecoundStepContinueActive,
    isThirdStepContinueActive,
    isFourthStepContinueActive,
    setProgressVal,
    showHidePopUp,
    goBackForPreviousQuestionnaire,
    redirectToPreviousScreen,
    updateOtherFieldAsInputValue,
    hideGenderPopUp,
    onFinalStepContinuePress,
  };
};
