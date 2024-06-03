/**
 * Amori - Custom Input
 */
import React, {useEffect, useState} from 'react';
import {InputContainer, InputView, ErrorLabel, InputViewNew} from './styles';
import {Animated} from 'react-native';
import {useTheme} from 'styled-components';
import {FontFamily} from 'custom_enums';

interface AMInputProps {
  isFocused?: boolean;
  isFilled?: boolean;
  inputValue: string;
  returnKeyType?: any;
  inputPlaceholder?: string;
  autoFocus?: boolean;
  inputError?: string | null;
  topMargin?: number;
  onTextChange?: any;
  autoCapitalize?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  setRef?: any;
  horizontalPadding?: Number;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: number;
  height?: number;
  maxLength?: number;
}

const AnimatedInputContainer = Animated.createAnimatedComponent(InputContainer);

const AMInput: React.FC<AMInputProps> = ({
  isFocused,
  isFilled,
  inputValue,
  inputPlaceholder,
  returnKeyType,
  autoFocus,
  inputError,
  onTextChange,
  topMargin,
  autoCapitalize = 'none',
  autoComplete = 'off',
  onFocus,
  onBlur,
  onSubmitEditing,
  setRef,
  horizontalPadding = 24,
  fontFamily = FontFamily.Regular,
  fontSize = 16,
  borderRadius = 10,
  height = 48,
  maxLength = 24,
  ...rest
}) => {
  const [translationFieldFocusAnim] = useState(new Animated.Value(0));
  const theme = useTheme();
  const translateFieldFocusAnim = translationFieldFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.inputBorder, theme.colors.primary],
  });

  const translateFieldFocusBGAnim = translationFieldFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.grey_80, theme.colors.black_10],
  });

  useEffect(() => {
    Animated.timing(translationFieldFocusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused, translationFieldFocusAnim]);

  return (
    <>
      <AnimatedInputContainer
        style={{
          borderColor: translateFieldFocusAnim,
          backgroundColor: isFilled
            ? theme.colors.black_10
            : translateFieldFocusBGAnim,
        }}
        isFilled={isFilled}
        topMargin={topMargin}
        borderRadius={borderRadius}
        {...rest}>
        <InputView
          ref={setRef}
          value={inputValue}
          onChangeText={onTextChange}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType={returnKeyType}
          placeholder={inputPlaceholder}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          horizontalPadding={horizontalPadding}
          fontFamily={fontFamily}
          fontSize={fontSize}
          maxLength={maxLength}
        />
      </AnimatedInputContainer>
      {!!inputError && <ErrorLabel>{inputError}</ErrorLabel>}
    </>
  );
};

export const AMInputNew: React.FC<AMInputProps> = ({
  isFocused,
  isFilled,
  inputValue,
  inputPlaceholder,
  returnKeyType,
  autoFocus,
  inputError,
  onTextChange,
  topMargin,
  autoCapitalize = 'none',
  autoComplete = 'off',
  onFocus,
  onBlur,
  onSubmitEditing,
  setRef,
  horizontalPadding = 24,
  fontFamily = FontFamily.Regular,
  fontSize = 16,
  borderRadius = 10,
  height = 48,
  maxLength = 24,
  ...rest
}) => {
  const [translationFieldFocusAnim] = useState(new Animated.Value(0));
  const theme = useTheme();
  const translateFieldFocusAnim = translationFieldFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.inputBorderNew, theme.colors.primary_new],
  });

  const translateFieldFocusBGAnim = translationFieldFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.black_10_new, theme.colors.black_10_new],
  });

  useEffect(() => {
    Animated.timing(translationFieldFocusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused, translationFieldFocusAnim]);

  return (
    <>
      <AnimatedInputContainer
        style={{
          borderColor: translateFieldFocusAnim,
          backgroundColor: isFilled
            ? theme.colors.black_10_new
            : translateFieldFocusBGAnim,
        }}
        isFilled={isFilled}
        topMargin={topMargin}
        borderRadius={borderRadius}
        height={height}
        {...rest}>
        <InputViewNew
          ref={setRef}
          value={inputValue}
          onChangeText={onTextChange}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType={returnKeyType}
          placeholder={inputPlaceholder}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          horizontalPadding={horizontalPadding}
          fontFamily={fontFamily}
          fontSize={fontSize}
          maxLength={maxLength}
        />
      </AnimatedInputContainer>
      {!!inputError && <ErrorLabel>{inputError}</ErrorLabel>}
    </>
  );
};

AMInput.defaultProps = {
  isFocused: false,
  isFilled: false,
  inputValue: '',
  onTextChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onSubmitEditing: () => {},
  returnKeyType: 'default',
  inputPlaceholder: '',
  autoFocus: false,
  setRef: null,
  inputError: null,
  topMargin: 16,
};

export default AMInput;
