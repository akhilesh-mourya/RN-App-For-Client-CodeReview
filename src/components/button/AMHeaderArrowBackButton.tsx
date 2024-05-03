import React from 'react';
import {BackIcon, Container} from './styles';
import AMButton from './AMButton';
import {useNavigation} from '@react-navigation/native';

interface AMHeaderArrowBackButtonProps {
  onPress?: Function;
}

const AMHeaderArrowBackButton: React.FC<AMHeaderArrowBackButtonProps> = ({
  onPress,
}) => {
  const navigation = useNavigation();
  const onBackButton = () => {
    navigation.goBack();
    if (onPress) {
      onPress();
    }
  };

  return (
    <Container>
      <AMButton onPress={onBackButton}>
        <BackIcon />
      </AMButton>
    </Container>
  );
};

AMHeaderArrowBackButton.defaultProps = {
  onPress: () => {},
};

export default AMHeaderArrowBackButton;
