import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../../@types/styledComponents';
import theme from '../../../../theme';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {Dimensions, Platform} from 'react-native';
import {border, color, layout, padding, size, space} from 'styled-system';
import {
  BUTTON_NEXT_ARROW_ACTIVE,
  BUTTON_NEXT_ARROW_DISABLED,
  HEADER_BACK_ARROW_ICON,
} from '../../../../assets/svg';
import AMButton from '../../../../components/button/AMButton';
import {SvgXml} from 'react-native-svg';
import {FontFamily} from 'custom_enums';
import {CHECK_ICON} from '../../../../assets/svg/questionarrie';
import {IS_IOS_PLATFORM} from '../../../../constants/appContants';
import {
  CREATE_NEW_NEXT_ARROW_ICON,
  CREATE_USER_PLUS_ICON,
} from '../../../../assets/svg/home';

export const Container = styled.SafeAreaView.attrs<ViewPropsType>(() => ({
  backgroundColor: theme.colors.base_new,
}))`
  flex: 1;
  padding-horizontal: ${verticalScale(IS_IOS_PLATFORM ? 32 : 0)}px;
`;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))``;

export const MainSubContainer = styled.View.attrs<any>(() => ({
  flex: 1,
  width: Dimensions.get('window').width,
}))`
  padding-horizontal: 24px;
`;

export const SubContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex: 1;
`;

export const AnalysisContainer = styled.View.attrs<ViewPropsType>(() => ({
  px: scale(24),
}))`
  flex: 1;
  ${layout}
  ${space}
`;

export const NextArrowIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CREATE_NEW_NEXT_ARROW_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const PlusIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CREATE_USER_PLUS_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const AnalysisMainContainer = styled.ScrollView.attrs<ViewPropsType>(
  () => ({
    flex: 1,
    pt: verticalScale(37),
    mt: verticalScale(10),
    showsVerticalScrollIndicator: false,
  }),
)`
  ${space}
`;

export const RowCenterView = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex-direction: row;
  align-items: center;
`;

export const RowSpaceBetweenView = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View.attrs<any>(props => ({
  paddingTop: verticalScale(Platform.OS === 'android' ? 24 : 16),
  paddingHorizontal: scale(2),
  backgroundColor: props.theme.colors.base_new,
}))`
  padding-bottom: 10;
  margin-left: 24px;
  ${size}
  ${layout}
  ${space}
`;

export const BackButtonView = styled(AMButton).attrs<ViewPropsType>(props => ({
  height: 40,
  width: 40,
  borderRadius: scale(20),
  backgroundColor: props.theme.colors.backButtonBg,
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${space} ${border} ${color}
`;

export const BackIcon = styled(SvgXml).attrs<any>(() => ({
  xml: HEADER_BACK_ARROW_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const AnalysisHeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  ml: scale(16),
  mt: !IS_IOS_PLATFORM ? 16 : 60,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(24)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubHeader = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(18)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const Title = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  line-height: 29.814px;
  margin-top: ${verticalScale(40)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const UserSelectionFlatList = styled.FlatList.attrs<ViewPropsType>(
  () => ({
    contentContainerStyle: {paddingBottom: verticalScale(80)},
    showsVerticalScrollIndicator: false,
  }),
)``;

export const SubTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${scale(14)}px;
  font-weight: 500;
  line-height: 22.799px;
  letter-spacing: 0.28px;
  margin-vertical: ${verticalScale(8)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const CategoryContainer = styled.View.attrs<ViewPropsType, any>(() => ({
  mt: verticalScale(16),
}))`
  flex: 1;
  ${space}
  ${layout}
`;

export const SmallItemContainer = styled.View.attrs<ViewPropsType, any>(
  () => ({}),
)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const SelectionContainer = styled(AMButton).attrs<ViewPropsType, any>(
  props => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: props?.isSelected
      ? props.theme.colors.optionActiveBorderColor
      : props.theme.colors.inputBorder,
    bg: props.theme.colors.questionOptionBgColor,
  }),
)`
  flex-direction: row;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(5)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  justify-content: space-between;
  align-items: center;
  ${color}
  ${size}
  ${space}
  ${layout}
  ${padding}
  ${border}
`;

export const OptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(16)}px;
  line-height: ${scale(22.799)}px;
  letter-spacing: 0.32px;
  margin-left: ${scale(8)}px;
  align-self: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ButtonNextArrowActive = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_ACTIVE,
  }),
)`
  margin-top: 2px;
`;

export const ButtonNextArrowDisabled = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_DISABLED,
  }),
)`
  margin-top: 2px;
`;

export const ButtonContainer = styled.View.attrs<any>(() => ({}))`
  margin-bottom: ${verticalScale(46)}px;
`;

export const CheckArrowIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CHECK_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BottomView = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'flex-end',
  marginBottom: verticalScale(46),
}))``;

export const DynamicBlock = styled.View.attrs<ViewPropsType>(props => ({
  marginTop: verticalScale(props.mTop),
}))``;

export const ButtonContainerView = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: 'position',
    keyboardVerticalOffset: 125,
    keyboardShouldPersistTaps: 'handled',
  }),
)`
  margin-bottom: ${verticalScale(46)}px;
`;

export const NameInput = styled.TextInput.attrs<any>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'default',
  maxLength: 240,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder,
  fontSize: scale(16),
  paddingRight: scale(24),
  paddingVertical: 0,
}))`
  font-family: ${FontFamily.Regular};
  flex: 1;
  font-weight: 600;
  line-height: 22.799px;
  letter-spacing: 0.32px;
  ${color} ${size} ${layout} ${space};
`;

export const FreeAnalysisCountView = styled.View.attrs<ViewPropsType, any>(
  props => ({
    height: verticalScale(22),
    bg: props.theme.colors.primary_light,
    borderRadius: scale(87),
  }),
)`
  justify-content: center;
  align-items: center;
  padding-horizontal: ${scale(8)}px;
  ${color}
  ${size}
  ${space}
  ${layout}
  ${border}
`;

export const FreeCountLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.SemiBold};
  font-size: ${scale(13)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const AnalysisSmallItem = styled(AMButton).attrs<ViewPropsType, any>(
  props => ({
    height: Platform.OS === 'ios' ? 147 : 152,
    width: scale(160),
    bg: props.theme.colors.black_10,
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: props.theme.colors.inputBorder,
    p: 16,
    opacity: props?.isForSelect ? 1.0 : 0.5,
    disabled: !props?.isForSelect,
  }),
)`
  ${color}
  ${size}
  ${space}
  ${layout}
  ${border}
`;

export const AnalysisFullItem = styled(AMButton).attrs<ViewPropsType, any>(
  props => ({
    height: verticalScale(106),
    bg: props.theme.colors.black_10,
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: props.theme.colors.inputBorder,
    p: scale(16),
    opacity: 0.5,
    disabled: true,
  }),
)`
  justify-content: center;
  align-items: center;
  padding-horizontal: ${scale(8)}px;
  align-self: stretch;
  margin-vertical: ${verticalScale(8)}px;
  ${color}
  ${size}
  ${space}
  ${layout}
  ${border}
`;

export const ItemHeader = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  align-self: flex-start;
  line-height: 22px;
  letter-spacing: 0.06px;
  ${padding}
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ComingSoonTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(18)}px;
  align-self: flex-start;
  line-height: 25px;
  margin-top: ${verticalScale(32)}px;
  margin-bottom: ${verticalScale(8)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ItemDes = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: 14,
  numberOfLines: 4,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${14}px;
  align-self: flex-start;
  line-height: 19px;
  letter-spacing: 0.06px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ScrollBottomView = styled.View.attrs<ViewPropsType>(() => ({}))`
  height: 80px;
`;

export const RowContainer = styled.View.attrs(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}))``;

export const ProfileBG = styled.View.attrs<ViewPropsType>(() => ({
  alignItems: 'center',
  width: 40,
  height: 40,
  backgroundColor: theme.colors.base_50,
  borderRadius: moderateScale(10),
  marginRight: scale(8),
  justifyContent: 'center',
}))`
  ${layout}
`;

export const PagerView = styled(Swiper).attrs(() => ({
  loop: false,
  showsButtons: false,
  key: 3,
  showsPagination: false,
  scrollEnabled: false,
  removeClippedSubviews: false,
  style: {
    flex: 1,
  },
}))``;

export const CommonFlatList = styled.FlatList.attrs<ViewPropsType>(() => ({
  contentContainerStyle: {paddingBottom: verticalScale(80)},
  showsVerticalScrollIndicator: false,
}))``;
