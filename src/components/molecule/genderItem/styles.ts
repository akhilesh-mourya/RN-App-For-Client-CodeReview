import {FontFamily} from 'custom_enums';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, size, space} from 'styled-system';
import {TextPropsType} from '../../../../@types/styledComponents';
import {Platform} from 'react-native';

export const MainContainer = styled.TouchableOpacity.attrs<any>(() => ({
  py: verticalScale(13),
  marginLeft: scale(30),
}))`
${color}
${size}
  ${layout}
  ${space}
`;



export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  line-height: ${22}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;
