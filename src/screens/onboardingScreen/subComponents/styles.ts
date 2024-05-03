import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {color, layout, space, size} from 'styled-system';
import {
  ONBOARDING_COPILOT_STEP_IMAGE,
  ONBOARDING_PRIVACY_STEP_IMAGE,
  ONBOARDING_KNOWLEDGE_STEP_IMAGE,
} from '../../../assets/svg/onboarding';
import {
  moderateScale,
  verticalScale,
  scale,
} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  TextPropsType,
  SVGXMLPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import theme from '../../../theme';
import {DATING_COPILOT} from '../../../constants/imageConstants';
import {Platform} from 'react-native';

export const Container = styled.View.attrs<any>(() => ({
  px: scale(32),
  paddingTop: verticalScale(Platform.OS === 'android' ? 174 : 188),
}))`
  flex: 1;
  align-items: center;
  ${space}
`;

export const StepKnowledgeContainer = styled.View.attrs<any>(() => ({
  px: scale(32),
  paddingTop: verticalScale(Platform.OS === 'android' ? 160 : 178),
}))`
  flex: 1;
  align-items: center;
  ${space}
`;

export const StepPrivacyContainer = styled.View.attrs<any>(() => ({
  px: scale(32),
  paddingTop: verticalScale(Platform.OS === 'android' ? 248 : 260),
}))`
  flex: 1;
  align-items: center;
  ${space}
`;

export const ChatImageContainer = styled.View.attrs<ViewPropsType>(() => ({
  width: scale(282.41),
  height: verticalScale(250.908),
  justifyContent: 'center',
  alignItems: 'center',
}))`
  margin-top: ${verticalScale(54)}px;
`;

export const ImageContainer = styled.View.attrs<ViewPropsType>(() => ({
  width: scale(284.652),
  height: verticalScale(252.9),
  justifyContent: 'center',
  alignItems: 'center',
}))``;

export const PrivacyStepImageContainer = styled.View.attrs<ViewPropsType>(
  () => ({
    width: scale(241.626),
    height: verticalScale(214.673),
    justifyContent: 'center',
    alignItems: 'center',
  }),
)``;

export const OnBoardingStepImages = styled.Image.attrs<ViewPropsType>(
  props => ({
    source: props.imagePath,
  }),
)`
  ${color}
  ${space}
  ${layout}
`;

export const KnowledgeStepImage = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: ONBOARDING_KNOWLEDGE_STEP_IMAGE,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const PrivacyStepImage = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: ONBOARDING_PRIVACY_STEP_IMAGE,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const HeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.FKRegular};
  font-size: ${scale(26)}px;
  align-self: center;
  line-height: 36px;
  max-width: ${282}px;
  margin-top: ${verticalScale(35)}px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
`;

export const Description = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: 16,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(18)}px;
  font-weight: 500;
  line-height: 25px;
  align-self: center;
  text-align: center;
  max-width: ${311}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DescriptionStepTwo = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${moderateScale(18)}px;
  align-self: center;
  text-align: center;
  line-height: 25px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DescriptionStepThree = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(50),
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${moderateScale(18)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;
