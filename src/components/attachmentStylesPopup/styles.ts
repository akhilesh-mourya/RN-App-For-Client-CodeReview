import {Dimensions, Modal, Platform} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../theme';
import {SvgXml} from 'react-native-svg';
import {border, color, layout, padding, size, space} from 'styled-system';
import AMButton from '../button/AMButton';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {Analysis, FontFamily} from '../../enums';
import {SECURE_ANXIOUS_SVG_ICON} from '../../assets/svg/analysis';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import ViewShot from 'react-native-view-shot';
import AMPrimaryButton from '../button/AMPrimaryButton';

export const ModalContainer = styled(Modal).attrs<any>(() => ({
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
  ${layout}
  ${color}
  ${padding}
`;

export const CaptureShotView = styled(ViewShot).attrs<ViewPropsType>(
  () => ({}),
)`
  width: ${Dimensions.get('screen').width}px;
  flex: 1;
  ${layout}
`;

export const Container = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  bg: theme.colors.white,
}))`
  ${layout}
  ${color}
`;

export const OverlayContainer = styled.View.attrs(() => ({}))`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const OverlayContainerForShare = styled.View.attrs(() => ({}))``;

export const BlackFullFlexContainer = styled.View.attrs(() => ({}))`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  background-color: ${theme.colors.black};
  justify-content: space-between;
  ${layout}
  ${color}
`;

export const MainNewContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex: 1;
  ${space}
  ${padding}
  ${layout}
`;

export const SubContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  flex: 1;
  padding-bottom: 117px;
  ${space}
  ${padding}
  ${layout}
`;

export const TransparentContainer = styled.View.attrs(() => ({}))`
  flex: 1;
  background-color: transparent;
  padding-horizontal: ${scale(24)}px;
  ${layout}
  ${color}
`;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
}))`
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 120;
  top: 170;
  ${layout}
  ${color}
`;

export const ClickContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))``;

export const RoundedMainContainer = styled.View.attrs<ViewPropsType>(
  () => ({}),
)`
  border-radius: ${16}px;
  background-color: ${theme.colors.black};
  justify-content: space-between;
  flex: 1;
  position: absolute;
  left: 24;
  right: 24;
  bottom: 34;
  top: ${Platform.OS === 'android' ? 24 : 44}px;
  ${border}
  ${color}
  ${layout}
`;

export const ProgressContainer = styled.View.attrs(props => ({}))`
  flex-direction: row;
  margin-top: ${props => props?.mTop}px;
  ${layout}
`;

export const StylesImgContainer = styled.View.attrs<ViewPropsType>(() => ({
  width: 275,
  height: 244,
  mt: scale(30),
}))`
  align-self: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
  ${padding}
`;

export const BottomView = styled.View.attrs<ViewPropsType>(() => ({}))`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 70;
  ${layout}
  ${space}
  ${border}
  ${padding}
`;

export const CrossContainer = styled.View.attrs(() => ({}))`
  width: ${Dimensions.get('screen').width - 48}px;
  flex-direction: row;
  margin-top: 38px;
  justify-content: space-between;
  align-items: center;
  ${border}
  ${space}
  ${layout}
`;

export const BlackContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  backgroundColor: theme.colors.black,
}))``;

export const SpaceBetweenConatiner = styled.View.attrs<ViewPropsType>(
  () => ({}),
)`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  justify-content: space-between;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  ${layout}
  ${color}
`;

export const ResultContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
}))`
  margin-top: 105px;
  justify-content: center;
  ${color}
  ${layout}
`;

export const StylesDetailContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))`
  margin-horizontal: ${scale(24)}px;
  ${layout}
`;

export const ChatContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))`
  margin-horizontal: ${scale(32)}px;
  ${layout}
`;

export const ProgressSvg = styled(SvgXml).attrs(props => ({
  xml: props.icon,
  width: (Dimensions.get('screen').width - 73) / 6,
  marginLeft: scale(props?.isFirst ? 0 : 5),
}))``;

export const SvgIcon = styled(SvgXml).attrs(() => ({
  xml: Analysis.AttachmentStyleBgIcon,
  alignSelf: 'stretch',
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
}))`
  ${color}
  ${size}
${layout}
${space}
${border}
`;

export const CurvedImage = styled.Image.attrs(() => ({
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
}))`
  align-self: stretch;
  ${color}
  ${size}
${layout}
${space}
${border}
`;

export const ViewTouchable = styled.View.attrs(() => ({}))`
  flex: 1;
  ${layout}
  ${color}
`;

export const CrossTouchable = styled(AMButton).attrs<ViewPropsType>(() => ({
  zIndex: 1000,
}))`
  ${color}
  ${layout}
`;

export const CrossIcon = styled(SvgXml).attrs(() => ({
  xml: Analysis.CrossIcon,
}))``;

export const ShareIcon = styled(SvgXml).attrs(() => ({
  xml: Analysis.ShareIcon,
}))``;

export const SvgNewIcon = styled(SvgXml).attrs(() => ({
  xml: SECURE_ANXIOUS_SVG_ICON,
}))``;

export const StylesImg = styled.Image.attrs(() => ({
  alignSelf: 'center',
}))``;

export const InvisibleView = styled.View.attrs<ViewPropsType>(() => ({
  marginLeft: scale(21),
}))``;

export const StyleHeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.colors,
}))`
  font-family: ${FontFamily.Bold};
  flex: 1;
  font-size: ${13}px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 2.6px;
  margin-top: 10px;
  align-self: center;
  padding-left: 23.6px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const StyleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKLight};
  font-size: ${48}px;
  line-height: 52.8px;
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.96px;
  margin-top: 9px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ResultLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKRegular};
  font-size: 88.04px;
  font-weight: 400;
  line-height: 74.893px;
  letter-spacing: -5.282px;
  overflow: visible;
  padding-top: ${88 - 88 * 0.75}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const PercentageLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKMedium};
  font-size: 37.384px;
  font-weight: 500;
  line-height: 31.802px;
  padding-top: ${37 - 37 * 0.75}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SummaryStyleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKLight};
  font-size: ${22}px;
  line-height: 28.6px;
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.44px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SnippetLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${14}px;
  line-height: 24px;
  text-align: center;
  font-weight: 500;
  margin-top: 26px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SnippetLabelBottom = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${14}px;
  line-height: 24px;
  text-align: center;
  font-weight: 500;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DateValue = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${14}px;
  line-height: 24px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DescriptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  //numberOfLines: props?.noOfLine,
  ellipsizeMode: 'clip',
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${14}px;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
  flex-wrap: 'wrap';
  ${color} ${size} ${layout} ${space};
`;

export const VerticalBlock = styled.View.attrs(() => ({}))`
  margin-top: ${props => verticalScale(props?.mTop)}px;
  ${layout}
  ${space}
`;

export const MessageFlatList = styled.FlatList.attrs<ViewPropsType>(() => ({}))`
  margin-top: ${verticalScale(24)}px;
  flex-grow: 0;
  ${layout}
  ${space}
  ${color}
`;

export const ShareButton = styled(AMPrimaryButton).attrs<ViewPropsType>(
  () => ({}),
)`
  z-index: 1000;
`;
