import {moderateScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale} from 'react-native-size-matters/extend';
import theme from '../../../theme';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from '../../../enums';

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
