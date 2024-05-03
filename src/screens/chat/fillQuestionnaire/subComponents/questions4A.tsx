import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderLabel, MainContainer, BottomView} from './styles';
import QuestionnaireItem from '../../../../components/molecule/questionnaireItem';
import {FlatList} from 'react-native';
import AMPrimaryButton from '../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../constants/enums';

interface QuestionProps {
  updateOptionForStep: any;
  selectedOptionForStepFour: any;
  isFourthStepContinueActive: any;
  isOtherFieldAsInput: any;
  updateOtherFieldAsInputValue: any;
  onFinalStepContinuePress: any;
  updateQuestionnaireLastTwoStep: any;
  fullRelationshipTypeList: any;
}

const Questions4A: FC<QuestionProps> = (props: any) => {
  const {t} = useTranslation();
  const {
    updateOptionForStep,
    selectedOptionForStepFour,
    isFourthStepContinueActive,
    isOtherFieldAsInput,
    updateOtherFieldAsInputValue,
    onFinalStepContinuePress,
    updateQuestionnaireLastTwoStep,
    fullRelationshipTypeList,
  } = props;

  const renderItem = ({item, index}) => {
    return (
      <QuestionnaireItem
        item={item}
        isSelected={selectedOptionForStepFour === index}
        isForOther={false}
        onPress={() => {
          updateOptionForStep(index, 4, item.value);
          if (fullRelationshipTypeList.length - 1 === index) {
            updateOtherFieldAsInputValue(true);
          } else {
            updateOtherFieldAsInputValue(false);
          }
        }}
        isOtherFieldAsInput={isOtherFieldAsInput}
        onTextChange={val => updateQuestionnaireLastTwoStep(val, 4)}
      />
    );
  };

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Complete')}
        onPress={() => onFinalStepContinuePress()}
        isDisabled={!isFourthStepContinueActive()}
      />
    </BottomView>
  );

  return (
    <MainContainer>
      <HeaderLabel>{t('Ques4_Header')}</HeaderLabel>
      <FlatList data={fullRelationshipTypeList} renderItem={renderItem} />
      {renderBottomButton()}
    </MainContainer>
  );
};

export default Questions4A;
