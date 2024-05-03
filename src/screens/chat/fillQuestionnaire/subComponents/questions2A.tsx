import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Container,
  HeaderLabel,
  ButtonContainer,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
} from './styles';
import AMPrimaryButton from '../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../constants/enums';
import QuestionnaireCommonItem from '../../../../components/molecule/questionnaireCommonItem';
import {CommonFlatList} from '../styles';

interface QuestionProps {
  selectedOptionForStepTwo: any;
  isSecoundStepContinueActive: any;
  updateOptionForStep: any;
  genderInterestList: any;
}

const Questions2A: FC<QuestionProps> = (props: any) => {
  const {
    updateStep,
    updateProgress,
    selectedOptionForStepTwo,
    isSecoundStepContinueActive,
    updateOptionForStep,
    genderInterestList,
  } = props;
  const {t} = useTranslation();
  const renderBottomButton = () => (
    <ButtonContainer>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          updateStep(3);
          updateProgress(75);
        }}
        isDisabled={!isSecoundStepContinueActive()}
        rightIcon={
          isSecoundStepContinueActive() ? (
            <ButtonNextArrowActive />
          ) : (
            <ButtonNextArrowDisabled />
          )
        }
      />
    </ButtonContainer>
  );

  const renderItem = ({item, index}) => {
    return (
      <QuestionnaireCommonItem
        item={item}
        isSelected={selectedOptionForStepTwo === index}
        onPress={() => updateOptionForStep(index, 2, item?.value)}
      />
    );
  };

  return (
    <>
      <Container>
        <HeaderLabel>{t('GenderInterested_Header')}</HeaderLabel>
        <CommonFlatList data={genderInterestList} renderItem={renderItem} />
      </Container>
      {renderBottomButton()}
    </>
  );
};

export default Questions2A;
