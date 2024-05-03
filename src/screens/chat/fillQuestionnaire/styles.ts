import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {SvgXml} from 'react-native-svg';
import {
  BUTTON_NEXT_ARROW_ACTIVE,
  BUTTON_NEXT_ARROW_DISABLED,
  HEADER_BACK_ARROW_ICON,
} from '../../../assets/svg';
import AMButton from '../../../components/button/AMButton';
import {CROSS_ICON} from '../../../assets/svg/chat';
import {Platform} from 'react-native';

export const Container = styled.View.attrs<any>(() => ({}))`
  flex: 1;
  padding-horizontal: ${verticalScale(32)}px;
`;

export const HeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(137),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${moderateScale(26, 0.5)}px;
  align-self: center;
  ${color}
  ${size}
  ${layout}
  ${space}
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

export const SafeAreaContainer = styled.SafeAreaView.attrs(props => ({
  backgroundColor: props.theme.colors.base_new,
}))`
  flex: 1;
  ${color}
`;

export const HeaderContainer = styled.View.attrs<any>(props => ({
  top: 0,
  left: scale(30),
  right: scale(30),
  position: 'absolute',
  paddingTop: verticalScale(Platform.OS === 'android' ? 24 : 68),
  paddingHorizontal: scale(2),
  backgroundColor: props.theme.colors.base_new,
}))`
  padding-bottom: 10;
  ${size}
  ${layout}
  ${space}
  ${space}
`;

export const SpaceBetweenRow = styled.View.attrs<any>(() => ({
  mt: verticalScale(24),
}))`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
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

export const CrossIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CROSS_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BodyContainer = styled.View.attrs<any>(() => ({
  mt: verticalScale(120),
}))`
  flex: 1;
  ${size}
  ${layout}
  ${space}
`;

export const ButtonContainerView = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: 'position',
    keyboardVerticalOffset: 125,
    keyboardShouldPersistTaps: 'handled',
  }),
)`
  margin-bottom: ${verticalScale(Platform.OS === 'ios' ? 82 : 60)}px;
  padding-horizontal: ${scale(32)}px;
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'always',
  scrollEnabled: false,
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

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: 'position',
    keyboardVerticalOffset: 24,
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {flex: 1},
  }),
)`
  padding-horizontal: ${verticalScale(32)}px;
  flex: 1;
`;

export const CommonFlatList = styled.FlatList.attrs<ViewPropsType>(() => ({
  contentContainerStyle: {paddingBottom: verticalScale(80)},
  showsVerticalScrollIndicator: false,
}))``;
