import {moderateScale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, space, border, size} from 'styled-system';
import {scale} from 'react-native-size-matters/extend';
import theme from '../../../../theme';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../../@types/styledComponents';
import {Analysis, FontFamily} from '../../../../enums';
import AMButton from '../../../button/AMButton';
import {SvgXml} from 'react-native-svg';
import {
  BOT_UPLOAD_CONV_ICON,
  PENCIL_PRIMARY,
} from '../../../../assets/svg/chat';
import LottieView from 'lottie-react-native';

export const MessageContainer = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.messageBubble,
  borderRadius: moderateScale(16),
  width: scale(241),
}))`
  padding-top: ${scale(8)}px;
  padding-bottom: ${scale(8)}px;
  margin-left: ${scale(8)}px;
  ${color};
  ${space};
  ${layout};
  ${border};
`;
export const MessageContainerThread = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.messageBubble,
  borderRadius: moderateScale(16),
  width: scale(241),
}))`
  padding-top: ${scale(8)}px;
  padding-bottom: ${scale(8)}px;
  margin-top: ${scale(8)}px;
  margin-left: ${scale(8)}px;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const MessageText: any = styled.Text.attrs<TextPropsType>(() => ({
  color: theme.colors.grey_20,
}))`
  font-family: ${FontFamily.Medium};
  padding-left: ${scale(10)}px;
  padding-right: ${scale(10)}px;
  ${color}
  ${space}
`;

export const FillWidthDivider = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.cellDivider,
  height: 1,
}))`
  align-self: stretch;
  margin-top: ${scale(8)}px;
  margin-bottom: ${scale(8)}px;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const FillWidthButton = styled(AMButton).attrs<ViewPropsType>(
  () => ({}),
)`
  align-self: stretch;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const PencilIcon = styled(SvgXml).attrs<any>(() => ({
  xml: PENCIL_PRIMARY,
  color: 'green',
}))`
  margin-right: ${scale(8)}px;
  ${color}
  ${space}
  ${layout}
`;

export const FillQueText: any = styled.Text.attrs<TextPropsType>(() => ({
  color: theme.colors.secoundary,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(14)}px;
  ${color}
  ${space}
`;

export const MayBeText: any = styled.Text.attrs<TextPropsType>(() => ({
  color: theme.colors.grey_50,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(14)}px;
  ${color}
  ${space}
`;

export const MessageLoadingContainer = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.messageBubble,
  borderRadius: moderateScale(16),
  width: scale(75),
  height: verticalScale(31),
}))`
  padding-top: ${verticalScale(8)}px;
  padding-bottom: ${verticalScale(8)}px;
  margin-left: ${scale(8)}px;
  margin-bottom: ${verticalScale(5)}px;
  align-items: center;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const LottieDotsAnim = styled(LottieView).attrs<any>(() => ({
  width: scale(54),
  height: verticalScale(74),
  autoPlay: true,
  loop: true,
  source: require('../../../../assets/lottie/chatLoading.json'),
}))`
  top: -${verticalScale(21)}px;
  position: absolute;
`;

export const UploadButtonIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: BOT_UPLOAD_CONV_ICON,
}))`
  margin-right: ${scale(2)}px;
  ${color}
  ${space}
  ${layout}
`;

export const AnalysisRowContainer = styled.View.attrs<any>(() => ({
  flexDirection: 'row',
}))``;

export const ViewAnalysisContainer = styled.View.attrs(() => ({}))``;

export const SentAnAnalysisText: any = styled.Text.attrs<TextPropsType>(() => ({
  color: theme.colors.placeholder,
}))`
  font-family: ${FontFamily.Medium};
  font-size: 13px;
  line-height: 18px;
  ${color}
  ${space}
  ${layout}
`;

export const ViewAnalysisStick = styled.View.attrs<ViewPropsType>(() => ({
  backgroundColor: theme.colors.grey_40,
}))`
  width: 2px;
  height: 225px;
  margin-horizontal: ${scale(8)}px;
  ${layout}
  ${space}
`;

export const AnalysisContainer = styled.View.attrs(() => ({}))`
  width: 134px;
  height: 208px;
  border-radius: 16px;
  ${layout}
  ${space}
  ${border}
`;

export const SvgIcon = styled(SvgXml).attrs(props => ({
  xml: props.icon,
}))``;

export const MultipleImageIcon = styled(SvgXml).attrs(() => ({
  xml: Analysis.MultipleImagesIcon,
}))`
  position: absolute;
  right: 8px;
  top: 8px;
  ${layout}
  ${space}
  ${border}
`;

export const FullFlexBlock = styled.View.attrs(() => ({}))`
  flex: 1 ${layout} ${space} ${border};
`;
