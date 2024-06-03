import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {
  AMORI_PRO_SVG_ICON,
  LOGOUT_ICON,
  MESSAGE_ICON,
  PROFILE_DEFAULT_ICON,
  PROFILE_ICON,
  SETTING_ICON,
} from '../../../assets/svg/profile';
import {NEXT_ARROW_ICON} from '../../../assets/svg/questionarrie';
import {Dimensions, Platform} from 'react-native';
import theme from '../../../theme';

export const Container = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(24)}px;
`;

export const TopContainer = styled.View.attrs<any>(() => ({}))`
  align-items: center;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const AvatarImg = styled.Image.attrs(() => ({
  width: scale(44),
  height: scale(44),
  borderRadius: scale(22),
  mt: verticalScale(91),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ProfileContainer = styled.View.attrs<ViewPropsType>(() => ({
  borderRadius: 40,
  width: 80,
  height: 80,
  backgroundColor: theme.colors.relationship_profile_bg_color,
  marginTop: verticalScale(Platform.OS === 'android' ? 32 : 76),
  alignItems: 'center',
  justifyContent: 'center',
}))`
  ${layout}
  ${space}
`;

export const ImageLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  line-height: 60px;
  font-size: 44px;

  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(16),
}))`
  font-family: ${FontFamily.ExtraBold};
  font-size: ${moderateScale(24, 0.5)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs(() => ({}))`
  flex: 1;
  background-color: ${props => props.theme.colors.base};
`;

export const RowView = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  padding-right: ${scale(40)}px;
  padding-bottom: ${scale(40)}px;
`;

export const AmoriProContainer: any = styled(LinearGradient).attrs(props => ({
  colors: [props.theme.colors.primary, props.theme.colors.primary_20],
  useAngle: true,
  angle: 160,
  borderRadius: moderateScale(10),
  mt: verticalScale(24),
  start: {x: 0, y: 0},
  end: {x: 1, y: 0.7},
  locations: [0, 0.7],
  px: scale(16),
  py: scale(16),
  marginTop: verticalScale(24),
  marginBottom: verticalScale(40),
  flexDirection: 'row',
  alignItems: 'center',
}))`
  align-self: stretch;
  flex-direction: row;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const AmoriProIcon = styled(SvgXml).attrs(() => ({
  xml: AMORI_PRO_SVG_ICON,
}))``;

export const AmoriProSubContainer = styled.View.attrs<ViewPropsType>(() => ({
  marginLeft: scale(16),
}))``;

export const AmoriProLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.ExtraBold};
  font-size: ${moderateScale(16)}px;
  line-height: 20px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const AmoriProSubTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${moderateScale(13)}px;
  font-weight: 500;
  line-height: 20px;
  margin-top: ${verticalScale(2)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const VerticalBlock = styled.View.attrs(() => ({
  marginTop: verticalScale(21),
}))``;

export const SectionContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  paddingVertical: verticalScale(16),
  alignItems: 'center',
}))``;

export const ProfileIcon = styled(SvgXml).attrs(() => ({
  xml: PROFILE_ICON,
  size: 20,
}))``;

export const SettingIcon = styled(SvgXml).attrs(() => ({
  xml: SETTING_ICON,
}))``;

export const FeedbackIcon = styled(SvgXml).attrs(() => ({
  xml: MESSAGE_ICON,
}))`
  margin-top: ${verticalScale(3)}px;
`;

export const DefaultUserIcon = styled(SvgXml).attrs(() => ({
  xml: PROFILE_DEFAULT_ICON,
}))``;

export const LogoutIcon = styled(SvgXml).attrs(() => ({
  xml: LOGOUT_ICON,
}))``;

export const NextIcon = styled(SvgXml).attrs(() => ({
  xml: NEXT_ARROW_ICON,
}))``;

export const SeparatorView = styled.View.attrs<ViewPropsType>(() => ({
  width: Dimensions.get('screen').width - 24,
  backgroundColor: theme.colors.separatorBgColor,
  height: 0.9,
}))``;

export const SectionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: 16px;
  line-height: 25.6px;
  flex: 1;
  margin-left: ${verticalScale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const LogoutLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.grey_101,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${moderateScale(20)}px;
  font-weight: 500;
  margin-left: ${verticalScale(9)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const LogoutContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: verticalScale(24),
}))``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;
