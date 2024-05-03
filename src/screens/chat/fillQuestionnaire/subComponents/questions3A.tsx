import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {
  HeaderLabel,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  Ques2ListView,
  MainContainer,
  BottomView,
} from './styles';
import QuestionnaireItem from '../../../../components/molecule/questionnaireItem';
import AMPrimaryButton from '../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../constants/enums';
import MaskedView from '../linearGradient/maskedView';
import MaskedElement from '../linearGradient/maskedElement';

interface QuestionProps {
  updateStep: any;
  updateProgress: any;
  updateOptionForStep: any;
  selectedOptionForStepThree: any;
  isThirdStepContinueActive: any;
  updateOtherFieldAsInputValue: any;
  isOtherFieldAsInput: any;
  updateQuestionnaireLastTwoStep: any;
  fullRelationshipStatusList: any;
}

const Questions3A: FC<QuestionProps> = (props: any) => {
  const {t} = useTranslation();
  const {
    updateStep,
    updateProgress,
    updateOptionForStep,
    selectedOptionForStepThree,
    isThirdStepContinueActive,
    updateOtherFieldAsInputValue,
    isOtherFieldAsInput,
    updateQuestionnaireLastTwoStep,
    fullRelationshipStatusList,
  } = props;

  const renderItem = ({item, index}) => {
    return (
      <QuestionnaireItem
        item={item}
        isSelected={selectedOptionForStepThree === index}
        isForOther={false}
        onPress={() => {
          updateOptionForStep(index, 3, item.value);
          if (fullRelationshipStatusList.length - 1 === index) {
            updateOtherFieldAsInputValue(true);
          } else {
            updateOtherFieldAsInputValue(false);
          }
        }}
        onTextChange={val => updateQuestionnaireLastTwoStep(val, 3)}
        isOtherFieldAsInput={isOtherFieldAsInput}
      />
    );
  };

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          updateStep(4);
          updateProgress(100);
        }}
        isDisabled={!isThirdStepContinueActive()}
        rightIcon={
          isThirdStepContinueActive() ? (
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
      <HeaderLabel>{t('Ques3_Header')}</HeaderLabel>
      <MaskedView element={<MaskedElement />}>
        <Ques2ListView
          data={fullRelationshipStatusList}
          renderItem={renderItem}
        />
      </MaskedView>
      {renderBottomButton()}
    </MainContainer>
  );
};

export default Questions3A;
