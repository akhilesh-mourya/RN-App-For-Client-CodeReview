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
import {getFirstName} from '../../utility';

interface ItemProps {
  isVisible: boolean;
  onHidePress: any;
  onContinuePress: any;
  name: string;
}

export const CancelUploadIMessagePopUp: FC<ItemProps> = React.memo(props => {
  const {isVisible, onHidePress, onContinuePress, name} = props;

  return (
    <ModalContainer isVisible={isVisible}>
      <TransparentContainer />
      <MainContainer>
        <PopUpImageBg>
          <Container>
            <SubTitleLabel>
              {t('Cancel_Upload_iMessage_Title').replace(
                '$',
                getFirstName(name),
              )}
            </SubTitleLabel>
            <BottomTouchable
              onPress={() => {
                onContinuePress();
              }}>
              <ButtonLabel>{t('Yes_cancel')}</ButtonLabel>
            </BottomTouchable>
            <CancelTouchable onPress={() => onHidePress()}>
              <CancelLabel>{t('nevermind')}</CancelLabel>
            </CancelTouchable>
          </Container>
        </PopUpImageBg>
      </MainContainer>
    </ModalContainer>
  );
});
