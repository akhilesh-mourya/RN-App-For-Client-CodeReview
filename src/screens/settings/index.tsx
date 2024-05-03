import React, {FC, useEffect} from 'react';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {
  DeleteAccountLabel,
  DeleteContainer,
  DeleteIcon,
  MainContainer,
  NextIcon,
  RedirectIcon,
  RowContainer,
  SafeAreaContainer,
  SeparatorView,
  StarIcon,
  TitleLabel,
  TouchableOpacity,
  VersionContainer,
  VersionLabel,
  VerticalBlock,
} from './styles';
import {t} from 'i18next';
import HeaderWithBackTitle from '../../components/headerWithBackTitle';
import {useSetting} from '../../hooks/settings/useSetting';
import {Config} from 'react-native-config';
import {useAnalytics} from '../../services/analytics';
import {useIsFocused} from '@react-navigation/native';

const SettingScreen: FC<{}> = React.memo(() => {
  const {
    redirectToPreviousScreen,
    redirectToNextScreen,
    appVersion,
    buildVersion,
    openWebBrowser,
  } = useSetting();
  const analytics = useAnalytics();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewSettingsScreen();
    }
  }, [analytics, isFocused]);

  const renderSection = (title: string, type: number) => {
    return (
      <>
        <TouchableOpacity onPress={() => redirectToNextScreen(type)}>
          <RowContainer>
            <TitleLabel>{title}</TitleLabel>
            <NextIcon />
          </RowContainer>
        </TouchableOpacity>
        <SeparatorView />
      </>
    );
  };

  const renderURLSection = (
    title: string,
    url: string,
    isExternal: boolean = false,
    type: number,
  ) => {
    return (
      <>
        <TouchableOpacity onPress={() => openWebBrowser(url, isExternal, type)}>
          <RowContainer>
            <TitleLabel>{title}</TitleLabel>
            <RedirectIcon />
          </RowContainer>
        </TouchableOpacity>
        <SeparatorView />
      </>
    );
  };

  const renderDeleteLayout = () => {
    return (
      <TouchableOpacity onPress={() => redirectToNextScreen(6)}>
        <DeleteContainer>
          <DeleteIcon />
          <DeleteAccountLabel>{t('Delete_account')}</DeleteAccountLabel>
        </DeleteContainer>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <HeaderWithBackTitle
        title={t('Settings')}
        onBackPress={redirectToPreviousScreen}
      />
    );
  };

  const renderVersionContainer = () => {
    return (
      <VersionContainer>
        <StarIcon />
        <VersionLabel>
          {t('version')} {appVersion} ({buildVersion})
        </VersionLabel>
      </VersionContainer>
    );
  };

  return (
    <SafeAreaContainer>
      <DarkBackgroundContainer>
        <MainContainer>
          {renderHeader()}
          <VerticalBlock />
          <>
            {/* {renderSection(t('Email'), true, 1)} */}
            {renderSection(t('Coach_Personality'), 2)}
            {/* {renderSection(t('Push_notifications'), true, 3)} */}
            {renderURLSection(t('Privacy_Policy'), Config.PRIVACY_POLICY, true, 0)}
            {renderURLSection(t('Terms_Conditions'), Config.TERMS_URL, true, 1)}
            {renderDeleteLayout()}
          </>
          {renderVersionContainer()}
        </MainContainer>
      </DarkBackgroundContainer>
    </SafeAreaContainer>
  );
});

export default SettingScreen;
