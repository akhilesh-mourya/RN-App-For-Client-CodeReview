import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale} from 'react-native-size-matters/extend';
import {verticalScale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {Platform, StatusBar} from 'react-native';
import {
  ABOUT_PROFILE_BG_ICON,
  HEADER_BACK_ICON,
  INFO_ICON,
} from '../../assets/svg/chat';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import AMButton from '../button/AMButton';
import {AMORI_LOGO_SVG} from '../../assets/svg';
import {IS_IOS_PLATFORM} from '../../constants/appContants';

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  mt: StatusBar?.currentHeight > 24 ? verticalScale(16) : verticalScale(12),
  justifyContent: 'center',
  alignItems: 'center|left',
}))`
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const Block = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const BackIcon = styled(SvgXml).attrs<any>(() => ({
  xml: HEADER_BACK_ICON,
  ml: scale(16),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const HeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  height: 33,
}))`
  text-align: center;
  font-size: 24px;
  font-family: ${FontFamily.Bold};
  ${color}
  ${space}
  ${layout}
`;

export const AvatarImg = styled.Image.attrs(() => ({
  width: scale(40),
  height: scale(40),
  borderRadius: scale(20),
  mx: scale(16),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const StarIcon = styled(SvgXml).attrs<any>(() => ({
  xml: AMORI_LOGO_SVG,
  height: scale(20),
  width: scale(18.2),
}))`
  margin-left: ${scale(8)}px;
  align-self: center;
  margin-top: ${IS_IOS_PLATFORM ? 0 : 4}px;
  ${color}
  ${layout}
`;

export const Separator = styled.View.attrs<any>(props => ({
  mt: verticalScale(16),
  height: 0.8,
  bg: props.theme.colors.cardBorderNew,
}))`
  align-self: stretch;
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled(AMButton).attrs(() => ({}))`
  ${color}
  ${space}
  ${layout}
`;

export const CoachTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${scale(20)}px;
  line-height: 27px;
  font-family: ${FontFamily.Bold};
  ${color}
  ${space}
  ${layout}
`;

export const AboutTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-size: 13px;
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  margin-top: 2px;
  ${color}
  ${space}
  ${layout}
`;

export const AboutContainer = styled.View.attrs(() => ({}))``;

export const RowContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
}))``;

export const ProfileBGContainer = styled(AMButton).attrs<ViewPropsType>(() => ({
  alignSelf: 'center',
}))`
  margin-horizontal: ${scale(16)}px;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  ${layout}
`;

export const ProfileBGIcon = styled(SvgXml).attrs(() => ({
  xml: ABOUT_PROFILE_BG_ICON,
}))`
  margin-bottom: 8px;
`;

export const InfoIcon = styled(SvgXml).attrs(() => ({
  xml: INFO_ICON,
}))`
  position: absolute;
  right: 0px;
  bottom: 0px;
  ${color}
  ${space}
${layout}
`;

export const SmilyTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${22}px;
  font-family: ${FontFamily.Bold};
  line-height: ${Platform.OS === 'ios' ? 0 : 16}px;
  position: absolute;
  align-self: center;
  padding-top: ${Platform.OS === 'android' && 22 - 22 * 0.75 + 2}px;
  padding-bottom: ${Platform.OS === 'ios' && 8}px;
  ${color}
  ${space}
  ${layout}
`;
