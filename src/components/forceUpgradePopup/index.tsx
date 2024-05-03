import React, {FC} from 'react';
import {
  BottomTouchable,
  ButtonLabel,
  Container,
  MainContainer,
  PopUpImageBg,
  SubTitleLabel,
  TransparentContainer,
  ModalContainer,
  SubDesLabel,
} from './styles';
import {t} from 'i18next';
import {IOS_APP_STORE_URL} from '../../constants/appContants';
import {Linking} from 'react-native';

interface ItemProps {
  isVisible: boolean;
  appStoreLink: string;
}

export const ForceUpgradePopup: FC<ItemProps> = React.memo(props => {
  const {isVisible, appStoreLink = IOS_APP_STORE_URL} = props;

  const onUpgradeNowPress = async () => {
    console.log('==> ', appStoreLink);
    const canOpen = await Linking.canOpenURL(appStoreLink);
    if (canOpen) {
      await Linking.openURL(appStoreLink);
    }
  };

  return (
    <ModalContainer isVisible={isVisible}>
      <TransparentContainer />
      <MainContainer>
        <PopUpImageBg>
          <Container>
            <SubTitleLabel>{t('Upgrade_Title')}</SubTitleLabel>
            <SubDesLabel>{t('Upgrade_Des')}</SubDesLabel>
            <BottomTouchable onPress={onUpgradeNowPress}>
              <ButtonLabel>{t('Update now')}</ButtonLabel>
            </BottomTouchable>
          </Container>
        </PopUpImageBg>
      </MainContainer>
    </ModalContainer>
  );
});
