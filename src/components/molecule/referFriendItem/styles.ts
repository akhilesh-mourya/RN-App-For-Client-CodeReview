import {FontFamily} from 'custom_enums';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import AMButton from '../../button/AMButton';
import {Platform} from 'react-native';
import { IS_IOS_PLATFORM } from '../../../constants/appContants';

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  paddingVertical: verticalScale(13),
  marginLeft: scale(30),
}))``;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 1,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(25)}px;
  margin-right: ${scale(5)}px;
  flex: 1;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const TouchableOpacity = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  padding-right: ${scale(24)}px;
`;

export const InviteBtnLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: 16px;
  line-height: ${IS_IOS_PLATFORM ? 25 : 20}px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ProfileImg = styled.Image.attrs(() => ({
  width: scale(36),
  height: scale(36),
  borderRadius: scale(18),
}))`
  margin-right: ${scale(14)}px;
  ${color}
  ${space}
  ${layout}
`;

export const NameInitialsView = styled.View.attrs<ViewPropsType>(props => ({
  width: scale(36),
  height: scale(36),
  borderRadius: scale(18),
  bg: props.theme.colors.grey_30,
}))`
  margin-right: ${scale(14)}px;
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
`;

export const NameInitialsLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const InviteButton = styled(AMButton).attrs<ViewPropsType | any>(
  props => ({
    width: 80,
    height: 29,
    borderRadius: 60,
    bg: props?.isDarkBackground
      ? props.theme.colors.secoundary_new
      : props.theme.colors.secoundary,
  }),
)`
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;
