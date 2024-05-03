import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../../@types/styledComponents';
import {SvgXml} from 'react-native-svg';
import {DOWN_ARROW_ICON} from '../../../../assets/svg';
import AMButton from '../../../../components/button/AMButton';
import {Platform} from 'react-native';

export const Container = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(24)}px;
`;

export const Label = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(props?.topMargin || 40),
  mb: verticalScale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${18}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const PickerContainer = styled(AMButton).attrs<ViewPropsType, any>(
  props => ({
    height: verticalScale(48),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: props?.isFilled
      ? props?.theme.colors.secoundary
      : props?.theme.colors.inputBorder,
    backgroundColor: props?.isFilled
      ? props?.theme.colors.black_10
      : props?.theme.colors.black_10,
    px: scale(24),
  }),
)`
  align-self: stretch;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const MatchMakingIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: DOWN_ARROW_ICON,
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const PickerPlaceholder = styled.Text.attrs<TextPropsType>(props => ({
  color: props?.isFocused
    ? props.theme.colors.white
    : props.theme.colors.placeholder,
  numberOfLines: 1,
  maxWidth: scale(227),
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  flex: 1;
  ${color}
  ${size}
  ${layout}
  ${space}
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

export const Flag = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  text-align: left;
  margin-right: 8px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
