import React, {FC, useEffect} from 'react';
import {
  Container,
  HeaderLabel,
  CopilotStepImage,
  Description,
  JoinWaitListButton,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {useTranslation} from 'react-i18next';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../../enums';
import {useAnalytics} from '../../../services/analytics';

const MatchMakingScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const analytics = useAnalytics();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewMatchmakingScreen();
    }
  }, [analytics, isFocused]);

  const renderHeaderContent = () => (
    <>
      <HeaderLabel>{t('AI Matchmaking')}</HeaderLabel>
      <Description>{t('Matchmaking_Description')}</Description>
    </>
  );
  const renderBodyContent = () => (
    <>
      <CopilotStepImage />
      <JoinWaitListButton
        onPress={() => {
          analytics.trackTouchJoinWaitlistButtonOnMatchmakingScreen();
          navigate(SCREEN_NAME.WaitlistFormScreen);
        }}
      />
    </>
  );
  return (
    <DarkBackgroundContainer>
      <Container>
        {renderHeaderContent()}
        {renderBodyContent()}
      </Container>
    </DarkBackgroundContainer>
  );
};

export default MatchMakingScreen;
