import React, {FC, useEffect} from 'react';
import {
  Container,
  TopContainer,
  NameLabel,
  SectionContainer,
  ProfileIcon,
  SettingIcon,
  FeedbackIcon,
  SectionLabel,
  NextIcon,
  SeparatorView,
  ProfileContainer,
  TouchableOpacity,
  LogoutContainer,
  LogoutLabel,
  LogoutIcon,
  ImageLabel,
  VerticalBlock,
} from './profileScreenStyles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {t} from 'i18next';
import {useProfile} from '../../../hooks/profile/useProfile';
import LogoutPopUp from '../../../components/logoutPopUp';
import {useAnalytics} from '../../../services/analytics';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen: FC<{}> = () => {
  const {
    redirectToNextScreen,
    firstLetterOfName,
    firstName,
    isLogoutVisible,
    showLogoutPopup,
    logoutPress,
  } = useProfile();

  const analytics = useAnalytics();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewProfileScreen();
    }
  }, [analytics, isFocused]);

  const renderHeaderContent = () => (
    <TopContainer>
      {/* <AvatarImg source={{uri: DUMMY_USER_PROFILE}} /> */}
      <ProfileContainer>
        <ImageLabel>{firstLetterOfName}</ImageLabel>
      </ProfileContainer>
      <NameLabel>{firstName}</NameLabel>
    </TopContainer>
  );

  const renderIcon = (type: number) => {
    if (type === 1) {
      return <ProfileIcon />;
    } else if (type === 2) {
      return <SettingIcon />;
    } else if (type === 3) {
      return <FeedbackIcon />;
    } else {
      return null;
    }
  };

  const renderSection = (title: string, type: number) => {
    return (
      <>
        <TouchableOpacity onPress={() => redirectToNextScreen(type)}>
          <SectionContainer>
            {renderIcon(type)}
            <SectionLabel>{title}</SectionLabel>
            <NextIcon />
          </SectionContainer>
        </TouchableOpacity>
        {(type === 1 || type === 2) && <SeparatorView />}
      </>
    );
  };

  const renderLogout = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          showLogoutPopup(true);
          analytics.trackTouchLogOutButtonOnProfileScreen();
        }}>
        <LogoutContainer>
          <LogoutIcon />
          <LogoutLabel>{t('Logout')}</LogoutLabel>
        </LogoutContainer>
      </TouchableOpacity>
    );
  };

  const renderLogoutPopup = () => {
    return (
      <LogoutPopUp
        isVisible={isLogoutVisible}
        title={t('Logout')}
        subTitle={t('Logout_Subtitle')}
        buttonTitle={t('Logout')}
        cancelTitle={t('Cancel')}
        onQuitPress={() => logoutPress()}
        onStayPress={() => {
          showLogoutPopup(false);
          analytics.trackTouchCancelButtonOnLogOutConfirmationPopupOnProfileScreen();
        }}
      />
    );
  };

  return (
    <DarkBackgroundContainer>
      <Container>
        {renderHeaderContent()}
        <VerticalBlock />
        {renderSection(t('Home_Progress_Header_Label'), 1)}
        {renderSection(t('Settings'), 2)}
        {renderSection(t('Give_feedback'), 3)}
        {renderLogout()}
        {renderLogoutPopup()}
      </Container>
    </DarkBackgroundContainer>
  );
};

export default ProfileScreen;
