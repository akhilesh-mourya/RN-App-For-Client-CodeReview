/**
 * All Style related types & interfaces will goes here
 */
export interface TextPropsType {
  color?: string;
  mx?: number;
  my?: number;
  isFocused?: boolean;
}

export interface ViewPropsType {
  backgroundColor?: string;
  mx?: number;
  my?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  height?: number;
  width?: number;
  maxWidth?: number;
  borderRadius?: number;
  alignItems?: string;
  justifyContent?: string;
  isFocused?: boolean;
  flex?: number;
  bg?: string;
  behavior?: string;
  flexDirection?: string;
  marginLeft?: number;
  marginRight?: number;
  height?: number;
  width?: number | string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  behavior?: string | null;
}

export interface SVGXMLPropsType {
  xml?: string;
}
