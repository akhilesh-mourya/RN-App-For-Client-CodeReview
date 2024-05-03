import React, {FC, useState} from 'react';
import HeaderWithBackTitle from '../../components/headerWithBackTitle';
import {
  MainContainer,
  NotificationSwitch,
  RowContainer,
  SafeAreaContainer,
  SeparatorView,
  TitleLabel,
  VerticalBlock,
} from './styles';
import GradientBackgroundContainer from '../../components/screenBackground/GradientBackgroundContainer';
import {t} from 'i18next';
import theme from '../../theme';
import {usePushNotification} from '../../hooks/pushNotification/usePushNotification';

const PushNotificationScreen: FC<{}> = React.memo(() => {
  const {
    redirectToPreviousScreen,
    allNotificationEnabled,
    newMessageEnabled,
    newAnalysisEnabled,
    updateEnabled,
    onSwitchAllNotification,
    onSwitchNewAnalysis,
    onSwitchNewMessage,
    onSwitchUpdate,
  } = usePushNotification();
  const renderHeader = () => {
    return (
      <HeaderWithBackTitle
        title={t('Push_notifications')}
        onBackPress={redirectToPreviousScreen}
      />
    );
  };

  const renderSwitch = (type: number) => {
    if (type === 1) {
      return (
        <NotificationSwitch
          onSwitch={onSwitchAllNotification}
          startOnLeft={allNotificationEnabled}
          toggleValue={allNotificationEnabled}
          animationSpeed={300}
        />
      );
    } else if (type === 2) {
      return (
        <NotificationSwitch
          onSwitch={onSwitchNewMessage}
          startOnLeft={newMessageEnabled}
          toggleValue={newMessageEnabled}
          animationSpeed={300}
        />
      );
    } else if (type === 3) {
      return (
        <NotificationSwitch
          onSwitch={onSwitchNewAnalysis}
          startOnLeft={newAnalysisEnabled}
          toggleValue={newAnalysisEnabled}
          animationSpeed={300}
        />
      );
    } else if (type === 4) {
      return (
        <NotificationSwitch
          onSwitch={onSwitchUpdate}
          startOnLeft={updateEnabled}
          toggleValue={newAnalysisEnabled}
          animationSpeed={300}
        />
      );
    } else {
      return null;
    }
  };

  const renderSection = (title: string, type: number) => {
    return (
      <>
        <RowContainer>
          <TitleLabel>{title}</TitleLabel>
          {renderSwitch(type)}
        </RowContainer>
        <SeparatorView />
      </>
    );
  };

  return (
    <SafeAreaContainer>
      <GradientBackgroundContainer>
        <MainContainer>
          {renderHeader()}
          <VerticalBlock />
          {renderSection(t('All_Notifications'), 1)}
          {renderSection(t('New_Messages'), 2)}
          {renderSection(t('New_Analysis'), 3)}
          {renderSection(t('Updates'), 4)}
          <VerticalBlock />
        </MainContainer>
      </GradientBackgroundContainer>
    </SafeAreaContainer>
  );
});

export default PushNotificationScreen;
