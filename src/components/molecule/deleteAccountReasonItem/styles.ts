import styled from 'styled-components/native';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {border, color, layout, padding, size, space} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import {CHECK_ICON} from '../../../assets/svg/questionarrie';
import AMButton from '../../button/AMButton';
import {Platform} from 'react-native';

export const OptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: 16px;
  line-height: 22.799px;
  letter-spacing: 0.32px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const EmojiLabel = styled.Text.attrs<TextPropsType>(props => ({
  //color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${scale(16)}px;
  font-weight: 600;
  line-height: ${scale(22.799)}px;
  letter-spacing: 0.32px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const OtherImage = styled.Image.attrs(() => ({
  alignSelf: 'center',
}))``;

export const RowOptionContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
}))``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const SelectionContainer = styled(AMButton).attrs<ViewPropsType, any>(
  props => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: props?.isSelected
      ? props.theme.colors.secoundary
      : props.theme.colors.inputBorder,
    bg: props.theme.colors.black_10,
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
    ${border}
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
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder,
  fontSize: scale(16),
  paddingHorizontal: 0,
  paddingVertical: 0,
  height: 73,
  multiline: true,
  textAlignVertical: 'top',
}))`
  font-family: ${FontFamily.Medium};
  flex: 1;
  line-height: 22.799px;
  letter-spacing: 0.32px;
  ${color} ${size} ${layout} ${space};
`;
