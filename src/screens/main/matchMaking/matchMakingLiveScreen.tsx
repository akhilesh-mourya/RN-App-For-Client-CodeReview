import React, {FC} from 'react';
import {
  Container,
  HeaderLabelTextCenter,
  MatchMakingLiveImage,
  Description,
  GetStartedButton,
} from './styles';
import {DiamondGradientBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../../enums';

const MatchMakingLiveScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const renderHeaderContent = () => (
    <>
      <HeaderLabelTextCenter>
        {t('AI_Matchmaking_Live_Header')}
      </HeaderLabelTextCenter>
      <Description>{t('Matchmaking_Live_Description')}</Description>
    </>
  );
  const renderBodyContent = () => (
    <>
      <MatchMakingLiveImage />
      <GetStartedButton
        onPress={() => navigate(SCREEN_NAME.MatchMakingMatchesScreen)}
      />
    </>
  );
  return (
    <DiamondGradientBackgroundContainer>
      <Container>
        {renderHeaderContent()}
        {renderBodyContent()}
      </Container>
    </DiamondGradientBackgroundContainer>
  );
};

export default MatchMakingLiveScreen;
