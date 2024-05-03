import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import theme from '../../theme';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {Dimensions, Platform} from 'react-native';
import {FontFamily} from 'custom_enums';
import {color, layout, size, space} from 'styled-system';
import {SvgXml} from 'react-native-svg';
import {CROSS_SVG_ICON} from '../../assets/svg';
import {SEARCH_ICON} from '../../assets/svg/questionarrie';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const ModalContainer = styled(Modal).attrs(() => ({
  backdropColor: theme.colors.black,
  backdropOpacity: 0.5,
  margin: 0,
}))`
  position: absolute;
  left: 0;
  right: 0;
  avoid-keyboard: false;
`;

export const TransparentContainer = styled.View.attrs<ViewPropsType>(
  () => ({}),
)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  backgroundColor: theme.colors.base_50_new,
  borderTopLeftRadius: moderateScale(20),
  borderTopRightRadius: moderateScale(20),
  marginTop: 51,
  paddingBottom: 30,
  height: Dimensions.get('screen').height - 50,
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

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))`
  margin-top: ${verticalScale(16)}px;
  align-self: flex-end;
  position: absolute;
  right: 0;
`;

export const RowContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: scale(24),
}))``;

export const SearchInput = styled.TextInput.attrs(props => ({
  color: props.theme.colors.white,
  placeholderTextColor: theme.colors.placeholder,
  placeholder: 'Search',
  flex: 1,
  height: 43,
}))`
  font-size: ${scale(14)}px;
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  line-height: 22.799px;
  letter-spacing: 0.28px;
  ${color}
  ${layout}
`;

export const SearchView = styled.View.attrs<ViewPropsType>(props => ({
  borderRadius: moderateScale(32),
  marginHorizontal: scale(24),
  marginTop: verticalScale(25),
  backgroundColor: theme.colors.black_10,
  borderColor: props?.isFocused
    ? theme.colors.secoundary
    : theme.colors.inputBorder,
  borderWidth: 1,
  alignItems: 'center',
  paddingHorizontal: scale(24),
  flexDirection: 'row',
}))``;

export const SearchIcon = styled(SvgXml).attrs(() => ({
  xml: SEARCH_ICON,
  size: 20,
  color: theme.colors.white,
}))`
  margin-right: ${scale(7)}px;
  ${layout}
  ${space}
`;

export const SeparatorView = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  backgroundColor: theme.colors.separatorBgColor,
  height: 1,
  marginLeft: scale(30),
}))``;

export const GenderFlatList = styled.FlatList.attrs(() => ({
  marginTop: verticalScale(24),
  keyboardShouldPersistTaps: 'always',
}))``;

export const KeyboardAwareView = styled(KeyboardAwareScrollView).attrs<any>(
  () => ({
    keyboardShouldPersistTaps: 'handled',
  }),
)``;
