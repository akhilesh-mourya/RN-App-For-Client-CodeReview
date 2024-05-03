import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import theme from '../../theme';
import {SVGXMLPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {CROSS_ICON} from '../../assets/svg/chat';
import {border, color, layout, size, space} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import AMButton from '../button/AMButton';

export const ModalContainer = styled(Modal).attrs(() => ({
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  backdropColor: theme.colors.black,
  backdropOpacity: 0.6,
  animationInTiming: 600,
  style: {
    margin: 0,
  },
}))``;

export const MainContainer = styled.View.attrs(() => ({}))`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TransparentContainer = styled.View.attrs(() => ({}))`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const LoaderContainer = styled.View.attrs<ViewPropsType>(() => ({
  width: scale(94),
  height: verticalScale(94),
}))`
  border-radius: ${moderateScale(18.8)}px;
  padding-horizontal: ${scale(23)}px;
  padding-vertical: ${verticalScale(23)}px;
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: center;
`;

export const LottieContainer = styled(LottieView).attrs<any>(() => ({
  width: scale(48),
  height: verticalScale(48),
  autoPlay: true,
  loop: true,
  source: require('../../assets/lottie/loader.json'),
}))``;

export const CloseTouchable = styled(AMButton).attrs<ViewPropsType>(() => ({
  bg: theme.colors.black_10,
  height: scale(40),
  width: scale(40),
  borderRadius: scale(20),
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 32;
  right: 8;
  ${size}
  ${layout}
${space}
${color}
${border}
`;

export const CloseIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: CROSS_ICON,
}))`
  ${color}
  ${space}
    ${layout}
`;
