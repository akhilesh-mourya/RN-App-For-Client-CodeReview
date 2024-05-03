import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters/extend';
import {scale} from 'react-native-size-matters/extend';
import Modal from 'react-native-modal';
import theme from '../../theme';
import {verticalScale} from 'react-native-size-matters/extend';
import {border, color, layout, size, space} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import {CROSS_SVG_ICON} from '../../assets/svg';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import AMButton from '../button/AMButton';
import {Platform} from 'react-native';

export const ModalContainer = styled(Modal).attrs<any>(() => ({
  animationIn: 'slideInUp',
  animationOut: 'slideOutDown',
  backdropColor: theme.colors.black,
  backdropOpacity: 0.5,
  animationInTiming: 400,
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
  width: scale(256),
  borderRadius: moderateScale(18.8),
  backgroundColor: theme.colors.base_50_new,
}))`
  justify-content: center;
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
  margin-top: ${verticalScale(16)}px;
  margin-right: ${scale(24)}px;
`;

export const SubTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  text-align: center;
  margin-top: ${verticalScale(8)}px;
  margin-horizontal: ${scale(18)}px;
  line-height: 25px;
  align-self: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubTitleBoldLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${16}px;
  text-align: center;
  font-weight: 800;
  margin-top: ${verticalScale(16)}px;
  margin-horizontal: ${scale(18)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
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

export const BottomTouchable = styled(AMButton).attrs<any>(props => ({
  height: verticalScale(38),
  backgroundColor: props.isDisabled
    ? props.theme.colors.secoundary_new_disabled
    : props.theme.colors.secoundary_new,
  borderRadius: scale(30),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  flex-direction: row;
  margin-top: ${verticalScale(32)}px;
  margin-bottom: ${verticalScale(24)}px;
  padding-horizontal: ${scale(32)}px;

  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const InputContainer = styled.View`
  margin-horizontal: ${scale(24)};
  align-self: stretch;
`;
