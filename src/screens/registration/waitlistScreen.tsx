import React, {FC} from 'react';
import {
  WaitlistSubContainer,
  AmoriSVGLogo,
  WaitlistTitle,
  WaitlistDescription,
  FullFlexView,
  MatchMakingBottomView,
  WaitlistDescriptionHint,
  ReferFriendButton,
  EnterReferralFriendLabel,
  EmptyView,
} from './styles';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import ReferralCodePopup from '../../components/referralCodePopup';
import {useWaitListScreen} from '../../hooks/registration/useWaitListScreen';
import ReferFriendPopup from '../../components/referFriendPopup';
import {useAnalytics} from '../../services/analytics';

const WaitlistScreen: FC<{}> = () => {
  const {
    t,
    isPopupVisible,
    isReferPopupVisible,
    setPopUpVisible,
    onReferrSuccess,
    toggleModal,
  } = useWaitListScreen();

  const analytics = useAnalytics();

  const renderBodyContent = () => (
    <FullFlexView>
      <AmoriSVGLogo />
      <WaitlistTitle>{t('Matchmaking_Title')}</WaitlistTitle>
      <WaitlistDescription>{t('Matchmaking_Des')}</WaitlistDescription>
    </FullFlexView>
  );
  const renderBottomView = () => (
    <MatchMakingBottomView>
      <WaitlistDescriptionHint>
        {t('Increase_Chances_Des')}
      </WaitlistDescriptionHint>
      <ReferFriendButton
        onPress={() => {
          toggleModal();
          analytics.trackTouchInviteFriendsButtonOnWaitlistScreen();
        }}
      />
      <EmptyView
        onPress={() => {
          setPopUpVisible(true);
          analytics.trackTouchEnterReferralCodeButtonOnWaitlistScreen();
        }}>
        <EnterReferralFriendLabel>
          {t('Enter_Referr_Code')}
        </EnterReferralFriendLabel>
      </EmptyView>
    </MatchMakingBottomView>
  );
  const renderReferFriendModal = () => (
    <ReferFriendPopup
      isVisible={isReferPopupVisible}
      hidePopup={toggleModal}
      isFromWaitlist={true}
    />
  );
  return (
    <DarkBackgroundContainer>
      <WaitlistSubContainer>
        {renderBodyContent()}
        {renderBottomView()}
      </WaitlistSubContainer>
      <ReferralCodePopup
        isVisible={isPopupVisible}
        onHidePress={() => setPopUpVisible(false)}
        onContinuePress={onReferrSuccess}
      />
      {renderReferFriendModal()}
    </DarkBackgroundContainer>
  );
};

export default WaitlistScreen;
