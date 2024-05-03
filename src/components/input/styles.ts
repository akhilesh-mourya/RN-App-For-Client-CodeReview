import styled from 'styled-components/native';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {space, layout, color, size} from 'styled-system';
import {verticalScale, scale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {moderateScale} from 'react-native-size-matters/extend';

export const InputContainer = styled.View.attrs<ViewPropsType, any>(props => ({
  height: verticalScale(props?.height || 48),
  borderWidth: 1,
  borderRadius: moderateScale(props.borderRadius || 10),
  mt: verticalScale(props?.topMargin || 37),
}))`
  align-self: stretch;
  flex-direction: row;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const InputView = styled.TextInput.attrs<any>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'default',
  maxLength: props.maxLength,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder,
  fontSize: scale(props.fontSize),
  px: scale(props?.horizontalPadding || 24),
  fontFamily: props.fontFamily,
}))`
  flex: 1;
  ${color} ${size} ${layout} ${space};
`;

export const InputViewNew = styled.TextInput.attrs<any>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'default',
  maxLength: props?.maxLength,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder_new,
  fontSize: scale(props.fontSize),
  px: scale(props?.horizontalPadding || 24),
  fontFamily: props.fontFamily,
  py: 0,
}))`
  flex: 1;
  ${color} ${size} ${layout} ${space};
`;

export const ErrorLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.error,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${13}px;
  line-height: 18px;
  text-align: left;
  margin-top: 8px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
