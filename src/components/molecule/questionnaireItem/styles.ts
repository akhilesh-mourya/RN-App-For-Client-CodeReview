import styled from 'styled-components/native';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {color, layout, padding, size, space} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import {CHECK_ICON} from '../../../assets/svg/questionarrie';
import {Platform} from 'react-native';

export const OptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  line-height: ${scale(22.799)}px;
  letter-spacing: ${0.32}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const SelectionContainer = styled.View.attrs<ViewPropsType, any>(
  props => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: props?.isSelected
      ? props.theme.colors.optionActiveBorderColor
      : props.theme.colors.grey_40,
    bg: props.theme.colors.questionOptionBgColor,
  }),
)`
  flex-direction: row;
  margin-top: ${verticalScale(5)}px;
  margin-bottom: ${verticalScale(5)}px;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(12)}px;
  justify-content: space-between;
  align-items: center;
  ${color}
  ${size}
    ${space}
    ${layout}
    ${padding}
`;

export const CheckArrowIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CHECK_ICON,
}))`
  ${color}
  ${space}
    ${layout}
`;

export const InputView = styled.TextInput.attrs<any>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'default',
  maxLength: 240,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder,
  fontSize: scale(16),
  paddingRight: scale(24),
  paddingVertical: 0,
}))`
  font-family: ${FontFamily.Regular};
  flex: 1;
  font-weight: 600;
  line-height: 22.799px;
  letter-spacing: 0.32px;
  ${color} ${size} ${layout} ${space};
`;
