import {moderateScale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale} from 'react-native-size-matters/extend';
import theme from '../../../../theme';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../../@types/styledComponents';
import {FontFamily} from '../../../../enums';
import LinearGradient from 'react-native-linear-gradient';
import AMButton from '../../../button/AMButton';
import {SvgXml} from 'react-native-svg';
import {PENCIL_WHITE} from '../../../../assets/svg/chat';

export const BGGradient: any = styled(LinearGradient).attrs(props => ({
  colors: props.theme.colors.messageGradient,
  useAngle: true,
  angle: 87,
  paddingHorizontal: 10,
  paddingVertical: scale(7),
  borderRadius: scale(16),
  maxWidth: scale(236),
  minWidth: scale(50),
}))`
  align-items: center;
  ${color}
  ${space}
  ${border}
`;

export const BGGradientRow: any = styled(LinearGradient).attrs(props => ({
  colors: props.theme.colors.messageGradient,
  useAngle: true,
  angle: 87,
  paddingHorizontal: 10,
  paddingVertical: scale(7),
  borderRadius: moderateScale(16),
  maxWidth: scale(236),
}))`
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${border}
`;

export const MessageText: any = styled.Text.attrs<TextPropsType>(() => ({
  color: theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  flex: 1;
  ${color}
  ${space}
`;

export const UploadedAConversationMessageText: any = styled.Text.attrs<TextPropsType>(
  () => ({
    color: theme.colors.white,
  }),
)`
  font-family: ${FontFamily.Medium};
  ${color}
  ${space}
`;

export const EditButton: any = styled(AMButton).attrs<ViewPropsType>(props => ({
  bg: props.theme.colors.semi_transparent_border_15,
  height: verticalScale(24),
  borderRadius: moderateScale(87),
}))`
  padding-horizontal: ${scale(16)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
  ${border}
`;

export const EditLabel: any = styled.Text.attrs<TextPropsType>(() => ({
  color: theme.colors.white,
  label: 'sdf',
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(14)}px;
  ${color}
  ${space}
`;

export const PencilIcon = styled(SvgXml).attrs<any>(() => ({
  xml: PENCIL_WHITE,
}))`
  margin-right: ${scale(4)}px;
  ${color}
  ${space}
  ${layout}
`;
