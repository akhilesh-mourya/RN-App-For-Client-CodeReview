import React, {FC, useEffect} from 'react';
import {
  BackButtonView,
  BackIcon,
  BottomView,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  Container,
  HeaderContainer,
  KeyboardAvoidingViewContainer,
  ReasonFlatList,
  ReasonSubTitle,
  ReasonTitle,
  ScrollViewContainer,
} from './styles';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {useSetting} from '../../hooks/settings/useSetting';
import {t} from 'i18next';
import DeleteAccountReasonItem from '../../components/molecule/deleteAccountReasonItem';
import AMPrimaryButton from '../../components/button/AMPrimaryButton';
import {MixpanelData, PrimaryButtonType} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';

const DeleteAccountReasonScreen: FC<{}> = React.memo(() => {
  const {
    deleteAccountReasonList,
    redirectToPreviousScreen,
    reason,
    otherReason,
    updateOtherReason,
    updateReasonForDeleteAccount,
    redirectToNextScreen,
    isDeleteAccountReasonContinueActive,
  } = useSetting();

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewDeleteAccountScreen();
  }, [analytics]);

  const renderHeaderContent = () => {
    return (
      <HeaderContainer>
        <BackButtonView onPress={() => redirectToPreviousScreen()}>
          <BackIcon />
        </BackButtonView>
      </HeaderContainer>
    );
  };

  const renderListItem = ({item, index}) => {
    return (
      <DeleteAccountReasonItem
        item={item}
        isSelected={reason === item?.value}
        onPress={() => {
          const mappedReason = MixpanelData[item.value];
          analytics.trackSelectReasonOnDeleteAccountScreen(mappedReason);
          updateReasonForDeleteAccount(item?.value);
        }}
        isForOthers={deleteAccountReasonList.length - 1 === index}
        onChangeOtherReason={updateOtherReason}
        isOtherFieldAsInput={true}
        otherReason={otherReason}
      />
    );
  };

  const renderBodyContent = () => {
    return (
      <ScrollViewContainer>
        <ReasonTitle>{t('Delete_Account_Reason_Title')}</ReasonTitle>
        <ReasonSubTitle>{t('Delete_Account_Reason_Subtitle')}</ReasonSubTitle>
        <ReasonFlatList
          data={deleteAccountReasonList}
          renderItem={renderListItem}
        />
      </ScrollViewContainer>
    );
  };

  const renderBottomContent = () => (
    <BottomView ph={0}>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          redirectToNextScreen(7);
        }}
        isDisabled={!isDeleteAccountReasonContinueActive}
        rightIcon={
          isDeleteAccountReasonContinueActive ? (
            <ButtonNextArrowActive />
          ) : (
            <ButtonNextArrowDisabled />
          )
        }
      />
    </BottomView>
  );

  return (
    <Container>
      <DarkBackgroundContainer>
        <KeyboardAvoidingViewContainer>
          {renderHeaderContent()}
          {renderBodyContent()}
          {renderBottomContent()}
        </KeyboardAvoidingViewContainer>
      </DarkBackgroundContainer>
    </Container>
  );
});

export default DeleteAccountReasonScreen;
