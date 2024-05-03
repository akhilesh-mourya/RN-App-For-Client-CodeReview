import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {SvgXml} from 'react-native-svg';
import {
  CROSS_ICON,
  WHATSAPP_UPLOAD_STEP_ONE,
  WHATSAPP_UPLOAD_STEP_TWO,
} from '../../../assets/svg/chat';
import AMPrimaryButton from '../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../constants/enums';
import i18next from 'i18next';
import {UPLOAD_BUTTON_ICON} from '../../../assets/svg/home';
import {
  RNCodeForClientReview_LOGO_BIG,
  RNCodeForClientReview_LOGO_SVG,
  BUTTON_NEXT_ARROW_ACTIVE,
  SHARE_UOLOAD_ICON,
} from '../../../assets/svg';
import {
  IMESSAGE_SYNC_HEADER_IMAGE,
  MATCHMAKING_SUCCESS_SCREEN_IMAGE,
} from '../../../constants/imageConstants';
import AMButton from '../../../components/button/AMButton';
import {NativeModules, Platform} from 'react-native';
import {
  IMESSAGE_NOT_SYNCED_ICON,
  IMESSAGE_SYNC_LOADING_ICON,
} from '../../../assets/svg/upload';
import LinearGradient from 'react-native-linear-gradient';
import {MATCHMAKING_SUCCESS_ICON} from '../../../assets/svg/main';
const {StatusBarManager} = NativeModules;

export const ScrollContainer = styled.ScrollView.attrs<any>(() => ({
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const Container = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(16)}px;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const SyncLoadingContainer = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(32)}px;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs(() => ({}))`
  flex: 1;
  background-color: ${props => props.theme.colors.base};
`;

export const WhatsappUploadImage = styled.Image.attrs<ViewPropsType>(props => ({
  mt: verticalScale(props?.topM),
}))`
  align-self: center;
  ${color} ${layout} ${space};
`;

export const IMessageRNCodeForClientReviewLogoContainer = styled.View.attrs<any>(props => ({
  mt: verticalScale(40),
  height: scale(120),
  width: scale(120),
  borderRadius: scale(21),
  borderWidth: 1,
  borderColor: props?.theme?.colors?.inputBorder,
  bg: props?.theme?.colors?.base_new,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${size}
  ${layout}
  ${space}
  ${color}
  ${border}
`;

export const RNCodeForClientReviewLogoImage = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: RNCodeForClientReview_LOGO_SVG,
  height: verticalScale(75.5),
  width: scale(67.5),
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const RNCodeForClientReviewLogo = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: RNCodeForClientReview_LOGO_BIG,
  mt: verticalScale(40),
  mb: verticalScale(32),
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const WhatsappUploadOne = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: WHATSAPP_UPLOAD_STEP_ONE,
  mt: verticalScale(40),
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const WhatsappUploadTwo = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: WHATSAPP_UPLOAD_STEP_TWO,
}))`
  align-self: center;
  ${color}
  ${space}
    ${layout}
`;

export const HeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(16),
}))`
  font-family: ${FontFamily.ExtraBold};
  font-size: ${26}px;
  line-height: ${verticalScale(37)}px;
  padding-horizontal: ${verticalScale(16)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const StepDetailRowView = styled.View.attrs<any>(() => ({
  mt: verticalScale(32),
}))`
  flex-direction: row;
  padding-horizontal: ${verticalScale(16)}px;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const NumberView = styled.View.attrs<any>(props => ({
  height: scale(24),
  width: scale(24),
  borderRadius: scale(12),
  bg: props?.theme?.colors?.secoundary,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${size}
  ${layout}
  ${space}
  ${color}
  ${border}
`;

export const NumberLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${scale(14)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const StepDesLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  ml: scale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(24)}px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const StepSubDesLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  ml: scale(16),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(24)}px;
  margin-top: ${verticalScale(8)}px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const StepOneSubDesLabelInner = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
    ml: scale(16),
  }),
)`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(13)}px;
  line-height: ${verticalScale(24)}px;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const StepOneSubDesLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  ml: scale(16),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(24)}px;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const Divider = styled.View.attrs<any>(props => ({
  height: scale(1),
  bg: props?.theme?.colors?.grey_50,
}))`
  align-self: stretch;
  margin-horizontal: ${verticalScale(16)}px;
  margin-vertical: ${verticalScale(32)}px;
  ${size}
  ${layout}
${space}
${color}
${border}
`;

export const UploadConvBottomTouchable = styled(AMPrimaryButton).attrs<any>(
  () => ({
    buttonType: PrimaryButtonType.FullButton,
    isDisabled: false,
    label: i18next.t('Upload_Whatsapp_File'),
    mb: verticalScale(92),
    mx: scale(32),
    height: verticalScale(44),
    labelSize: 16,
    mt: verticalScale(48),
  }),
)`
  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const UploadButtonIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: UPLOAD_BUTTON_ICON,
}))`
  margin-right: ${scale(2)}px;
  ${color}
  ${space}
    ${layout}
`;

export const MacShareContainer = styled.View.attrs<any>(props => ({
  height: verticalScale(48),
  bg: props?.theme?.colors?.black_10,
  borderWidth: scale(0.8),
  borderRadius: scale(8),
  borderColor: props?.theme?.colors?.secoundary,
  mt: verticalScale(16),
  px: scale(7.9),
}))`
  flex-direction: row;
  align-self: stretch;
  margin-horizontal: ${verticalScale(16)}px;
  align-items: center;
  justify-content: space-between;
  ${size}
  ${layout}
${space}
${color}
${border}
`;

export const MacLinkLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const ShareButton = styled(AMButton).attrs<any>(props => ({
  height: verticalScale(32),
  width: verticalScale(81),
  bg: props?.theme?.colors?.secoundary,
  borderRadius: scale(8),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${size}
  ${layout}
${space}
${color}
${border}
`;

export const CancelUploadButton = styled(AMPrimaryButton).attrs<any>(props => ({
  bg: props?.theme?.colors?.transparent,
}))`
  margin-top: ${verticalScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${size}
  ${layout}
${space}
${color}
${border}
`;

export const ShareUploadIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: SHARE_UOLOAD_ICON,
}))`
  margin-right: ${scale(4)}px;
  ${color}
  ${space}
    ${layout}
`;

export const ShareLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.SemiBold};
  font-size: ${scale(14)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const LabelContainer = styled.View.attrs<TextPropsType>(props => ({}))`
  flex-direction: column;
  flex: 1;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const ScanQRButton = styled(AMPrimaryButton).attrs<any>(() => ({
  buttonType: PrimaryButtonType.FullButton,
  label: i18next.t('Scan_QR_Code'),
  isDisabled: false,
  my: verticalScale(64),
  mx: 32,
  labelSize: 16,
  height: verticalScale(44),
}))`
  ${color}
  ${size}
    ${layout}
    ${space}
`;

// IMeageNotSyncedStyles

export const IContainer = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${scale(32)}px;
  ${size}
  ${layout}
  ${space}
  ${color}
`;

export const HeaderConatiner = styled.View.attrs<any>(() => ({
  marginTop: verticalScale(StatusBarManager.HEIGHT + 16),
}))`
  flex-direction: row;
  justify-content: flex-end;
  align-self: stretch;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const CrossConatinerView = styled(AMButton).attrs<ViewPropsType>(
  props => ({
    height: 40,
    width: 40,
    borderRadius: scale(20),
    backgroundColor: props.theme.colors.backButtonBg,
  }),
)`
  align-items: center;
  justify-content: center;
  ${layout} ${space} ${border} ${color}
`;

export const CrossIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CROSS_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const IHeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(19.5)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const IHeaderSuccessLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKRegular};
  font-size: ${24}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const INonSyncedHeaderLabel = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
    mt: verticalScale(32),
  }),
)`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(19.5)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const IHeaderDes = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  my: verticalScale(16),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  align-self: center;
  text-align: center;
  margin-horizontal: ${scale(8)}px;
  line-height: ${scale(26)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ILinkDes = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.secoundary,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  align-self: center;
  text-align: center;
  margin-horizontal: ${scale(8)}px;
  line-height: ${scale(26)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ISyncedHeaderDes = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  align-self: center;
  text-align: center;
  margin-top: ${scale(14)}px;
  line-height: ${26}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const IMessageNotSyncedIcon = styled.Image.attrs<ViewPropsType>(
  props => ({
    source: IMESSAGE_SYNC_HEADER_IMAGE,
    marginTop: verticalScale(74),
    width: scale(213),
    height: scale(213),
  }),
)`
  align-self: center;
  margin-right: ${scale(20)}px;
  ${color} ${layout} ${space};
`;

export const ISBottomView = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'flex-end',
  marginTop: verticalScale(55),
  marginBottom: verticalScale(68),
}))``;

export const ButtonNextArrowActive = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_ACTIVE,
  }),
)`
  margin-top: 2px;
`;

export const FullItemsCenterView = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex: 1;
  align-items: center;
  margin-top: ${verticalScale(76)}px;
`;

export const NameGradeientContainer: any = styled(LinearGradient).attrs(
  props => ({
    colors: ['#F19FB4', '#EE7B95'],
    useAngle: true,
    angle: 180,
    borderRadius: verticalScale(36),
    height: verticalScale(40),
    width: verticalScale(40),
    start: {x: 0, y: 0},
    end: {x: 1, y: 0.7},
    locations: [0, 0.7],
  }),
)`
  align-items: center;
  justify-content: center;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const ISyncedNameInitial = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ISyncedNameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(24)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const IMessageSyncLoadingIcon = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: IMESSAGE_SYNC_LOADING_ICON,
    mt: verticalScale(90),
  }),
)`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const IMessageSubDes = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  my: verticalScale(16),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  align-self: center;
  text-align: center;
  line-height: ${26}px;
  letter-spacing: 0.32px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const MacNotConnectedLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.primary,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const Touchable = styled(AMButton).attrs<any>(props => ({}))``;

export const WhatsappSyncedSuccessImage = styled.Image.attrs<any>(() => ({
  source: MATCHMAKING_SUCCESS_SCREEN_IMAGE,
  mt: verticalScale(StatusBarManager.HEIGHT + 65),
  mb: verticalScale(28),
}))`
  align-self: center;
  ${layout}
  ${space}
`;

export const IMessageSyncedSuccessImage = styled.Image.attrs<any>(() => ({
  source: MATCHMAKING_SUCCESS_SCREEN_IMAGE,
  mt: verticalScale(10),
  mb: verticalScale(28),
}))`
  align-self: center;
  ${layout}
  ${space}
`;

export const WhatsappSuccessTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  align-self: center;
  text-align: center;
  line-height: 29.814px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const IMessageSuccessTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  align-self: center;
  text-align: center;
  line-height: 29.814px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const SyncedStatusContainer = styled.View.attrs<ViewPropsType>(
  props => ({
    mt: verticalScale(props.mTop ?? 16),
    height: verticalScale(68),
    borderRadius: scale(10),
    borderColor: props?.theme?.colors?.inputBorder,
    bg: props?.theme?.colors?.black_10,
    p: scale(16),
    borderWidth: 1,
  }),
)`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const NameInitialContainer = styled.View.attrs<ViewPropsType>(props => ({
  height: scale(40),
  width: scale(40),
  borderRadius: scale(10),
  bg: props?.theme?.colors?.relationship_profile_bg_color,
}))`
  align-items: center;
  justify-content: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const NameInitial = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(24)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ColumnContainer = styled.View.attrs<ViewPropsType>(props => ({
  ml: scale(16),
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 1,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(25)}px;
  margin-right: ${scale(40)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SyncedStatusLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${12}px;
  line-height: ${19.2}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SoundsGoogBtn = styled(AMPrimaryButton).attrs<any>(() => ({
  buttonType: PrimaryButtonType.FullButton,
  label: i18next.t('Sounds_Good'),
  isDisabled: false,
  mb: verticalScale(74),
  mx: 32,
  labelSize: 20,
  height: 55,
}))`
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const IHeaderConatiner = styled.View.attrs<any>(() => ({
  mt: verticalScale(36),
}))`
  align-self: stretch;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const Line = styled.View.attrs<any>(props => ({
  height: 0.5,
  bg: props?.theme?.colors?.secoundary,
}))`
  align-self: stretch;
  margin-top: -3px;
  margin-horizontal: 10px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const EmptyView = styled(AMButton)`
  align-self: center;
`;

export const EmptyIMessageView = styled(AMButton)`
  height: ${verticalScale(50)}px;
  align-self: stretch;
`;
