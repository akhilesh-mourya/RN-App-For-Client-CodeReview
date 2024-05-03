import React from 'react';
import {BackButtonView, BackIcon, Container} from './styles';
import AMButton from './AMButton';
import {useNavigation} from '@react-navigation/native';

interface AMHeaderBackButtonProps {
  onPress?: Function;
  isForRegistration?: boolean;
}

const AMHeaderBackButton: React.FC<AMHeaderBackButtonProps> = ({
  onPress,
  isForRegistration = false,
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
        <BackButtonView isForRegistration={isForRegistration}>
          <BackIcon />
        </BackButtonView>
      </AMButton>
    </Container>
  );
};

AMHeaderBackButton.defaultProps = {
  onPress: () => {},
};

export default AMHeaderBackButton;
