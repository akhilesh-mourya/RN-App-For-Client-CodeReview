import styled from 'styled-components/native';
import {SVGXMLPropsType, TextPropsType} from '../../../@types/styledComponents';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {border, space, layout, color, size} from 'styled-system';
import AMButton from './AMButton';
import {FontFamily} from 'custom_enums';
import {SvgXml} from 'react-native-svg';
import {
  BUTTON_NEXT_ARROW_ACTIVE,
  BUTTON_NEXT_ARROW_DISABLED,
} from '../../assets/svg';

export const BottomTouchable = styled(AMButton).attrs<any>(props => ({
  alignSelf: 'stretch',
  height: props.height ?? verticalScale(54),
  backgroundColor: props.isDisabled
    ? props.theme.colors.secoundary_new_disabled
    : props.bgColor,
  borderRadius: scale(30),
  marginTop: props.mTop,
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const BottomTouchableNew = styled(AMButton).attrs<any>(props => ({
  alignSelf: 'stretch',
  height: props.height ?? verticalScale(54),
  backgroundColor: props.isDisabled
    ? props.theme.colors.secoundary_new_disabled
    : props.bgColor,
  borderRadius: scale(30),
  marginTop: props.mTop,
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const BottomContentTouchableNew = styled(AMButton).attrs<any>(props => ({
  height: props.height ?? verticalScale(47),
  backgroundColor: props.isDisabled
    ? props.theme.colors.secoundary_new_disabled
    : props.bgColor,
  borderRadius: scale(30),
  marginTop: props.mTop,
  px: scale(props?.horizontalPadding || 56),
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-self: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const BottomContentTouchable = styled(AMButton).attrs<any>(props => ({
  height: props.height ?? verticalScale(47),
  backgroundColor: props.isDisabled
    ? props.theme.colors.secoundary_new_disabled
    : props.bgColor,
  borderRadius: scale(30),
  marginTop: props.mTop,
  px: scale(props?.horizontalPadding || 56),
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-self: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.isDisabled
    ? props.theme.colors.grey_disabled
    : props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${props => moderateScale(props?.labelSize || 20)}px;
  line-height: ${props => props?.labelLineHeight || 27}px;
  align-self: center;
  text-align: center;
  margin-left: 6px;
  margin-right: 6px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const ButtonLabelNew = styled.Text.attrs<TextPropsType>(props => ({
  color: props.isDisabled
    ? props.theme.colors.placeholder_new
    : props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${props => moderateScale(props?.labelSize || 20)}px;
  line-height: ${props => props?.labelLineHeight || 27}px;
  align-self: center;
  text-align: center;
  margin-left: 6px;
  margin-right: 6px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const ButtonNextArrowActive = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_ACTIVE,
  }),
)`
  margin-left: 6px;
  ${color}
  ${space}
  ${layout}
`;

export const ButtonNextArrowDisabled = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_DISABLED,
  }),
)`
  margin-left: 6px;
  ${color}
  ${space}
  ${layout}
`;
