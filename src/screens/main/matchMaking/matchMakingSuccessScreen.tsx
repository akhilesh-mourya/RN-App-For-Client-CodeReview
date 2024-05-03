import React, {FC, useEffect, useState} from 'react';
import {
  Container,
  HeaderLabel,
  MatchMakingSuccessImage,
  Description,
  ReferFriendButton,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {useTranslation} from 'react-i18next';
import ReferFriendPopup from '../../../components/referFriendPopup';
import {Keyboard} from 'react-native';
import {useAnalytics} from '../../../services/analytics';
import {useIsFocused} from '@react-navigation/native';

const MatchMakingSuccessScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const analytics = useAnalytics();

  const toggleModal = () => {
    Keyboard.dismiss();
    setModalVisible(!isModalVisible);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewMatchmakingScreen();
    }
  }, [analytics, isFocused]);

  const renderHeaderContent = () => (
    <>
      <HeaderLabel>{t('MatchMaking_Success_Header')}</HeaderLabel>
      <Description>{t('MatchMaking_Success_Description')}</Description>
    </>
  );
  const renderBodyContent = () => (
    <>
      <MatchMakingSuccessImage />
      <ReferFriendButton
        onPress={() => {
          analytics.trackTouchInviteFriendsButtonOnMatchmakingScreen();
          toggleModal();
        }}
      />
    </>
  );
  const renderReferFriendModal = () => (
    <ReferFriendPopup
      isVisible={isModalVisible}
      hidePopup={toggleModal}
      isFromWaitlist={false}
    />
  );
  return (
    <DarkBackgroundContainer>
      <Container>
        {renderHeaderContent()}
        {renderBodyContent()}
      </Container>
      {renderReferFriendModal()}
    </DarkBackgroundContainer>
  );
};

export default MatchMakingSuccessScreen;
