import React, {FC} from 'react';
import {
  BottomTouchable,
  ButtonLabel,
  Container,
  CrossIcon,
  MainContainer,
  PopUpImageBg,
  SubTitleLabel,
  TouchableOpacity,
  ModalContainer,
  SubTitleBoldLabel,
} from './styles';
import {t} from 'i18next';

interface SkipPopUpProps {
  isVisible: boolean;
  onTouchDismiss: any;
  onTouchContinue: any;
}

export const SkipPopUp: FC<SkipPopUpProps> = React.memo(props => {
  const {isVisible, onTouchDismiss, onTouchContinue} = props;

  return (
    <ModalContainer isVisible={isVisible} useNativeDriver={false}>
      <MainContainer>
        <PopUpImageBg>
          <Container>
            <TouchableOpacity onPress={onTouchDismiss}>
              <CrossIcon />
            </TouchableOpacity>
            <SubTitleLabel>
              {t('Skip_Title')}
              <SubTitleBoldLabel>Christie</SubTitleBoldLabel>.
            </SubTitleLabel>
            <BottomTouchable
              onPress={() => {
                onTouchContinue();
              }}>
              <ButtonLabel>{t('Continue')}</ButtonLabel>
            </BottomTouchable>
          </Container>
        </PopUpImageBg>
      </MainContainer>
    </ModalContainer>
  );
});
