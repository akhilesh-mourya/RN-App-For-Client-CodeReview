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
  TransparentContainer,
  ModalContainer,
  InputContainer,
} from './styles';
import {AMInputNew} from '../input/AMInput';
import {useReferralCode} from '../../hooks/registration/useReferralCode';
import Loader from '../loader';
import {FontFamily} from '../../enums';

interface ReferralCodePopupProps {
  isVisible: boolean;
  onHidePress: any;
  onContinuePress: any;
}

const ReferralCodePopup: FC<ReferralCodePopupProps> = props => {
  const {
    t,
    referralText,
    inputFocus,
    inputError,
    isVisible,
    isLoading,
    setInputFocus,
    onSubmitPress,
    onClosePress,
    onTextChange,
  } = useReferralCode(props);

  return (
    <ModalContainer isVisible={isVisible} avoidKeyboard={true}>
      <TransparentContainer />
      <MainContainer>
        <PopUpImageBg>
          <Container>
            <TouchableOpacity onPress={onClosePress}>
              <CrossIcon />
            </TouchableOpacity>
            <SubTitleLabel>{t('Enter_Referral_Code')}</SubTitleLabel>
            <InputContainer>
              <AMInputNew
                isFocused={inputFocus}
                isFilled={referralText?.length > 0}
                inputValue={referralText}
                onTextChange={onTextChange}
                inputPlaceholder={t('Enter code')}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                height={39}
                topMargin={16}
                borderRadius={8}
                inputError={inputError}
                fontFamily={FontFamily.Medium}
                horizontalPadding={16}
                fontSize={14}
              />
            </InputContainer>
            <BottomTouchable disabled={!referralText} onPress={onSubmitPress}>
              <ButtonLabel>{t('Submit')}</ButtonLabel>
            </BottomTouchable>
          </Container>
        </PopUpImageBg>
      </MainContainer>
      <Loader isVisible={isLoading} isAnimationEnabled={false} />
    </ModalContainer>
  );
};

export default ReferralCodePopup;
