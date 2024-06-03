import styled from 'styled-components/native';
import {
  AMORI_LOGO,
  ENABLE_NOTIFICATION,
  ONBOARDING_GRADIENT_BACKGROUND,
} from '../../constants/imageConstants';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {color, size, layout, space, border} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import PhoneInput from 'react-native-phone-input';
import {SvgXml} from 'react-native-svg';
import CountryPicker from 'react-native-country-picker-modal';
import {CodeField} from 'react-native-confirmation-code-field';
import {
  AMORI_LOGO_SVG,
  BUTTON_NEXT_ARROW_ACTIVE,
  BUTTON_NEXT_ARROW_DISABLED,
  DROPDOWN_ARROW_DOWN,
} from '../../assets/svg';
import {
  IS_IOS_PLATFORM,
  OTP_INPUT_CELL_COUNT,
} from '../../constants/appContants';
import {Platform, NativeModules} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ENABLE_NOTIFICATION_IMG} from '../../assets/svg/onboarding';
import AMPrimaryButton, {
  AMPrimaryButtonNew,
} from '../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../constants/enums';
import i18next from 'i18next';
import AMButton from '../../components/button/AMButton';
const {StatusBarManager} = NativeModules;

export const Container = styled.View.attrs<any>(props => ({
  backgroundColor: props.theme.colors.base,
}))`
  flex: 1;
  ${layout}
  ${space}
`;

export const GradientContainer = styled.Image.attrs<any>(() => ({
  source: ONBOARDING_GRADIENT_BACKGROUND,
  resizeMode: 'stretch',
}))`
  position: absolute;
  bottom: 60px;
  right: 0px;
  left: 0px;
  width: ${scale(375)}px;
  height: ${verticalScale(462)}px;
  ${layout}
  ${space}
`;

export const TopMargin = styled.View.attrs<any>(() => ({
  marginTop: !IS_IOS_PLATFORM ? 56 : 100,
}))``;

export const SubContainer = styled.TouchableOpacity.attrs<any>(() => ({
  activeOpacity: 1,
}))`
  flex: 1;
`;

export const RawFullFlexView = styled.View`
  flex: 1;
  padding-horizontal: ${scale(32)}px;
`;

export const RawPaddingView = styled.View`
  padding-horizontal: ${scale(32)}px;
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'always',
  scrollEnabled: false,
}))``;

export const ButtonContainerView = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: Platform.OS === 'ios' ? 'position' : null,
    keyboardVerticalOffset: 125,
    keyboardShouldPersistTaps: 'handled',
  }),
)`
  margin-bottom: ${verticalScale(Platform.OS === 'ios' ? 82 : 60)}px;
  padding-horizontal: ${scale(32)}px;
`;

export const HeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  align-self: flex-start;
  line-height: 29.8px;
  margin-top: 42px;
  ${color}
  ${size}
  ${layout}
  ${space}
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

export const Description = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  margin-top: ${verticalScale(7)}px;
  font-family: ${FontFamily.Medium};
  font-size: ${14}px;
  line-height: 23px;
  align-self: flex-start;
  text-align: left;
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

export const DescriptionBold = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  margin-top: ${verticalScale(5)}px;
  font-family: ${FontFamily.Bold};
  font-size: ${14}px;
  line-height: 23px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const NumberInput = styled(PhoneInput).attrs<any>(props => ({
  initialCountry: 'us',
  initialValue: '',
  autoFormat: true,
  pickerButtonColor: 'red',
  offset: 3,
  textProps: {
    placeholder: 'Enter a phone number...',
  },
  textStyle: {
    color: 'white',
  },
  borderWidth: 1,
  borderColor: props.theme.colors.grey_40,
  backgroundColor: props.theme.colors.grey_20,
  borderRadius: 10,
  p: 20,
  py: 15,
  mt: verticalScale(35),
}))`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const DropDownArrow = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: DROPDOWN_ARROW_DOWN,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const InputContainer = styled.View.attrs<ViewPropsType, any>(props => ({
  height: verticalScale(48),
  borderWidth: 1,
  borderRadius: 10,
  pl: scale(24),
  mt: verticalScale(props?.topMargin || 37),
}))`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const CountryPickerView = styled(CountryPicker).attrs<any>(props => ({
  countryCode: props?.countryCode || 'US',
  withFilter: true,
  withFlag: true,
  withCallingCodeButton: true,
  withAlphaFilter: false,
  withCallingCode: true,
  modalProps: {
    transparent: true,
    translucent: true,
    statusBarTranslucent: true,
    coverScreen: false,
  },
}))`
  ${color}
  ${space}
  ${layout}
`;

export const InputView = styled.TextInput.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'phone-pad',
  maxLength: 20,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.white,
  height: verticalScale(46),
  pr: scale(24),
  autoComplete: 'tel-national',
  textContentType: 'telephoneNumber',
}))`
  flex: 1;
  padding-left: 5px;
  ${color} ${size} ${layout} ${space};
`;

export const NameInputView = styled.TextInput.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'default',
  maxLength: 12,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder,
  fontSize: scale(16),
}))`
  flex: 1;
  ${color} ${size} ${layout} ${space};
`;

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const DropdownChild = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${10}px;
  ${color}
  ${space}
  ${layout}
`;

export const InputDivider = styled.View.attrs<ViewPropsType>(props => ({
  height: verticalScale(23),
  mx: scale(10),
  backgroundColor: props.theme.colors.black_50,
}))`
  width: 1px;
  ${color}
  ${space}
  ${layout}
`;

export const ErrorLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.error,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${13}px;
  line-height: 18px;
  text-align: left;
  margin-top: 8px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const OtpVerifyInput = styled(CodeField).attrs<any>(() => ({
  cellCount: OTP_INPUT_CELL_COUNT,
  rootStyle: {marginTop: 40, marginBottom: 27},
  keyboardType: 'number-pad',
  textContentType: 'oneTimeCode',
  autoFocus: true,
}))`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const OtpCellContainer = styled.View.attrs<ViewPropsType>(props => ({
  width: scale(55),
  height: scale(55),
  backgroundColor: props.theme.colors.black_10_new,
  borderRadius: scale(16),
  borderWidth: 1,
}))`
  align-self: center;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const OtpText = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${21}px;
  line-height: ${scale(52)}px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ResendContainer = styled.View.attrs<ViewPropsType>(props => ({
  width: props?.isTimeLeft ? scale(138) : scale(98),
}))`
  align-self: center;
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
`;

export const ResendLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.primary_new,
  textDecorationLine: 'underline',
  //textDecorationStyle: 'solid',
  //textDecorationColor: props.theme.colors.primary_new,
}))`
  font-family: ${FontFamily.Bold};
  text-decoration-line: underline;
  font-size: ${14}px;
  line-height: 18px;
  text-align: center;
  text-decoration-line: underline;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ResendTimeRemainingLabel = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.grey_10_new,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    //textDecorationColor: props.theme.colors.grey_10_new,
  }),
)`
  font-family: ${FontFamily.Bold};
  text-decoration-line: underline;
  text-decoration-thickness: 30px;
  font-size: ${14}px;
  line-height: 18px;
  text-align: center;
  text-decoration-line: underline;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const LineView = styled.View.attrs<ViewPropsType>(props => ({
  width: scale(88),
  height: scale(0.2),
  backgroundColor: props.theme.colors.primary,
}))`
  margin-top: -1px;
  margin-left: 1px;
  ${color}
  ${space}
  ${layout}
`;

export const LineViewTimeRemaining = styled.View.attrs<ViewPropsType>(
  props => ({
    height: scale(2),
    backgroundColor: props.theme.colors.grey_10,
  }),
)`
  margin-top: -1px;
  align-self: stretch;
  ${color}
  ${space}
  ${layout}
`;

export const PagerContainer = styled.View.attrs<any>(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}))``;

export const ViewPagerContainer = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'center',
  marginTop: verticalScale(48),
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

export const EnableNotifHeaderTitle = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
    mt: verticalScale(100),
  }),
)`
  font-family: ${FontFamily.FKRegular};
  font-size: ${26}px;
  align-self: center;
  line-height: 36.4px;
  letter-spacing: -0.548px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const EnableNotifDescription = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
  }),
)`
  margin-top: ${verticalScale(24)}px;
  font-family: ${FontFamily.Medium};
  font-size: ${18}px;
  line-height: 25px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const EnableNotificationSvgImage = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: ENABLE_NOTIFICATION_IMG,
    mt: verticalScale(65),
  }),
)`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const EnableNotificationImage = styled.Image.attrs(() => ({
  source: ENABLE_NOTIFICATION,
  mt: verticalScale(82),
}))`
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const ButtonNextArrowActive = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_ACTIVE,
  }),
)``;

export const ButtonNextArrowDisabled = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_DISABLED,
  }),
)``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))`
  top: 0px;
  right: 0px;
  position: absolute;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const WaitlistSubContainer = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  margin-horizontal: ${scale(24)}px;
`;

export const AmoriLogo = styled.Image.attrs<any>(() => ({
  source: AMORI_LOGO,
  resizeMode: 'stretch',
}))`
  ${layout}
  ${space}
`;

export const AmoriSVGLogo = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: AMORI_LOGO_SVG,
  marginTop: verticalScale(StatusBarManager.HEIGHT + 92),
}))`
  align-self: center;
`;

export const WaitlistTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(64),
}))`
  font-family: ${FontFamily.FKRegular};
  font-size: ${26}px;
  align-self: center;
  line-height: 36px;
  letter-spacing: -0.548px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const WaitlistDescription = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(24),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${18}px;
  align-self: center;
  line-height: 28px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const FullFlexView = styled.View``;

export const MatchMakingBottomView = styled.View.attrs<ViewPropsType>(
  props => ({
    backgroundColor: props.theme.colors.black_10_new,
    marginTop: verticalScale(107.5),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: props.theme.colors.cardBorderNew,
    p: scale(15),
  }),
)`
  ${color}
  ${space}
  ${layout}
`;

export const WaitlistDescriptionHint = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
  }),
)`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  align-self: center;
  line-height: 25px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ReferFriendButton = styled(AMPrimaryButtonNew).attrs<any>(() => ({
  buttonType: PrimaryButtonType.ContentWidthButton,
  label: i18next.t('Invite_Friends'),
  isDisabled: false,
  mTop: verticalScale(16),
  horizontalPadding: 24,
  height: verticalScale(45),
  labelSize: 18,
  fontFamily: FontFamily.Bold,
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const EnterReferralFriendLabel = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.secoundary_new,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  }),
)`
  font-family: ${FontFamily.Bold};
  text-decoration-line: underline;
  font-size: ${14}px;
  align-self: center;
  text-align: center;
  line-height: 22.4px;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const EmptyView = styled(AMButton)`
  align-self: center;
`;

export const DecorationLine = styled.View.attrs<ViewPropsType>(props => ({
  backgroundColor: props.theme.colors.primary,
  height: scale(1),
}))`
  align-self: stretch;
  margin-top: -2px;
  ${color}
  ${space}
  ${layout}
`;
