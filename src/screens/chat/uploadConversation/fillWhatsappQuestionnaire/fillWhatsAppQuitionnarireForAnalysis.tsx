import React, {FC} from 'react';
import {
  BackButtonView,
  BackIcon,
  Container,
  HeaderContainer,
  MainContainer,
} from './styles';
import {DarkBackgroundContainer} from '../../../../components/screenBackground/GradientBackgroundContainer';
import UserSelectorScreen from './subComponents/userSelectorScreen';
import {useNavigation} from '@react-navigation/native';
import {FillWhatsAppQuitionnarireForAnalysisScreenProps} from '../../../../types';
import {useWhatsappQuestionnaireForAnalysis} from '../../../../hooks/whatsappQuestionnaire/useWhatsappQuestionnaireForAnalysis';

const FillWhatsAppQuitionnarireForAnalysisScreen: FC<
  FillWhatsAppQuitionnarireForAnalysisScreenProps
> = () => {
  const {
    senders,
    isNamesDiff,
    updateOptionForStep,
    selectedOptionForUserSelection,
    onContinuePress,
  } = useWhatsappQuestionnaireForAnalysis();
  const {goBack} = useNavigation();

  const renderHeaderContent = () => {
    return (
      <HeaderContainer>
        <BackButtonView onPress={goBack}>
          <BackIcon />
        </BackButtonView>
      </HeaderContainer>
    );
  };

  return (
    <Container>
      <DarkBackgroundContainer>
        <MainContainer>
          {renderHeaderContent()}
          <UserSelectorScreen
            updateStep={onContinuePress}
            senders={senders}
            selectedOptionForUserSelection={selectedOptionForUserSelection}
            updateOptionForStep={updateOptionForStep}
            isButtonEnabled={true}
            isNamesDiff={isNamesDiff}
          />
        </MainContainer>
      </DarkBackgroundContainer>
    </Container>
  );
};

export default FillWhatsAppQuitionnarireForAnalysisScreen;
