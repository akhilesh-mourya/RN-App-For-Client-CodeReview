import styled from 'styled-components/native';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {border, color, layout, size, space} from 'styled-system';
import theme from '../../theme';
import AMButton from '../../components/button/AMButton';
import {
  BUTTON_NEXT_ARROW_ACTIVE,
  BUTTON_NEXT_ARROW_DISABLED,
  HEADER_BACK_ARROW_ICON,
} from '../../assets/svg';
import {SvgXml} from 'react-native-svg';
import {Platform} from 'react-native';
import {ACCOUNT_DELETE_SUCCESS_IMAGE} from '../../constants/imageConstants';

export const Container = styled.SafeAreaView.attrs<ViewPropsType>(() => ({
  backgroundColor: theme.colors.base_new,
}))`
  flex: 1;
  ${color}
`;

export const ScrollViewContainer = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))``;

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: Platform.OS === 'ios' ? 'position' : null,
    keyboardVerticalOffset: 24,
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {flex: 1},
  }),
)`
  padding-horizontal: ${verticalScale(32)}px;
  flex: 1;
`;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  paddingHorizontal: scale(32),
}))``;

export const TitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${19.5}px;
  text-align: center;
  line-height: 29.814px;
  margin-top: ${Platform.OS === 'android'
    ? verticalScale(78)
    : verticalScale(88)}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const InstructionsLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  text-align: center;
  line-height: 26px;
  letter-spacing: 0.32px;
  margin-top: ${verticalScale(24)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const CancelLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  text-align: center;
  margin-top: ${verticalScale(30)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DeleteImage = styled.Image.attrs(() => ({
  alignSelf: 'center',
}))`
  margin-top: ${verticalScale(32)}px;
`;

export const ConfirmDeleteButton = styled(AMButton).attrs(() => ({
  marginTop: verticalScale(60),
}))``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const HeaderContainer = styled.View.attrs<any>(props => ({
  marginTop: verticalScale(16),
  paddingHorizontal: scale(2),
  backgroundColor: props.theme.colors.base_new,
  justifyContent: 'center',
}))`
  padding-bottom: 10;
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

export const DeleteAccountSuccessIcon = styled.Image.attrs(() => ({
  source: ACCOUNT_DELETE_SUCCESS_IMAGE,
}))`
  margin-top: ${verticalScale(48)}px;
  margin-bottom: ${verticalScale(18)}px;
  text-align: center;
  align-self: center;
`;

export const ReasonTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  text-align: left;
  line-height: 29.814px;
  margin-top: ${verticalScale(32)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ReasonSubTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${14}px;
  text-align: left;
  line-height: 22.799px;
  letter-spacing: 0.28px;
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(27)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ReasonFlatList = styled.FlatList.attrs<ViewPropsType>(() => ({
  contentContainerStyle: {paddingBottom: verticalScale(40)},
  showsVerticalScrollIndicator: false,
}))``;

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

export const BottomView = styled.View.attrs<ViewPropsType>(props => ({
  justifyContent: 'flex-end',
  marginBottom: verticalScale(46),
  marginTop: verticalScale(25),
  paddingHorizontal: props.ph,
}))``;
