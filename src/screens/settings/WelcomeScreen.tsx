import React, {FC} from 'react';
import {
  ButtonView,
  SafeAreaContainer,
  SignInSubTitle,
  SigninLabel,
  StayTouchable,
  WelcomeContainer,
  WelcomeSubContainer,
  WelcomeTitle,
  WelcomeDes,
  AmoriLogo,
  UnderlineTitle,
} from './styles';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {t} from 'i18next';
import AMPrimaryButton from '../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../constants/enums';
import {useWelcome} from '../../hooks/welcome/useWelcome';
import {
  OPEN_PRIVACY_POLICY_FROM_SETTING_SCREEN,
  OPEN_TERMS_AND_CONDITIONS_FROM_SETTING_SCREEN,
} from '../../constants/mixPanelEventsConstants';
import {Config} from 'react-native-config';

const WelcomeScreen: FC<{}> = React.memo(() => {
  const {redirectToNextScreen, openWebBrowser} = useWelcome();
  const renderBottomContent = () => (
    <ButtonView ph={32}>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Get_Started')}
        onPress={() => {
          redirectToNextScreen(3);
        }}
        isDisabled={false}
      />
      <StayTouchable
        onPress={() => {
          redirectToNextScreen(2);
        }}>
        <SigninLabel>{t('Sign_In')}</SigninLabel>
      </StayTouchable>
    </ButtonView>
  );

  return (
    <SafeAreaContainer>
      <DarkBackgroundContainer>
        <WelcomeContainer>
          <WelcomeSubContainer>
            <AmoriLogo />
            <WelcomeTitle>{t('Welcome_Title')}</WelcomeTitle>
            <WelcomeDes>{t('Welcome_Des')}</WelcomeDes>
            {renderBottomContent()}
          </WelcomeSubContainer>
          <SignInSubTitle>
            {t('Sign_In_Bottom_Text')}
            <UnderlineTitle
              onPress={() => {
                openWebBrowser(Config.TERMS_URL, 1);
              }}>
              {t('Terms_And_Service')}
            </UnderlineTitle>
            {' and '}
            <UnderlineTitle
              onPress={() => {
                openWebBrowser(Config.PRIVACY_POLICY, 0);
              }}>
              {t('Privacy_Policy')}
            </UnderlineTitle>
          </SignInSubTitle>
        </WelcomeContainer>
      </DarkBackgroundContainer>
    </SafeAreaContainer>
  );
});

export default WelcomeScreen;
