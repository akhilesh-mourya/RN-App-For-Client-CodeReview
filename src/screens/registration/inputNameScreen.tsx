import React, {FC, useEffect, useRef} from 'react';
import {
  SubContainer,
  HeaderTitle,
  RawFullFlexView,
  ButtonContainerView,
  ScrollContainer,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
} from './styles';
import AMHeaderBackButton from '../../components/button/AMHeaderBackButton';
import {AMPrimaryButtonNew} from '../../components/button/AMPrimaryButton';
import {Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {useNameInput} from '../../hooks/registration/useNameInput';
import {AMInputNew} from '../../components/input/AMInput';
import {PrimaryButtonType} from '../../constants/enums';
import {FontFamily} from '../../enums';
import {useAnalytics} from '../../services/analytics';

const InputNameScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const firstNameInputRef = useRef<any>();
  const lastNameInputRef = useRef<any>();

  const analytics = useAnalytics();

  const {
    firstName,
    lastName,
    isButtonActive,
    firstNameInputFocused,
    lastNameInputFocused,
    firstNameError,
    lastNameError,
    onContinuePress,
    onFirstNameChange,
    onLastNameChange,
    setFirstNameFocus,
    setLastNameFocus,
  } = useNameInput();

  useEffect(() => {
    setTimeout(() => {
      firstNameInputRef?.current?.focus();
    }, 500);
  }, []);

  const renderHeaderContent = () => (
    <>
      <HeaderTitle>{t('Name_Input_Header')}</HeaderTitle>
    </>
  );

  const renderBodyContent = () => (
    <>
      <AMInputNew
        setRef={firstNameInputRef}
        isFocused={firstNameInputFocused}
        isFilled={firstName?.length > 0}
        inputValue={firstName}
        onTextChange={onFirstNameChange}
        inputPlaceholder={t('First_Name_Placeholder')}
        onFocus={() => {
          analytics.trackTouchFirstNameFieldOnNameFormScreen();
          setFirstNameFocus(true);
        }}
        onBlur={() => setFirstNameFocus(false)}
        returnKeyType="next"
        onSubmitEditing={() => lastNameInputRef?.current?.focus()}
        autoFocus={true}
        inputError={firstNameError}
        topMargin={40}
        autoCapitalize={'words'}
        autoComplete={'given-name'}
        fontFamily={FontFamily.Medium}
        borderRadius={8}
        height={49}
      />
      <AMInputNew
        setRef={lastNameInputRef}
        isFocused={lastNameInputFocused}
        isFilled={lastName?.length > 0}
        inputValue={lastName}
        onTextChange={onLastNameChange}
        inputPlaceholder={t('Last_Name_Placeholder')}
        onFocus={() => {
          analytics.trackTouchLastNameFieldOnNameFormScreen();
          setLastNameFocus(true);
        }}
        onBlur={() => setLastNameFocus(false)}
        autoCapitalize={'words'}
        autoComplete={'family-name'}
        topMargin={14}
        borderRadius={8}
        height={49}
        fontFamily={FontFamily.Medium}
        inputError={lastNameError}
      />
    </>
  );
  return (
    <DarkBackgroundContainer>
      <AMHeaderBackButton isForRegistration={true} />
      <SubContainer onPress={() => Keyboard.dismiss()}>
        <RawFullFlexView>
          {renderHeaderContent()}
          {renderBodyContent()}
        </RawFullFlexView>
        <ButtonContainerView>
          <ScrollContainer>
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
          </ScrollContainer>
        </ButtonContainerView>
      </SubContainer>
    </DarkBackgroundContainer>
  );
};

export default InputNameScreen;
