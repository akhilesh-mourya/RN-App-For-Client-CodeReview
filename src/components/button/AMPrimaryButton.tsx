import React from 'react';
import {
  BottomTouchable,
  BottomContentTouchable,
  ButtonLabel,
  BottomTouchableNew,
  BottomContentTouchableNew,
  ButtonLabelNew,
} from './AMPrimaryButtonStyles';
import {PrimaryButtonType} from '../../constants/enums';
import theme from '../../theme';

interface AMPrimaryFullButtonProps {
  buttonType?: string;
  label?: string;
  onPress?: Function;
  isDisabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  mTop?: number;
  horizontalPadding?: number;
  bgColor?: string;
}

const AMPrimaryButton: React.FC<AMPrimaryFullButtonProps> = ({
  buttonType,
  label,
  onPress = () => {},
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  mTop,
  horizontalPadding = 56,
  bgColor = theme.colors.secoundary_new,
  ...rest
}) => {
  var labelSize = 16;
  var height = 50;
  const getButtonContainer = () => {
    let ButtonContainerView;
    switch (buttonType) {
      case PrimaryButtonType.FullButton:
        ButtonContainerView = BottomTouchable;
        break;
      case PrimaryButtonType.ContentWidthButton:
        ButtonContainerView = BottomContentTouchable;
        height = 44;
        labelSize = 14;
        break;
      default:
        ButtonContainerView = BottomTouchable;
        break;
    }
    return ButtonContainerView;
  };
  let ButtonContainer = getButtonContainer();
  return (
    <ButtonContainer
      bgColor={bgColor}
      onPress={onPress}
      isDisabled={isDisabled}
      disabled={isDisabled}
      mTop={mTop}
      horizontalPadding={horizontalPadding}
      height={height}
      {...rest}>
      {leftIcon}
      <ButtonLabel isDisabled={isDisabled} labelSize={labelSize}>
        {label}
      </ButtonLabel>
      {rightIcon}
    </ButtonContainer>
  );
};

export const AMPrimaryButtonNew: React.FC<AMPrimaryFullButtonProps> = ({
  buttonType,
  label,
  onPress = () => {},
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  mTop,
  horizontalPadding = 56,
  bgColor = theme.colors.secoundary_new,
  ...rest
}) => {
  var height = 50;
  var labelSize = 16;
  const getButtonContainer = () => {
    let ButtonContainerView;
    switch (buttonType) {
      case PrimaryButtonType.FullButton:
        ButtonContainerView = BottomTouchableNew;
        break;
      case PrimaryButtonType.ContentWidthButton:
        ButtonContainerView = BottomContentTouchableNew;
        height = 32;
        labelSize = 14;
        break;
      default:
        ButtonContainerView = BottomTouchableNew;
        break;
    }
    return ButtonContainerView;
  };
  let ButtonContainer = getButtonContainer();
  return (
    <ButtonContainer
      bgColor={bgColor}
      onPress={onPress}
      isDisabled={isDisabled}
      disabled={isDisabled}
      mTop={mTop}
      horizontalPadding={horizontalPadding}
      height={height}
      {...rest}>
      {leftIcon}
      <ButtonLabelNew isDisabled={isDisabled} labelSize={labelSize}>
        {label}
      </ButtonLabelNew>
      {rightIcon}
    </ButtonContainer>
  );
};

AMPrimaryButton.defaultProps = {
  buttonType: PrimaryButtonType.FullButton,
  label: '',
  isDisabled: true,
  leftIcon: null,
  rightIcon: null,
};

export default AMPrimaryButton;
