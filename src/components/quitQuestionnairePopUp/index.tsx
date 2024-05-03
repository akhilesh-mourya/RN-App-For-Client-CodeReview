import React, {FC} from 'react';
import {
  BottomTouchable,
  ButtonLabel,
  MainContainer,
  ModalContainer,
  PopUpImageBg,
  QuitQuestionLabel,
  StayLabel,
  StayTouchable,
  TransparentContainer,
} from './styles';
import {t} from 'i18next';

interface QuitQuestionnairePopUpProps {
  isVisible: boolean;
  onStayPress: any;
  onQuitPress: any;
}

const QuitQuestionnairePopUp: FC<QuitQuestionnairePopUpProps> = React.memo(
  ({isVisible, onStayPress, onQuitPress}) => {
    return (
      <ModalContainer isVisible={isVisible}>
        <TransparentContainer />
        <MainContainer>
          <PopUpImageBg>
            <QuitQuestionLabel>{t('Quit_Question')}</QuitQuestionLabel>
            <BottomTouchable onPress={() => onQuitPress()}>
              <ButtonLabel>{t('I_Am_Sure')}</ButtonLabel>
            </BottomTouchable>
            <StayTouchable onPress={() => onStayPress()}>
              <StayLabel>{t('Stay')}</StayLabel>
            </StayTouchable>
          </PopUpImageBg>
        </MainContainer>
      </ModalContainer>
    );
  },
);
export default QuitQuestionnairePopUp;
