import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {
  ONBOARDING_COPILOT_STEP_IMAGE,
  WAITLIST_SVG_ICON,
} from '../../../assets/svg/onboarding';
import {SvgXml} from 'react-native-svg';
import {NativeModules, Platform} from 'react-native';
import AMPrimaryButton from '../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../constants/enums';
import i18next from 'i18next';
import {MATCHMAKING_TAB_FOCUSED} from '../../../assets/svg/bottomTab';
import {
  MATCHMAKING_IS_LIVE_ICON,
  MATCHMAKING_SUCCESS_ICON,
} from '../../../assets/svg/main';
import AMButton from '../../../components/button/AMButton';
import {
  MATCHMAKING_SCREEN_IMAGE,
  MATCHMAKING_SUCCESS_SCREEN_IMAGE,
} from '../../../constants/imageConstants';
import {RNCodeForClientReview_LOGO_SVG} from '../../../assets/svg';
const {StatusBarManager} = NativeModules;

export const ScrollContainer = styled.ScrollView.attrs<any>(() => ({
  showsVerticalScrollIndicator: false,
  bounces: false,
  scrollEnabled: false,
}))`
  flex: 1;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const Container = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(32)}px;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const SubContainer = styled.ScrollView.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(32)}px;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const RelationShipContainer = styled.View.attrs<any>(props => ({
  height: verticalScale(106),
  backgroundColor: props.theme.colors.secoundary,
  borderRadius: scale(10),
  mt: verticalScale(24),
}))`
  align-self: stretch;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs(() => ({}))`
  flex: 1;
  background-color: ${props => props.theme.colors.base};
`;

export const CopilotStepImage = styled.Image.attrs<any>(() => ({
  source: MATCHMAKING_SCREEN_IMAGE,
  my: verticalScale(80),
}))`
  align-self: center;
  ${layout}
  ${space}
`;

export const CopilotStepMatchesImage = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: ONBOARDING_COPILOT_STEP_IMAGE,
    height: scale(220),
    width: scale(220),
  }),
)`
  align-self: center;
  margin-top: ${verticalScale(55)}px;
  ${color}
  ${space}
  ${layout}
`;

export const MatchMakingSuccessImage = styled.Image.attrs<any>(() => ({
  source: MATCHMAKING_SUCCESS_SCREEN_IMAGE,
  mt: verticalScale(50),
  mb: verticalScale(30),
}))`
  align-self: center;
  ${layout}
  ${space}
`;

export const MatchMakingLiveImage = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: MATCHMAKING_IS_LIVE_ICON,
  }),
)`
  align-self: center;
  margin-top: ${verticalScale(46)}px;
  ${color}
  ${space}
  ${layout}
`;

export const HeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(70 + StatusBarManager.HEIGHT),
}))`
  font-family: ${FontFamily.FKRegular};
  font-size: ${scale(30)}px;
  align-self: center;
  line-height: ${scale(39)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const HeaderLabelTextCenter = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
    mt: verticalScale(70 + StatusBarManager.HEIGHT),
  }),
)`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(26)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const MatchesHeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(8 + StatusBarManager.HEIGHT),
}))`
  font-family: ${FontFamily.Bold};
  font-size: 28px;
  line-height: 44px;
  align-self: flex-start;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const MatchesMainDescription = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
  }),
)`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  line-height: ${verticalScale(31)}px;
  margin-vertical: ${verticalScale(8)}px;
  align-self: center;
  text-align: center;

  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const Description = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(15),
  mb: verticalScale(10),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${18}px;
  line-height: ${verticalScale(28)}px;
  align-self: center;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DescriptionMatches = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  line-height: ${verticalScale(25)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const JoinWaitListButton = styled(AMPrimaryButton).attrs<any>(() => ({
  buttonType: PrimaryButtonType.ContentWidthButton,
  label: i18next.t('Join_Waitlist'),
  isDisabled: false,
  mTop: verticalScale(40),
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const GetStartedButton = styled(AMPrimaryButton).attrs<any>(() => ({
  buttonType: PrimaryButtonType.ContentWidthButton,
  label: i18next.t('Get_Started'),
  isDisabled: false,
  mTop: verticalScale(40),
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ReferFriendButton = styled(AMPrimaryButton).attrs<any>(() => ({
  buttonType: PrimaryButtonType.ContentWidthButton,
  label: i18next.t('Invite_Friends'),
  isDisabled: false,
  mTop: verticalScale(45),
  labelLineHeight: 27,
  height: 47,
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ChatWithCoachButton = styled(AMButton).attrs<any>(props => ({
  height: verticalScale(42),
  borderRadius: scale(24),
  borderWidth: scale(1),
  borderColor: props.theme.colors.white,
  mt: verticalScale(40),
  px: scale(24),
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: row;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const CoachImg = styled.Image.attrs(() => ({
  width: scale(20),
  height: scale(20),
  borderRadius: scale(10),
}))`
  margin-right: ${scale(8)}px;
  ${color}
  ${space}
  ${layout}
`;

export const ChatWithBtnLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${scale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const MatchMakingIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: RNCodeForClientReview_LOGO_SVG,
  height: scale(80),
  width: scale(72),
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const JoinWaitlistHeaderLabel = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
    mt: verticalScale(24),
  }),
)`
  font-family: ${FontFamily.Bold};
  font-size: 20px;
  align-self: center;
  line-height: 31px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const JoinWaitlistDescription = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
    mt: verticalScale(16),
  }),
)`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  line-height: ${verticalScale(25)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const JoinWaitListFormButton = styled(AMPrimaryButton).attrs<any>(
  () => ({
    buttonType: PrimaryButtonType.FullButton,
    label: i18next.t('Join_Waitlist'),
    mTop: verticalScale(93),
  }),
)`
  margin-bottom: ${verticalScale(24)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const MatchesListView = styled.FlatList.attrs<ViewPropsType>(() => ({
  contentContainerStyle: {paddingBottom: verticalScale(30)},
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
  margin-top: ${verticalScale(16)}px;
`;
