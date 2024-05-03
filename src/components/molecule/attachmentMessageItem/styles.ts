import {FontFamily} from 'custom_enums';
import {verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {color, layout, size, space} from 'styled-system';
import {TextPropsType} from '../../../../@types/styledComponents';
import {MessageType} from '../../../constants/enums';
import theme from '../../../theme';

export const Container = styled.View.attrs(() => ({}))`
  margin-top: ${verticalScale(16)}px;
  ${layout}
  ${space}
`;

export const MyNameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.youLabelColor,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${14}px;
  line-height: 20.807px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const MessageLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${14}px;
  line-height: 20.807px;
  font-weight: 500;
  ${color}
  ${size}
      ${layout}
      ${space}
`;

export const PartnerLabel = styled.Text.attrs<TextPropsType>(props => ({
  color:
    props.type === MessageType.AttachmentStyleAnalysis
      ? props.theme.colors.partnerLabelColor
      : theme.colors.relationshipPartnerLabelColor,
}))`
  font-family: ${FontFamily.Regular};
  font-size: ${14}px;
  line-height: 20.807px;
  ${color}
  ${size}
      ${layout}
      ${space}
`;
