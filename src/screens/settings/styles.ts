import styled from 'styled-components/native';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {border, color, layout, padding, size, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {SvgXml} from 'react-native-svg';
import {NEXT_ARROW_ICON} from '../../assets/svg/questionarrie';
import theme from '../../theme';
import {Dimensions, Platform} from 'react-native';
import {
  APP_LOGO_FOR_WELCOME,
  DELETE_ACCOUNT_ICON,
  REDIRECT_SVG_ICON,
  SELECTED_TOGGLE_ICON,
  UNSELECTED_TOGGLE_ICON,
} from '../../assets/svg/settings';
import CustomSwitch from 'react-native-custom-switch';
import Carousel from 'react-native-reanimated-carousel';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import AMButton from '../../components/button/AMButton';
import {AMORI_LOGO_SVG} from '../../assets/svg';

export const TitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${16}px;
  text-align: left;
  line-height: 21.9px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs<ViewPropsType>(
  () => ({
    backgroundColor: theme.colors.base_new,
  }),
)`
  flex: 1;
  ${color}
`;

export const VerticalBlock = styled.View.attrs<ViewPropsType>(() => ({
  height: verticalScale(24),
}))``;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))``;

export const WelcomeContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  justifyContent: 'space-between',
}))``;

export const WelcomeSubContainer = styled.View.attrs(() => ({}))``;

export const WelcomeTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKRegular};
  font-size: ${40}px;
  line-height: 44px;
  text-align: center;
  letter-spacing: 0.8px;
  margin-top: ${verticalScale(45)}px;
  padding-horizontal: ${scale(12)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const WelcomeDes = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${16}px;
  line-height: 24px;
  text-align: center;
  margin-top: ${verticalScale(22)}px;
  margin-bottom: ${verticalScale(64)}px;
  padding-horizontal: ${scale(42)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const SignInSubTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${12}px;
  line-height: 16px;
  text-align: center;
  font-weight: 400;
  margin-vertical: ${verticalScale(32)}px;
  padding-horizontal: ${scale(32)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const UnderlineTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${12}px;
  line-height: 16px;
  text-align: center;
  font-weight: 400;
  text-decoration-line: underline;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const AmoriTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.UnboundLight};
  font-size: ${36.22}px;
  text-align: left;
  font-weight: 300;
  margin-left: ${scale(12)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const DeleteAccountLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.error,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${16}px;
  text-align: left;
  margin-left: ${scale(10)}px;
  line-height: 21.9px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SeparatorView = styled.View.attrs<ViewPropsType>(() => ({
  width: Dimensions.get('screen').width - 30,
  backgroundColor: theme.colors.separatorBgColor,
  height: 0.9,
  marginLeft: scale(24),
}))``;

export const VersionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${13}px;
  font-weight: 600;
  line-height: 21px;
  margin-top: ${verticalScale(10)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const LogoRowContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  marginLeft: scale(32),
  alignItems: 'center',
  marginTop: verticalScale(Platform.OS === 'android' ? 88 : 102),
}))``;

export const StarIcon = styled(SvgXml).attrs<any>(() => ({
  xml: AMORI_LOGO_SVG,
  width: scale(32),
  height: scale(35.5),
}))`
  ${color}
  ${layout}
`;

export const AppLogoForWelcome = styled(SvgXml).attrs<any>(() => ({
  xml: APP_LOGO_FOR_WELCOME,
}))`
  ${color}
  ${layout}
`;

export const SelectedToggleIcon = styled(SvgXml).attrs<any>(() => ({
  xml: SELECTED_TOGGLE_ICON,
}))`
  ${color}
  ${layout}
`;

export const UnSelectedToggleIcon = styled(SvgXml).attrs<any>(() => ({
  xml: UNSELECTED_TOGGLE_ICON,
}))`
  ${color}
  ${layout}
`;

export const RowContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: scale(24),
  paddingVertical: verticalScale(16),
}))``;

export const NextIcon = styled(SvgXml).attrs<any>(() => ({
  xml: NEXT_ARROW_ICON,
}))`
  ${color}
  ${space}
    ${layout}
`;

export const RedirectIcon = styled(SvgXml).attrs<any>(() => ({
  xml: REDIRECT_SVG_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const DeleteIcon = styled(SvgXml).attrs<any>(() => ({
  xml: DELETE_ACCOUNT_ICON,
}))`
  ${color}
  ${space}
    ${layout}
`;

export const DeleteContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  marginTop: verticalScale(48),
  marginLeft: scale(24),
  alignItems: 'center',
}))``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const VersionContainer = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'flex-end',
  alignItems: 'center',
  flex: 1,
  marginBottom: verticalScale(16),
}))``;

export const NotificationSwitch = styled(CustomSwitch).attrs(() => ({
  buttonWidth: scale(25),
  buttonPadding: 2,
  onSwitchBackgroundColor: theme.colors.primary,
  switchBackgroundColor: theme.colors.grey_40,
  buttonColor: theme.colors.white,
}))``;

export const RawPaddingView = styled.View`
  padding-horizontal: ${scale(32)}px;
`;

export const CenterHeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(32),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  align-self: center;
  line-height: 30px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const CoachHeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(32),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(24)}px;
  align-self: center;
  line-height: 30px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const CenterDescription = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  margin-top: ${verticalScale(16)}px;
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  line-height: 23px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubContainer = styled.TouchableOpacity.attrs<any>(() => ({
  activeOpacity: 1,
}))`
  padding-top: ${verticalScale(IS_IOS_PLATFORM ? 30 : 0)}px;
  flex: 1;
`;

export const ViewPagerContainer = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'center',
  marginTop: verticalScale(56),
  height: 417,
}))``;

export const PagerView = styled(Carousel).attrs(() => ({
  loop: false,
  autoPlay: false,
  pagingEnabled: true,
  width: scale(290),
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const carousalStyle = {
  justifyContent: 'center',
  width: '100%',
};

export const PersonalityCardContainer = styled.View`
  ${layout}
  ${space}
  ${border}
`;

export const PagerContainer = styled.View.attrs<any>(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}))``;

export const ButtonView = styled.View.attrs<ViewPropsType>(props => ({
  justifyContent: 'flex-end',
  marginBottom: verticalScale(46),
  // marginTop: verticalScale(82),
  paddingHorizontal: props.ph,
}))``;

export const SigninLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: 18px;
  text-align: center;
  line-height: 20px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const StayTouchable = styled(AMButton).attrs(() => ({}))`
  margin-top: ${verticalScale(16)}px;
  padding-horizontal: ${scale(32)}px;
  padding-vertical: ${verticalScale(16)}px;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const AmoriLogo = styled(SvgXml).attrs<any>(() => ({
  xml: AMORI_LOGO_SVG,
  height: scale(87),
  width: scale(79),
  mt: verticalScale(109),
}))`
  align-self: center;
  ${color}
  ${layout}
  ${space}
`;
