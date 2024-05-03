import {moderateScale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale} from 'react-native-size-matters/extend';
import theme from '../../../theme';
import {Dimensions} from 'react-native';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from '../../../enums';
import {SvgXml} from 'react-native-svg';
import {UPLOAD_BUTTON_ICON} from '../../../assets/svg/home';

const windowWidth = Dimensions.get('window').width;

export const MainContainer: any = styled.View.attrs<ViewPropsType>(props => ({
  justifyContent: props.left ? 'flex-start' : 'flex-end',
}))`
  flex-direction: row;
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${props => (!props?.isAdjecentItem ? 8 : 0)}px;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const SubContainer = styled.View.attrs<ViewPropsType>(() => ({
  maxWidth: (windowWidth * 70) / 100,
}))`
  flex-direction: row;
  align-items: flex-end;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const Block = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const AvatarImg = styled.Image.attrs(() => ({
  width: scale(32),
  height: scale(32),
  borderRadius: scale(16),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const AvatarBlank = styled.View.attrs<ViewPropsType>(() => ({
  width: scale(32),
  height: scale(32),
  borderRadius: scale(16),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const MessageContainer = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.messageBubble,
  borderRadius: moderateScale(16),
  width: scale(241),
}))`
  padding-left: ${scale(10)}px;
  padding-right: ${scale(10)}px;
  padding-top: ${scale(8)}px;
  padding-bottom: ${scale(8)}px;
  margin-left: ${scale(8)}px;
  ${color};
  ${space};
  ${layout};
  ${border};
`;
export const MessageText: any = styled.Text.attrs<TextPropsType>(props => ({
  color: props.left ? theme.colors.grey_20 : theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  ${color}
  ${space}
`;

export const UploadButtonIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: UPLOAD_BUTTON_ICON,
  height: scale(16),
  width: scale(16),
}))`
  margin-right: ${scale(4)}px;
  ${color}
  ${space}
  ${layout}
`;


