import React, {FC} from 'react';
import {
  BottomView,
  Container,
  DeleteAccountSuccessIcon,
  InstructionsLabel,
  MainContainer,
  TitleLabel,
} from './styles';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import AMPrimaryButton from '../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../constants/enums';
import {t} from 'i18next';
import {resetRouteAfterDeleteAccount} from '../../navigation/navigationHelper';
import {SCREEN_NAME} from '../../enums';

const DeleteAccountSuccessScreen: FC<{}> = React.memo(() => {
  const renderBottomContent = () => (
    <BottomView ph={32}>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('OK_GotIt')}
        onPress={() => {
          resetRouteAfterDeleteAccount(SCREEN_NAME.WelcomeScreen);
        }}
        isDisabled={false}
      />
    </BottomView>
  );

  const renderBodyContent = () => {
    return (
      <MainContainer>
        <TitleLabel>{t('Delete_Account_Success_Title')}</TitleLabel>
        <DeleteAccountSuccessIcon />
        <InstructionsLabel>
          {t('Delete_Account_Success_Line1')}
        </InstructionsLabel>
      </MainContainer>
    );
  };

  return (
    <Container>
      <DarkBackgroundContainer>
        {renderBodyContent()}
        {renderBottomContent()}
      </DarkBackgroundContainer>
    </Container>
  );
});

export default DeleteAccountSuccessScreen;
