import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import ActionSheet, {ActionSheetProps} from 'react-native-actions-sheet';
import theme from '../../theme';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../@types/styledComponents';
import {border, color, layout, size, space} from 'styled-system';
import AMButton from '../button/AMButton';
import {FontFamily} from 'custom_enums';
import {SvgXml} from 'react-native-svg';
import {
  APPLE_MESSAGES_ICON,
  RIGHT_ARROW_ICON,
  WHATSAPP_ICON,
} from '../../assets/svg/home';
import {NEW_ANALYSIS_SHEET_ICON} from '../../assets/svg/upload';
import {Platform} from 'react-native';

export const ModalContainer = styled(ActionSheet).attrs<ActionSheetProps>(
  () => ({
    animated: true,
    gestureEnabled: true,
    containerStyle: {
      margin: 0,
      padding: 0,
      backgroundColor: theme.colors.base_50_new,
      borderTopLeftRadius: scale(20),
      borderTopRightRadius: scale(20),
    },
  }),
)``;

export const SheetContainer = styled(AMButton).attrs<any>(props => ({
  height: verticalScale(props?.height || 200),
  width: '100%',
  bg: theme.colors.base_50_new,
  borderTopLeftRadius: scale(20),
  borderTopRightRadius: scale(20),
  px: scale(16),
  activeOpacity: 1,
}))`
  align-self: flex-end;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const ModalContainerTransparent = styled(
  ActionSheet,
).attrs<ActionSheetProps>(() => ({
  animated: true,
  gestureEnabled: true,
  containerStyle: {
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  headerAlwaysVisible: false,
  defaultOverlayOpacity: 0.7,
}))``;

export const SheetContainerTransparent = styled(AMButton).attrs<any>(props => ({
  width: '100%',
  bg: theme.colors.transparent,
  borderTopLeftRadius: scale(20),
  borderTopRightRadius: scale(20),
  activeOpacity: 1,
}))`
  align-self: flex-end;
  padding-horizontal: ${scale(8)}px;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const TopBar = styled.View.attrs<ViewPropsType>(() => ({
  height: verticalScale(4),
  width: scale(64),
  bg: theme.colors.inputBG,
  borderRadius: scale(24),
}))`
  margin-top: 10;
  align-self: center;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const TopBarUpdate = styled.View.attrs<ViewPropsType>(() => ({
  height: verticalScale(4),
  width: scale(64),
  bg: theme.colors.inputBG,
  borderRadius: scale(24),
}))`
  margin-top: 10;
  margin-bottom: ${verticalScale(20)}px;
  align-self: center;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const HeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  my: verticalScale(24),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${moderateScale(18)}px;
  align-self: flex-start;
  text-align: left;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const RowView = styled(AMButton).attrs<ViewPropsType>(() => ({}))`
  flex-direction: row;
  align-items: center;
`;

export const RowFullFlexView = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Seperator = styled.View.attrs<ViewPropsType>(props => ({
  height: verticalScale(0.9),
  bg: props.theme.colors.separatorBgColor,
  my: verticalScale(16),
}))`
  ${color}
  ${space}
  ${size}
`;

export const WhatsappIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: WHATSAPP_ICON,
}))`
  margin-right: ${scale(16)}px;
  ${color}
  ${space}
  ${layout}
`;

export const MessagesIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: APPLE_MESSAGES_ICON,
}))`
  margin-right: ${scale(16)}px;
  ${color}
  ${space}
  ${layout}
`;

export const AnalysisSheetIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: NEW_ANALYSIS_SHEET_ICON,
}))`
  margin-right: ${scale(16)}px;
  ${color}
  ${space}
  ${layout}
`;

export const OptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${moderateScale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const OptionLabelCenter = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${scale(18)}px;
  line-height: ${scale(28)}px;
  align-self: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const OptionLRedabelCenter = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.error,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${scale(18)}px;
  line-height: ${scale(28)}px;
  align-self: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const RightArrowIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: RIGHT_ARROW_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const RelationshipTopView = styled.View.attrs<ViewPropsType>(() => ({
  bg: 'rgba(23, 24, 27, 0.80)',
  borderRadius: scale(12),
}))`
  align-self: stretch;
  margin-bottom: ${verticalScale(10)}px;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const RelationshipBottomView = styled.View.attrs<ViewPropsType>(
  props => ({
    bg: props?.theme?.colors?.base_50,
    borderRadius: scale(12),
  }),
)`
  align-self: stretch;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const OptionConatiner = styled(AMButton).attrs<ViewPropsType>(() => ({
  py: verticalScale(18),
}))`
  align-items: center;
  ${color}
  ${space}
  ${size}
  ${border}
`;

export const Seprator = styled.View.attrs<ViewPropsType>(props => ({
  bg: props?.theme?.colors?.pickerDivider,
  height: 0.3,
}))`
  align-self: stretch;
  ${color}
  ${space}
  ${size}
  ${border}
`;
