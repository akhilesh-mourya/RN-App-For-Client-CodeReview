import React from 'react';

interface PhoneInputProps {
  activeOpacity?: number;
  children: React.ReactNode;
  onPress?: Function;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  children,
  activeOpacity,
  onPress = () => {},
  ...rest
}) => (
  <></>
);

PhoneInput.defaultProps = {
  activeOpacity: 0.8,
};

export default PhoneInput;
