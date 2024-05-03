import React, {FC, useState} from 'react';
import {
  SubContainer,
  HeaderTitle,
  Description,
  RawFullFlexView,
  ButtonContainerView,
  OtpVerifyInput,
  OtpCellContainer,
  OtpText,
  ResendLabel,
  DescriptionBold,
  ResendContainer,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  ResendTimeRemainingLabel,
} from './styles';
import AMHeaderBackButton from '../../components/button/AMHeaderBackButton';
import {AMPrimaryButtonNew} from '../../components/button/AMPrimaryButton';
import {Animated, Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AMButton from '../../components/button/AMButton';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {useVerifyOtp} from '../../hooks/registration/useVerifyOtp';
import {VerifyOTPScreenProps} from '../../types';
import {PrimaryButtonType} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';

const VerifyOtpScreen: FC<VerifyOTPScreenProps> = screenProps => {
  const phoneNumber = screenProps?.route?.params?.phoneNumber;

  const {t} = useTranslation();
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {
    codeInputRef,
    isButtonActive,
    startBorderColorAnim,
    borderStyle,
    onContinuePress,
    resendTimeRemaining,
    isResendTimeRemaining,
    onResendOtpPress,
  } = useVerifyOtp(value, phoneNumber);
  const AnimatedOtpCellContainer =
    Animated.createAnimatedComponent(OtpCellContainer);

  const analytics = useAnalytics();

  const renderOtpVerifyInput = () => {
    return (
      <OtpVerifyInput
        {...props}
        ref={codeInputRef}
        value={value}
        onChangeText={setValue}
        onFocus={() => {
          analytics.trackTouchOTPFieldOnOTPFormScreen();
          console.log('Inout', 'focused');
        }}
        renderCell={({index, symbol, isFocused}: any) => {
          const translateBorderColor = startBorderColorAnim(isFocused, index);
          return (
            <AnimatedOtpCellContainer
              style={borderStyle(value, index, translateBorderColor)}>
              <OtpText key={index} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </OtpText>
            </AnimatedOtpCellContainer>
          );
        }}
      />
    );
  };

  const renderHeaderContent = () => (
    <RawFullFlexView>
      <HeaderTitle>{t('Enter_Verification_Code')}</HeaderTitle>
      <Description>
        {t('Enter_Otp_Description')}
        <DescriptionBold>{phoneNumber}</DescriptionBold>
      </Description>
      {renderOtpVerifyInput()}
      <ResendContainer isTimeLeft={isResendTimeRemaining}>
        <AMButton onPress={onResendOtpPress} disabled={isResendTimeRemaining}>
          {isResendTimeRemaining ? (
            <ResendTimeRemainingLabel>
              {t('Resend_Code_In')} {resendTimeRemaining}s
            </ResendTimeRemainingLabel>
          ) : (
            <ResendLabel>{t('Resend_Code')}</ResendLabel>
          )}
          {/* {isResendTimeRemaining ? <LineViewTimeRemaining /> : <LineView />} */}
        </AMButton>
      </ResendContainer>
    </RawFullFlexView>
  );
  return (
    <DarkBackgroundContainer>
      <AMHeaderBackButton isForRegistration={true} />
      <SubContainer onPress={() => Keyboard.dismiss()}>
        {renderHeaderContent()}
        <ButtonContainerView>
          <AMPrimaryButtonNew
            buttonType={PrimaryButtonType.FullButton}
            label={t('Continue')}
            onPress={onContinuePress}
            isDisabled={!isButtonActive}
            rightIcon={
              isButtonActive ? (
                <ButtonNextArrowActive />
              ) : (
                <ButtonNextArrowDisabled />
              )
            }
          />
        </ButtonContainerView>
      </SubContainer>
    </DarkBackgroundContainer>
  );
};

export default VerifyOtpScreen;
