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
  updateOptionForStep: any;
  selectedPosForPronoun: any;
  pronounList: any;
  updateStep: any;
  updateProgress: any;
}

const QuestionsPronounScreen: FC<QuestionProps> = (props: any) => {
  const {t} = useTranslation();
  const {
    updateOptionForStep,
    selectedPosForPronoun,
    pronounList,
    updateStep,
    updateProgress,
  } = props;
  const renderBottomButton = () => (
    <ButtonContainer>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          updateStep(2);
          updateProgress(50);
        }}
        isDisabled={selectedPosForPronoun === -1}
        rightIcon={
          selectedPosForPronoun > -1 ? (
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
        isSelected={selectedPosForPronoun === index}
        onPress={() => updateOptionForStep(index, 5, item?.value)}
      />
    );
  };

  return (
    <>
      <Container>
        <HeaderLabel>{t('Pronoun_Header')}</HeaderLabel>
        <CommonFlatList data={pronounList} renderItem={renderItem} />
      </Container>
      {renderBottomButton()}
    </>
  );
};

export default QuestionsPronounScreen;
