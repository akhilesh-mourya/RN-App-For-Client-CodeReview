import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import theme from '../../theme';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {border, color, layout, size, space} from 'styled-system';
import {CROSS_SVG_ICON} from '../../assets/svg';
import {SvgXml} from 'react-native-svg';
import {FontFamily} from 'custom_enums';
import AMButton from '../button/AMButton';
import {Platform} from 'react-native';

export const ModalContainer = styled(Modal).attrs(() => ({
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  backdropColor: theme.colors.black,
  backdropOpacity: 0.5,
  animationInTiming: 200,
  style: {
    margin: 0,
  },
}))``;

export const TransparentContainer = styled.View.attrs<ViewPropsType>(
  () => ({}),
)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const MainContainer = styled.View.attrs(() => ({}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const PopUpImageBg = styled.View.attrs<any>(() => ({
  width: 270,
  borderRadius: moderateScale(18.8),
  borderWidth: 0,
  borderColor: theme.colors.white_20,
  backgroundColor: theme.colors.base_50_new,
}))`
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(24)}px;
  ${layout}
  ${space}
    ${border}
`;

export const Container = styled.View.attrs<any>(() => ({
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
}))``;

export const CrossIcon = styled(SvgXml).attrs(() => ({
  xml: CROSS_SVG_ICON,
  size: 20,
  color: theme.colors.white,
}))``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))`
  align-self: flex-end;
`;

export const TitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  alignSelf: 'center',
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  line-height: 25px;
  font-size: 16px;
  text-align: center;
  margin-top: ${verticalScale(8)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const MessageLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  alignSelf: 'center',
}))`
  font-family: ${FontFamily.Regular};
  font-weight: 500;
  font-size: ${15}px;
  text-align: center;
  line-height: 23px;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const ButtonTouchable = styled(AMButton).attrs<any>(props => ({
  //height: verticalScale(36),
  backgroundColor: props.theme.colors.secoundary_new,
  borderRadius: scale(30),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  flex-direction: row;
  margin-top: ${verticalScale(24)}px;
  padding-horizontal: ${scale(32)}px;
  padding-vertical: ${verticalScale(8)}px;
  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const ErrorButtonTouchable = styled(AMButton).attrs<any>(props => ({
  //height: verticalScale(36),
  backgroundColor: props.theme.colors.error,
  borderRadius: scale(30),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  flex-direction: row;
  margin-top: ${verticalScale(24)}px;
  padding-horizontal: ${scale(32)}px;
  padding-vertical: ${verticalScale(8)}px;
  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const OkLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${16}px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const Touchable = styled(AMButton).attrs<any>(props => ({}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const Cancelabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${scale(16)}px;
  line-height: ${scale(25)}px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
