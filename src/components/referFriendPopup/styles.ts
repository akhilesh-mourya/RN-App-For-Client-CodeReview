import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import theme from '../../theme';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {NativeModules, Platform} from 'react-native';
import {FontFamily} from 'custom_enums';
import {border, color, layout, size, space} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import {CROSS_SVG_ICON, SEARCH_CLEAR_ICON} from '../../assets/svg';
import {SEARCH_ICON} from '../../assets/svg/questionarrie';
import i18next from 'i18next';
import AMButton from '../button/AMButton';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {StatusBarManager} = NativeModules;

export const ModalContainer = styled(Modal).attrs(() => ({
  backdropColor: theme.colors.black,
  backdropOpacity: 0.5,
  margin: 0,
}))`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  avoid-keyboard: false;
`;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  backgroundColor: theme.colors.base_50_new,
  borderTopLeftRadius: moderateScale(20),
  borderTopRightRadius: moderateScale(20),
  marginTop: verticalScale(StatusBarManager.HEIGHT),
  paddingBottom: 30,
  flex: 1,
}))``;

export const HeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.ExtraBold};
  font-size: ${22}px;
  text-align: center;
  margin-top: ${verticalScale(25)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const CrossIcon = styled(SvgXml).attrs(() => ({
  xml: CROSS_SVG_ICON,
  size: 20,
  color: theme.colors.white,
}))``;

export const TouchableOpacity = styled(AMButton).attrs(() => ({
  hitslop: {top: 30, bottom: 30, left: 30, right: 30},
}))`
  margin-top: ${verticalScale(16)}px;
  align-self: flex-end;
  position: absolute;
  right: 24;
  top: 16;
  z-index: 1000;
`;

export const RowContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: scale(24),
}))``;

export const SearchInput = styled.TextInput.attrs(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  placeholderTextColor: theme.colors.placeholder_new,
  placeholder: i18next.t('Search_Contact'),
  flex: 1,
  height: 43,
}))`
  font-size: ${scale(14)}px;
  font-weight: 600;
  font-family: ${FontFamily.Medium};
  letter-spacing: 0.28px;
  ${color}
  ${layout}
`;

export const SearchView = styled.View.attrs<ViewPropsType>(props => ({
  borderRadius: moderateScale(32),
  marginHorizontal: scale(24),
  marginTop: verticalScale(25),
  backgroundColor: theme.colors.black_10_new,
  borderColor: props?.isFocused
    ? theme.colors.secoundary_new
    : theme.colors.placeholder_new,
  borderWidth: 1,
  alignItems: 'center',
  paddingHorizontal: scale(24),
  flexDirection: 'row',
}))`
  align-items: center;
`;

export const SearchIcon = styled(SvgXml).attrs(() => ({
  xml: SEARCH_ICON,
  size: 20,
  color: theme.colors.white,
}))`
  margin-right: ${scale(7)}px;
  margin-top: ${scale(1)}px;
  ${layout}
  ${space}
`;

export const SearchClearIcon = styled(SvgXml).attrs(() => ({
  xml: SEARCH_CLEAR_ICON,
  size: 20,
  color: theme.colors.white,
}))`
  margin-left: ${scale(7)}px;
  margin-top: ${scale(1)}px;
  ${layout}
  ${space}
`;

export const SeparatorView = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  backgroundColor: theme.colors.separatorBgColor_new,
  height: 1,
  marginLeft: scale(30),
}))``;

export const ContactsFlatList = styled.FlatList.attrs<ViewPropsType>(() => ({
  mt: verticalScale(24),
  removeClippedSubviews: false,
  windowSize: 3000,
  keyboardShouldPersistTaps: 'always',
}))`
  ${space}
`;

export const NoPermissionContainer = styled.View.attrs<ViewPropsType>(() => ({
  px: scale(48),
  mt: verticalScale(181),
}))`
  align-items: center;
  justify-content: center;
  ${layout}
  ${space}
`;

export const NoPerHeader = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  text-align: center;
  line-height: ${verticalScale(31)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const NoPerDescription = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(16)}px;
  text-align: center;
  line-height: ${verticalScale(25)}px;
  margin-top: ${verticalScale(8)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const OpenSettingButton = styled(AMButton).attrs<ViewPropsType>(
  props => ({
    width: scale(171),
    height: verticalScale(42),
    borderRadius: scale(87),
    bg: props.theme.colors.secoundary_new,
    mt: verticalScale(50),
  }),
)`
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const OpenSettingButtonLbl = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${moderateScale(16.5)}px;
  text-align: center;
  line-height: ${moderateScale(23)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const ScrollContainer = styled.ScrollView.attrs<ViewPropsType>(
  props => ({
    flex: 1,
  }),
)`
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const KeyboardAwareView = styled(KeyboardAwareScrollView).attrs<any>(
  () => ({
    keyboardShouldPersistTaps: 'handled',
  }),
)``;
