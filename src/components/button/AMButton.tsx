import React from 'react';
import {Button} from './styles';

interface AMButtonProps {
  activeOpacity?: number;
  children: React.ReactNode;
  onPress?: Function;
}

const AMButton: React.FC<AMButtonProps> = ({
  children,
  activeOpacity,
  onPress = () => {},
  ...rest
}) => (
  <Button activeOpacity={activeOpacity} onPress={onPress} {...rest}>
    {children}
  </Button>
);

AMButton.defaultProps = {
  activeOpacity: 0.8,
};

export default AMButton;
