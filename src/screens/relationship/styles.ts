import styled from 'styled-components/native';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {border, color, layout, size, space} from 'styled-system';
import theme from '../../theme';
import AMButton from '../../components/button/AMButton';
import {SvgXml} from 'react-native-svg';
import {
  BACK_ARROW_ICON,
  PLUS_ICON,
  SYNC_ICON,
  TRIPPLE_DOT_HORIZONTAL,
} from '../../assets/svg';
import {NativeModules} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import AMPrimaryButton from '../../components/button/AMPrimaryButton';
import i18next from 'i18next';
import {PrimaryButtonType} from '../../constants/enums';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import LottieView from 'lottie-react-native';
const {StatusBarManager} = NativeModules;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  mx: scale(24),
}))`
  ${space}
  ${layout}
`;

export const HeaderContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${verticalScale(StatusBarManager.HEIGHT + 16)}px;
`;

export const BackTouchable = styled(AMButton).attrs<ViewPropsType>(
  () => ({}),
)``;

export const BackArrow = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: BACK_ARROW_ICON,
}))`
  ${color}
  ${space}
    ${layout}
`;

export const DotsView = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: TRIPPLE_DOT_HORIZONTAL,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BodyContainer = styled.View.attrs<ViewPropsType>(() => ({
  mt: verticalScale(16),
}))`
  flex: 1;
  ${space}
  ${layout}
`;

export const ProfileView = styled.View.attrs<ViewPropsType>(() => ({
  height: scale(50),
  width: scale(50),
  borderRadius: scale(12.5),
  bg: theme.colors.relationship_profile_bg_color,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${space}
  ${layout}
    ${border}
    ${color}
`;

export const HeaderNameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(30)}px;
  line-height: ${scale(IS_IOS_PLATFORM ? 53 : 43)}px;
  ${color}
  ${size}
${layout}
${space}
`;

export const HeaderFullNameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(12),
  mb: verticalScale(10.1),
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

export const RowViewItemsCenter = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
  ${space}
  ${layout}
`;

export const UploadTypeView = styled.View.attrs<ViewPropsType>(() => ({
  height: verticalScale(22),
  bg: theme.colors.primary_light,
  borderRadius: scale(87),
}))`
  padding-horizontal: ${scale(8)}px;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const UploadTypeLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(13)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const SyncContainer = styled(AMButton).attrs<ViewPropsType>(() => ({
  height: verticalScale(22),
  bg: theme.colors.secoundary,
  borderRadius: scale(87),
}))`
  padding-horizontal: ${scale(8)}px;
  margin-left: ${scale(8)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const SyncIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: SYNC_ICON,
}))`
  margin-right: ${scale(4)}px;
  ${color}
  ${space}
    ${layout}
`;

export const PlusIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: PLUS_ICON,
  height: scale(18),
  width: scale(18),
}))`
  ${color}
  ${space}
    ${layout}
`;

export const SyncLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(12.5)}px;
  line-height: ${scale(IS_IOS_PLATFORM ? 18.2 : 15.2)}px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const LastSyncedLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(12),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(13)}px;
  align-self: center;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const AnalysisContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${verticalScale(24)}px;
`;

export const SubHeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(18)}px;
  margin-bottom: ${verticalScale(10)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SeeAllLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.primary,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const AnalysisDetailView = styled(AMButton).attrs<ViewPropsType | any>((props) => ({
  height: verticalScale(70),
  bg: props?.isInProcess ? theme.colors.black_10 : theme.colors.black_10,
  borderRadius: scale(10),
  borderWidth: 1,
  borderColor: props?.isInProcess ? theme.colors.border_light : theme.colors.border_light,
}))`
  padding-horizontal: ${scale(16)}px;
  align-items: center;
  flex-direction: row;
  align-self: stretch;
  margin-top: ${verticalScale(8)}px;
  ${color}
  ${space}
      ${layout}
      ${border}
`;

export const FlatListView = styled.FlatList.attrs<ViewPropsType>(() => ({
  contentContainerStyle: {paddingBottom: verticalScale(40)},
  showsVerticalScrollIndicator: false,
}))``;

export const AnalysisLeftView = styled.View.attrs<ViewPropsType>(
  () => ({}),
)`
  flex: 0.78;
  ${color}
  ${space}
      ${layout}
      ${border}
`;

export const AnalysisRightView = styled.View.attrs<ViewPropsType>(
  () => ({}),
)`
  flex: 0.22;
  padding-left: ${scale(10)}px;
  ${color}
  ${space}
      ${layout}
      ${border}
`;

export const AnalysisLabelHeader = styled.Text.attrs<TextPropsType | any>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 1,
  opacity: props?.isInProcess ? 0.5 : 1
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(15.5)}px;
  line-height: ${verticalScale(25)}px;
  ${color}
  ${size}
${layout}
${space}
`;

export const AnalysisLabelDec = styled.Text.attrs<TextPropsType | any>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 1,
  opacity: props?.isInProcess ? 0.5 : 1
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(13.5)}px;
  line-height: ${verticalScale(22)}px;
  ${color}
  ${size}
${layout}
${space}
`;

export const NewAnalysisButton = styled(AMPrimaryButton).attrs<TextPropsType>(
  props => ({
    buttonType: PrimaryButtonType.ContentWidthButton,
    label: i18next.t('New_Analysis'),
    isDisabled: false,
    height: 42,
    horizontalPadding: 32,
    labelSize: 16,
  }),
)`
  margin-bottom: ${verticalScale(42)}px;
  ${color}
  ${size}
${layout}
${space}
`;

export const HeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  align-self: flex-start;
  line-height: 30px;
  margin-top: 42px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

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
    behavior: IS_IOS_PLATFORM ? 'position' : null,
    keyboardVerticalOffset: 25,
    keyboardShouldPersistTaps: 'handled',
  }),
)`
  margin-bottom: ${verticalScale(IS_IOS_PLATFORM ? 42 : 20)}px;
  padding-horizontal: ${scale(32)}px;
`;

export const HeaderRowView = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  margin-top: ${verticalScale(StatusBarManager.HEIGHT + 16)}px;
  ${space}
  ${layout}
`;

export const HeaderTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  ml: scale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(24)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const LottieDotsAnim = styled(LottieView).attrs<any>(() => ({
  width: scale(25),
  height: verticalScale(25),
  autoPlay: true,
  loop: true,
  source: require('../../assets/lottie/analysisLoading.json'),
}))`
  align-self: flex-end
`;
