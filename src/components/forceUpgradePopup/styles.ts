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
  width: scale(256),
  borderRadius: moderateScale(18.8),
  backgroundColor: theme.colors.base_50,
}))`
  align-items: center;
  justify-content: center;
  padding: ${scale(24)}px;
  ${layout}
  ${space}
  ${border}
`;

export const Container = styled.View.attrs<any>(() => ({
  alignItems: 'center',
}))``;

export const SubTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  text-align: center;
  line-height: 25px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubDesLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${14}px;
  text-align: center;
  margin-top: ${verticalScale(16)}px;
  line-height: 23px;
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
  line-height: 21.9px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const BottomTouchable = styled(AMButton).attrs<any>(props => ({
  height: verticalScale(36),
  backgroundColor: props.theme.colors.secoundary,
  borderRadius: scale(30),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  flex-direction: row;
  margin-top: ${verticalScale(24)}px;
  padding-horizontal: ${scale(32)}px;

  ${color}
  ${space}
  ${layout}
  ${border}
`;
