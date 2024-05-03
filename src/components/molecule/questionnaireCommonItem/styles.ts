import {FontFamily} from 'custom_enums';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {border, color, layout, padding, size, space} from 'styled-system';
import styled from 'styled-components/native';
import AMButton from '../../button/AMButton';
import {SvgXml} from 'react-native-svg';
import {CHECK_ICON} from '../../../assets/svg/questionarrie';
import {Platform} from 'react-native';

export const SelectionContainer = styled(AMButton).attrs<ViewPropsType, any>(
  props => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: props?.isSelected
      ? props.theme.colors.optionActiveBorderColor
      : props.theme.colors.inputBorder,
    bg: props.theme.colors.questionOptionBgColor,
  }),
)`
  flex-direction: row;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(5)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  justify-content: space-between;
  align-items: center;
  ${color}
  ${size}
    ${space}
    ${layout}
    ${padding}
    ${border}
`;

export const OptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: 16px;
  line-height: 22.799px;
  letter-spacing: 0.32px;
  margin-left: ${scale(8)}px;
  align-self: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const CheckArrowIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CHECK_ICON,
}))`
  ${color}
  ${space}
    ${layout}
`;
