import React, {FC} from 'react';
import {
  Container,
  MatchesHeaderLabel,
  CopilotStepMatchesImage,
  ChatWithCoachButton,
  MatchesMainDescription,
  DescriptionMatches,
  ChatWithBtnLabel,
  CoachImg,
  MatchesListView,
} from './styles';
import {DiamondGradientBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../../enums';
import {DUMMY_USER_PROFILE} from '../../../constants/appContants';
import {MATCHMAKING_MATCHES_DUMMY_LIST} from '../../../constants/mockData';
import MatchmakingMatchesItem from '../../../components/molecule/MatchmakingMatchesItem';

const MatchMakingMatchesScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const coachName = 'Christie';
  const renderHeaderContent = () => (
    <>
      <MatchesHeaderLabel>{t('Matches')}</MatchesHeaderLabel>
    </>
  );
  const renderMatchesItem = ({item}) => <MatchmakingMatchesItem item={item} />;
  const renderNoMatchesView = () => (
    <>
      <CopilotStepMatchesImage />
      <MatchesMainDescription>
        {t('Matches_Main_Description')}
      </MatchesMainDescription>
      <DescriptionMatches>{t('Matches_Description')}</DescriptionMatches>
      <ChatWithCoachButton onPress={() => navigate(SCREEN_NAME.ChatScreen)}>
        <CoachImg source={{uri: DUMMY_USER_PROFILE}} />
        <ChatWithBtnLabel>
          {t('Chat_With')} {coachName}
        </ChatWithBtnLabel>
      </ChatWithCoachButton>
    </>
  );
  const renderMatchesListView = () => {
    return (
      <MatchesListView
        data={MATCHMAKING_MATCHES_DUMMY_LIST}
        renderItem={renderMatchesItem}
      />
    );
  };
  const renderBodyContent = () => <>{renderNoMatchesView()}</>;
  return (
    <DiamondGradientBackgroundContainer>
      <Container>
        {renderHeaderContent()}
        {renderBodyContent()}
      </Container>
    </DiamondGradientBackgroundContainer>
  );
};

export default MatchMakingMatchesScreen;
