import {FontFamily} from 'custom_enums';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, size, space} from 'styled-system';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  paddingVertical: verticalScale(13),
  marginLeft: scale(30),
}))``;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${16}px;
  font-weight: 600;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
`;

export const Flag = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${20}px;
  margin-right: 14px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
