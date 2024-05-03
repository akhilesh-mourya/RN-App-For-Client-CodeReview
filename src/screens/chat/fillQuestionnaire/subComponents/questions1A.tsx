import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CheckArrowIcon,
  Container,
  HeaderLabel,
  OptionLabel,
  SelectionContainer,
  TouchableOpacity,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  MainContainer,
  BottomView,
  NextArrowIcon,
} from './styles';
import AMPrimaryButton from '../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../constants/enums';
import GenderIdentityPopup from '../../../../components/genderIdentityPopup';
import {Gender} from '../../../../enums';

interface QuestionProps {
  updateStep: any;
  updateProgress: any;
  updateOptionForStep: any;
  selectedOptionForStepOne: any;
  isFirstStepContinueActive: any;
  genderList: any;
  isGenderListPopupVisible: any;
  questionnaireOtherVal: any;
  hideGenderPopUp: any;
  updateOtherVal: any;
  updateGenderList: any;
}

const Questions1A: FC<QuestionProps> = (props: any) => {
  const {
    updateStep,
    updateProgress,
    updateOptionForStep,
    selectedOptionForStepOne,
    isFirstStepContinueActive,
    genderList,
    isGenderListPopupVisible,
    questionnaireOtherVal,
    hideGenderPopUp,
    updateOtherVal,
    updateGenderList,
  } = props;
  const {t} = useTranslation();

  const renderGenderLsit = () => {
    return (
      <GenderIdentityPopup
        isVisible={isGenderListPopupVisible}
        genderList={genderList}
        updateItem={updateOtherVal}
        hidePopup={hideGenderPopUp}
        searchData={updateGenderList}
      />
    );
  };

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          updateStep(selectedOptionForStepOne === 3 ? 5 : 2);
          updateProgress(selectedOptionForStepOne === 3 ? 37.5 : 50);
        }}
        isDisabled={!isFirstStepContinueActive()}
        rightIcon={
          isFirstStepContinueActive() ? (
            <ButtonNextArrowActive />
          ) : (
            <ButtonNextArrowDisabled />
          )
        }
      />
    </BottomView>
  );
  return (
    <MainContainer>
      <Container>
        <HeaderLabel>{t('Ques1_Header')}</HeaderLabel>
        <TouchableOpacity onPress={() => updateOptionForStep(1, 1, Gender.Man)}>
          <SelectionContainer isSelected={selectedOptionForStepOne === 1}>
            <OptionLabel>{t('Ques1_Option1')}</OptionLabel>
            {selectedOptionForStepOne === 1 && <CheckArrowIcon />}
          </SelectionContainer>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateOptionForStep(2, 1, Gender.Woman)}>
          <SelectionContainer isSelected={selectedOptionForStepOne === 2}>
            <OptionLabel>{t('Ques1_Option2')}</OptionLabel>
            {selectedOptionForStepOne === 2 && <CheckArrowIcon />}
          </SelectionContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateOptionForStep(3, 1, '')}>
          <SelectionContainer isSelected={selectedOptionForStepOne === 3}>
            <OptionLabel>{questionnaireOtherVal}</OptionLabel>
            {selectedOptionForStepOne === 3 ? (
              <CheckArrowIcon />
            ) : (
              <NextArrowIcon />
            )}
            {/* {selectedOptionForStepOne === 3 ? (
              <>
                <OtherInput autoFocus={true} />
                <CheckArrowIcon />
              </>
            ) : (
              <OptionLabel>{t('Ques1_Option3')}</OptionLabel>
            )} */}
          </SelectionContainer>
        </TouchableOpacity>
        {renderGenderLsit()}
      </Container>

      {renderBottomButton()}
    </MainContainer>
  );
};

export default Questions1A;
