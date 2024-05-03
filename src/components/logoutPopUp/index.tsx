import React, {FC} from 'react';
import {
  BottomTouchable,
  ButtonLabel,
  CancelLabel,
  CancelTouchable,
  MainContainer,
  ModalContainer,
  PopUpImageBg,
  SubTitleLabel,
  TitleLabel,
} from './styles';

interface LogoutProps {
  isVisible: boolean;
  onStayPress: any;
  onQuitPress: any;
  title: string;
  subTitle: string;
  cancelTitle: string;
  buttonTitle: string;
}

const LogoutPopUp: FC<LogoutProps> = React.memo(
  ({
    isVisible,
    onStayPress,
    onQuitPress,
    title,
    subTitle,
    buttonTitle,
    cancelTitle,
  }) => {
    return (
      <ModalContainer isVisible={isVisible}>
        {/* <TransparentContainer /> */}
        <MainContainer>
          <PopUpImageBg>
            <TitleLabel>{title}</TitleLabel>
            <SubTitleLabel>{subTitle}</SubTitleLabel>
            <BottomTouchable onPress={() => onQuitPress()}>
              <ButtonLabel>{buttonTitle}</ButtonLabel>
            </BottomTouchable>
            <CancelTouchable onPress={() => onStayPress()}>
              <CancelLabel>{cancelTitle}</CancelLabel>
            </CancelTouchable>
          </PopUpImageBg>
        </MainContainer>
      </ModalContainer>
    );
  },
);
export default LogoutPopUp;
