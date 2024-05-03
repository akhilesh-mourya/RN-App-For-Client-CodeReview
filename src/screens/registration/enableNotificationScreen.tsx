import React, {FC} from 'react';
import {
  EnableNotifHeaderTitle,
  EnableNotifDescription,
  RawFullFlexView,
  ButtonContainerView,
  EnableNotificationImage,
} from './styles';
import {AMPrimaryButtonNew} from '../../components/button/AMPrimaryButton';
import {useTranslation} from 'react-i18next';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {useEnableNotification} from '../../hooks/registration/useEnableNotification';
import {PrimaryButtonType} from '../../constants/enums';

const EnableNotificationScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const {onEnablePress} = useEnableNotification();

  const renderHeaderContent = () => (
    <>
      <EnableNotifHeaderTitle>{t('Last_Step_Header')}</EnableNotifHeaderTitle>
      <EnableNotifDescription>
        {t('Last_Step_Description')}
      </EnableNotifDescription>
    </>
  );
  const renderBodyContent = () => (
    <>
      <EnableNotificationImage />
    </>
  );
  return (
    <DarkBackgroundContainer>
      <RawFullFlexView>
        {renderHeaderContent()}
        {renderBodyContent()}
      </RawFullFlexView>
      <ButtonContainerView>
        <AMPrimaryButtonNew
          buttonType={PrimaryButtonType.FullButton}
          label={t('Enable_Notifications')}
          onPress={onEnablePress}
          isDisabled={false}
          height={55}
        />
      </ButtonContainerView>
    </DarkBackgroundContainer>
  );
};

export default EnableNotificationScreen;
