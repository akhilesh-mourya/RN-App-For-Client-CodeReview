import theme from '../../theme';
import Modal from 'react-native-modal';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {border, color, layout, size, space} from 'styled-system';
import {FontFamily} from 'custom_enums';
import styled from 'styled-components/native';
import AMButton from '../button/AMButton';

export const ModalContainer = styled(Modal).attrs(() => ({
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  backdropColor: theme.colors.black,
  backdropOpacity: 0.5,
  animationInTiming: 200,
  animationOutTiming: 100,
  style: {
    margin: 0,
  },
  hideModalContentWhileAnimating: true,
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
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(24)}px;
  ${layout}
  ${space}
  ${border}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${16}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${16}px;
  text-align: center;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const TitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${18}px;
  text-align: center;
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
  margin-top: ${verticalScale(16)}px;
  padding-horizontal: ${scale(32)}px;

  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const CancelTouchable = styled(AMButton).attrs(() => ({}))`
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const CancelLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${16}px;
  text-align: center;
  line-height: 25px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;
