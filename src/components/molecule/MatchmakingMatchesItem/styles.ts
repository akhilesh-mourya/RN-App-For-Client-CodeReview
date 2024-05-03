import {scale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {SvgXml} from 'react-native-svg';
import {DOT_SVG_ICON} from '../../../assets/svg';
import {RELATIONSHIP_ICON} from '../../../assets/svg/home';

export const Container = styled.View.attrs<any>(props => ({
  borderRadius: scale(10),
  borderWidth: 1,
  borderColor: props.theme.colors.cardBorder,
  padding: scale(16),
  bg: 'rgba(255, 255, 255, 0.02)',
}))`
  flex-direction: row;
  align-self: stretch;
  margin-top: ${verticalScale(8)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const InnerRowView = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
}))`
  flex: 1;
  ${color}
  ${space}
  ${layout}
`;

export const ProfileImg = styled.Image.attrs<ViewPropsType>(() => ({
  width: scale(40),
  height: scale(40),
  borderRadius: scale(20),
}))`
  margin-top: ${verticalScale(8)}px;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const NameContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}))`
  ${color}
  ${space}
  ${layout}
`;

export const DetailContainer = styled.View.attrs<ViewPropsType>(() => ({
  marginLeft: scale(10),
  marginRight: scale(4),
}))`
  flex: 1;
`;

export const RelationshipIcon = styled(SvgXml).attrs<any>(() => ({
  xml: RELATIONSHIP_ICON,
}))`
  ${color}
  ${layout}
`;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  text-align: center;
  font-family: ${FontFamily.Regular};
  font-size: ${scale(20)}px;
  font-weight: 700;
  line-height: 32px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const SubTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(13)}px;
  line-height: ${verticalScale(22.4)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const TimeLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.placeholder,
}))`
  text-align: center;
  font-family: ${FontFamily.Medium};
  font-size: ${scale(12)}px;
  align-self: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DotIcon = styled(SvgXml).attrs<any>(() => ({
  xml: DOT_SVG_ICON,
}))`
  margin-left: ${scale(8)}px;
  align-self: center;
  ${color}
  ${layout}
`;

export const RightContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  align-self: center;
  align-items: flex-end;
  ${color}
  ${space}
  ${layout}
`;

export const IMessageContainer = styled.View.attrs<ViewPropsType>(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  height: verticalScale(22),
  width: scale(75),
  backgroundColor: 'rgba(201, 115, 255, 0.30)',
  borderRadius: scale(87),
}))`
  margin-bottom: ${verticalScale(8)}px;
  ${color}
  ${space}
  ${layout}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  text-align: center;
  font-family: ${FontFamily.Medium};
  font-size: ${scale(13)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
