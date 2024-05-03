import React, {FC} from 'react';
import {
  SafeAreaContainer,
  HeaderContainer,
  SpaceBetweenRow,
  BackIcon,
  BackButtonView,
  CrossIcon,
  BodyContainer,
  KeyboardAvoidingViewContainer,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import ProgressBar from '../../../components/progress/progressBar';
import Questions1A from './subComponents/questions1A';
import {useQuestionnaire} from '../../../hooks/questionnaire/useQuestionnaire';
import Questions2A from './subComponents/questions2A';
import Questions3A from './subComponents/questions3A';
import {useWindowDimensions} from 'react-native';
import Questions4A from './subComponents/questions4A';
import QuitQuestionnairePopUp from '../../../components/quitQuestionnairePopUp';
import QuestionsPronounScreen from './subComponents/questionsPronoun';
import {FillWhatsappQuitoinnaireProps} from '../../../types';

const FillQuestionnaireScreen: FC<FillWhatsappQuitoinnaireProps> = () => {
  const {
    step,
    progressVal,
    updateStep,
    setProgressVal,
    showHidePopUp,
    goBackForPreviousQuestionnaire,
    redirectToPreviousScreen,
    updateOptionForStep,
    isFirstStepContinueActive,
    hideGenderPopUp,
    updateOtherVal,
    updateGenderList,
    isSecoundStepContinueActive,
    isThirdStepContinueActive,
    updateOtherFieldAsInputValue,
    updateQuestionnaireLastTwoStep,
    isFourthStepContinueActive,
    onFinalStepContinuePress,
    pronounList,
    selectedPosForPronoun,
    selectedOptionForStepFour,
    fullRelationshipTypeList,
    fullRelationshipStatusList,
    isOtherFieldAsInput,
    selectedOptionForStepThree,
    isPopUpVisible,
    selectedOptionForStepOne,
    genderList,
    isGenderListPopupVisible,
    questionnaireOtherVal,
    selectedOptionForStepTwo,
    genderInterestList,
  } = useQuestionnaire();
  const {width} = useWindowDimensions();
  const renderHeaderContent = () => (
    <HeaderContainer>
      <ProgressBar
        progress={progressVal}
        width={width - 64}
        isfromHome={false}
      />
      <SpaceBetweenRow>
        <BackButtonView onPress={() => goBackForPreviousQuestionnaire()}>
          <BackIcon />
        </BackButtonView>
        <BackButtonView onPress={() => showHidePopUp()}>
          <CrossIcon />
        </BackButtonView>
      </SpaceBetweenRow>
    </HeaderContainer>
  );

  const renderScreen = () => {
    switch (step) {
      case 1:
        return (
          <Questions1A
            updateStep={updateStep}
            updateProgress={setProgressVal}
            updateOptionForStep={updateOptionForStep}
            selectedOptionForStepOne={selectedOptionForStepOne}
            isFirstStepContinueActive={isFirstStepContinueActive}
            genderList={genderList}
            isGenderListPopupVisible={isGenderListPopupVisible}
            questionnaireOtherVal={questionnaireOtherVal}
            hideGenderPopUp={hideGenderPopUp}
            updateOtherVal={updateOtherVal}
            updateGenderList={updateGenderList}
          />
        );
      case 2:
        return (
          <Questions2A
            updateStep={updateStep}
            updateProgress={setProgressVal}
            selectedOptionForStepTwo={selectedOptionForStepTwo}
            isSecoundStepContinueActive={isSecoundStepContinueActive}
            updateOptionForStep={updateOptionForStep}
            genderInterestList={genderInterestList}
          />
        );
      case 3:
        return (
          <Questions3A
            updateStep={updateStep}
            updateProgress={setProgressVal}
            updateOptionForStep={updateOptionForStep}
            selectedOptionForStepThree={selectedOptionForStepThree}
            isThirdStepContinueActive={isThirdStepContinueActive}
            updateOtherFieldAsInputValue={updateOtherFieldAsInputValue}
            isOtherFieldAsInput={isOtherFieldAsInput}
            updateQuestionnaireLastTwoStep={updateQuestionnaireLastTwoStep}
            fullRelationshipStatusList={fullRelationshipStatusList}
          />
        );
      case 4:
        return (
          <Questions4A
            updateOptionForStep={updateOptionForStep}
            selectedOptionForStepFour={selectedOptionForStepFour}
            isFourthStepContinueActive={isFourthStepContinueActive}
            isOtherFieldAsInput={isOtherFieldAsInput}
            updateOtherFieldAsInputValue={updateOtherFieldAsInputValue}
            onFinalStepContinuePress={onFinalStepContinuePress}
            updateQuestionnaireLastTwoStep={updateQuestionnaireLastTwoStep}
            fullRelationshipTypeList={fullRelationshipTypeList}
          />
        );
      case 5:
        return (
          <QuestionsPronounScreen
            updateStep={updateStep}
            updateProgress={setProgressVal}
            updateOptionForStep={updateOptionForStep}
            selectedPosForPronoun={selectedPosForPronoun}
            pronounList={pronounList}
          />
        );
    }
  };

  const renderBodyContent = () => {
    return <BodyContainer>{renderScreen()}</BodyContainer>;
  };

  const renderQuitQuestionnairePopUp = () => {
    return (
      <QuitQuestionnairePopUp
        isVisible={isPopUpVisible}
        onQuitPress={redirectToPreviousScreen}
        onStayPress={showHidePopUp}
      />
    );
  };

  return (
    <SafeAreaContainer>
      <DarkBackgroundContainer>
        <KeyboardAvoidingViewContainer>
          {renderBodyContent()}
          {renderQuitQuestionnairePopUp()}
        </KeyboardAvoidingViewContainer>
      </DarkBackgroundContainer>
      {renderHeaderContent()}
    </SafeAreaContainer>
  );
};

export default FillQuestionnaireScreen;
