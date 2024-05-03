import React, {FC, useEffect, useState} from 'react';
import {
  SubContainer,
  HeaderTitle,
  Description,
  RawFullFlexView,
  ButtonContainerView,
  InputContainer,
  CountryPickerView,
  InputView,
  InputDivider,
  ScrollContainer,
  ErrorLabel,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  TopMargin,
} from './styles';
import AMHeaderBackButton from '../../components/button/AMHeaderBackButton';
import {AMPrimaryButtonNew} from '../../components/button/AMPrimaryButton';
import {Animated, Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {usePhoneNumberInput} from '../../hooks/registration/usePhoneNumberInput';
import {PrimaryButtonType} from '../../constants/enums';
import {useTheme} from 'styled-components';
import {formatNumberBeforeCall} from '../../helpers/commonFunctions';
import {useAnalytics} from '../../services/analytics';

const AnimatedInputContainer = Animated.createAnimatedComponent(InputContainer);

const InputPhoneNumberScreen: FC<{}> = props => {
  const isFromLogout = props?.route?.params?.isFromLogout;

  const {t} = useTranslation();
  const [isInputFocused, setFocus] = useState(false);
  const {
    selectedCountry,
    phoneNum,
    isButtonActive,
    isError,
    translateFieldFocusAnim,
    translateFieldFocusBGAnim,
    onCountrySelect,
    onContinuePress,
    onNumberChange,
    startFieldFocusAnimation,
  } = usePhoneNumberInput();
  const theme = useTheme();

  const renderHeaderContent = () => (
    <>
      <HeaderTitle>{t('What_Your_Phone')}</HeaderTitle>
      <Description>{t('Phone_Number_Input_Description')}</Description>
    </>
  );

  useEffect(() => {
    startFieldFocusAnimation(isInputFocused);
  }, [isInputFocused, startFieldFocusAnimation]);

  const analytics = useAnalytics();

  const renderBodyContent = () => (
    <>
      <AnimatedInputContainer
        style={{
          borderColor: translateFieldFocusAnim,
          backgroundColor: phoneNum
            ? theme.colors.black_10_new
            : translateFieldFocusBGAnim,
        }}>
        <CountryPickerView
          countryCode={selectedCountry?.cca2}
          onSelect={onCountrySelect}
          onOpen={() => {
            analytics.trackTouchCountryFieldOnPhoneNumberFormScreen();
          }}
        />
        <InputDivider />
        <InputView
          value={phoneNum}
          onChangeText={onNumberChange}
          onFocus={() => {
            analytics.trackTouchPhoneNumberFieldOnPhoneNumberFormScreen();
            setFocus(true);
          }}
          onBlur={() => setFocus(false)}
          autoFocus={true}
        />
      </AnimatedInputContainer>
      {isError && <ErrorLabel>{t('Invalid_Phone')}</ErrorLabel>}
    </>
  );

  const renderBottomView = () => (
    <ButtonContainerView>
      <ScrollContainer>
        <AMPrimaryButtonNew
          buttonType={PrimaryButtonType.FullButton}
          label={t('Continue')}
          onPress={() => {
            const callingNum = formatNumberBeforeCall(
              `+${selectedCountry?.callingCode[0]}${phoneNum}`,
            );
            onContinuePress(callingNum);
          }}
          isDisabled={!isButtonActive}
          rightIcon={
            isButtonActive ? (
              <ButtonNextArrowActive />
            ) : (
              <ButtonNextArrowDisabled />
            )
          }
        />
      </ScrollContainer>
    </ButtonContainerView>
  );

  return (
    <DarkBackgroundContainer>
      {isFromLogout ? (
        <TopMargin />
      ) : (
        <AMHeaderBackButton isForRegistration={true} />
      )}
      <SubContainer onPress={() => Keyboard.dismiss()}>
        <RawFullFlexView>
          {renderHeaderContent()}
          {renderBodyContent()}
        </RawFullFlexView>
        {renderBottomView()}
      </SubContainer>
    </DarkBackgroundContainer>
  );
};

export default InputPhoneNumberScreen;
