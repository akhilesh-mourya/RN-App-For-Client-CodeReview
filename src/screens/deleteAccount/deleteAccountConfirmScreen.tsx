import React, {FC, useEffect} from 'react';
import {
  BottomView,
  CancelLabel,
  Container,
  DeleteImage,
  InstructionsLabel,
  MainContainer,
  TitleLabel,
  TouchableOpacity,
} from './styles';
import {ACCOUNT_DELETE_CONFIRMATION_IMAGE} from '../../constants/imageConstants';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {t} from 'i18next';
import AMPrimaryButton from '../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../constants/enums';
import {useSetting} from '../../hooks/settings/useSetting';
import {DeleteUserProps} from '../../types';
import {useAnalytics} from '../../services/analytics';

const renderImage = () => {
  return <DeleteImage source={ACCOUNT_DELETE_CONFIRMATION_IMAGE} />;
};

const DeleteAccountConfirmScreen: FC<DeleteUserProps> = React.memo(
  screenProps => {
    const analytics = useAnalytics();

    useEffect(() => {
      analytics.trackViewConfirmDeleteAccountScreen();
    }, [analytics]);

    const {redirectToPreviousScreen, callDeleteUserAPI} = useSetting();
    const {reason, otherReason} = screenProps?.route?.params;
    const renderBottomContent = () => (
      <BottomView ph={32}>
        <AMPrimaryButton
          buttonType={PrimaryButtonType.FullButton}
          label={t('Confirm_Delete')}
          onPress={() => {
            callDeleteUserAPI(reason, otherReason);
          }}
          isDisabled={false}
        />
        <TouchableOpacity onPress={() => redirectToPreviousScreen(true)}>
          <CancelLabel>{t('Cancel')}</CancelLabel>
        </TouchableOpacity>
      </BottomView>
    );

    return (
      <Container>
        <DarkBackgroundContainer>
          <MainContainer>
            <TitleLabel>{t('Delete_Account_Question')}</TitleLabel>
            {renderImage()}
            <InstructionsLabel>
              {t('Delete_Account_Instructions')}
            </InstructionsLabel>
          </MainContainer>
          {renderBottomContent()}
        </DarkBackgroundContainer>
      </Container>
    );
  },
);

export default DeleteAccountConfirmScreen;
