import { SvgXml } from "react-native-svg";
import { color, layout, size, space } from "styled-system";
import styled from "styled-components/native";
import { TextPropsType, ViewPropsType } from "../../../@types/styledComponents";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { FontFamily } from "custom_enums";
import { BACK_ARROW_ICON } from "../../assets/svg/settings";

export const BackIcon = styled(SvgXml).attrs<any>(() => ({
  xml: BACK_ARROW_ICON,
}))`
  margin-top: 3px;
  ${color}
  ${space}
    ${layout}
`;

export const HeaderContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: "row",
  paddingHorizontal: scale(16),
  alignItems: "center",
  paddingVertical: verticalScale(24),

}))``;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const HeaderTitle = styled.Text.attrs<TextPropsType>((props) => ({
  color: props.theme.colors.white,
  ml: scale(16),
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${24}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;
