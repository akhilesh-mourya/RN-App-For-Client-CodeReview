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
  CancelTouchable,
  CancelLabel,
} from './styles';
import {t} from 'i18next';

interface ItemProps {
  isVisible: boolean;
  onHidePress: any;
  onContinuePress: any;
}

export const SwitchPersonalityPopUp: FC<ItemProps> = React.memo(props => {
  const {isVisible, onHidePress, onContinuePress} = props;

  return (
    <ModalContainer isVisible={isVisible}>
      <TransparentContainer />
      <MainContainer>
        <PopUpImageBg>
          <Container>
            <SubTitleLabel>{t('Switch_Title')}</SubTitleLabel>
            <BottomTouchable
              onPress={() => {
                onContinuePress();
              }}>
              <ButtonLabel>{t('Switch')}</ButtonLabel>
            </BottomTouchable>
            <CancelTouchable onPress={() => onHidePress()}>
              <CancelLabel>{'Cancel'}</CancelLabel>
            </CancelTouchable>
          </Container>
        </PopUpImageBg>
      </MainContainer>
    </ModalContainer>
  );
});
