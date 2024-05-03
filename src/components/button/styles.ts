import styled from 'styled-components/native';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {border, space, layout, color, size} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import {HEADER_BACK_ARROW_ICON} from '../../assets/svg';
import {FontFamily} from 'custom_enums';
import {IS_IOS_PLATFORM} from '../../constants/appContants';

export const Button = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {top: 15, left: 15, bottom: 15, right: 15},
  alignItems: 'center',
  justifyContent: 'center',
}))`
  ${layout}
  ${space}
`;

export const Container = styled.View.attrs<ViewPropsType>(() => ({
  mt: verticalScale(!IS_IOS_PLATFORM ? 16 : 62),
}))`
  ${layout}
  ${space}
`;

export const BackButtonView = styled.View.attrs<ViewPropsType>(props => ({
  height: 40,
  width: 40,
  borderRadius: scale(20),
  backgroundColor: props.isForRegistration
    ? props.theme.colors.base_50
    : props.theme.colors.backButtonBg,
  alignItems: 'center',
  justifyContent: 'center',
  ml: scale(32),
}))`
  ${layout} ${space} ${border}
`;

export const BackIcon = styled(SvgXml).attrs<any>(() => ({
  xml: HEADER_BACK_ARROW_ICON,
}))`
  padding: 20px;
  padding-left: 0px;
  ${color}
  ${space}
  ${layout}
`;

export const SkipLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mr: scale(32),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${21}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
