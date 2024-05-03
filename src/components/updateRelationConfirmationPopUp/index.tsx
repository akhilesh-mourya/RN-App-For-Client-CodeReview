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

interface UpdateRelationConfirmationPopUpProps {
  isVisible: boolean;
  onStayPress: any;
  onQuitPress: any;
}

const UpdateRelationConfirmationPopUp: FC<UpdateRelationConfirmationPopUpProps> = React.memo(
  ({isVisible, onStayPress, onQuitPress}) => {
    return (
      <ModalContainer isVisible={isVisible}>
        <TransparentContainer />
        <MainContainer>
          <PopUpImageBg>
            <QuitQuestionLabel>{t('Update_Conv_Confirmation')}</QuitQuestionLabel>
            <BottomTouchable onPress={() => onQuitPress()}>
              <ButtonLabel>{t('Continue')}</ButtonLabel>
            </BottomTouchable>
            <StayTouchable onPress={() => onStayPress()}>
              <StayLabel>{t('Cancel')}</StayLabel>
            </StayTouchable>
          </PopUpImageBg>
        </MainContainer>
      </ModalContainer>
    );
  },
);
export default UpdateRelationConfirmationPopUp;
