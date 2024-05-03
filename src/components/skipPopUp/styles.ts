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

export const ModalContainer = styled(Modal).attrs(() => ({
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  backdropOpacity: 0,
  hideModalContentWhileAnimating: true,
  useNativeDriver: false,
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

export const MainContainer = styled.View.attrs(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const PopUpImageBg = styled.View.attrs<any>(() => ({
  width: 256,
  borderRadius: moderateScale(10),
  borderWidth: 0,
  borderColor: theme.colors.white_20,
  backgroundColor: theme.colors.base_50_new,
}))`
  align-items: center;
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

export const TouchableOpacity = styled(AMButton).attrs(() => ({}))`
  margin-top: ${verticalScale(16)}px;
  margin-right: ${24}px;
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
  margin-horizontal: ${24}px;
  line-height: 25px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubTitleBoldLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.ExtraBold};
  font-size: ${16}px;
  text-align: center;
  line-height: 25px;
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
  line-height: 22px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const BottomTouchable = styled(AMButton).attrs<any>(props => ({
  height: verticalScale(36),
  backgroundColor: props.isDisabled
    ? props.theme.colors.secoundary_new_disabled
    : props.theme.colors.secoundary_new,
  borderRadius: scale(30),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  flex-direction: row;
  margin-vertical: ${verticalScale(24)}px;
  padding-horizontal: ${scale(32)}px;

  ${color}
  ${space}
  ${layout}
  ${border}
`;
