import React from 'react';
import {Container, SkipLabel} from './styles';
import AMButton from './AMButton';
import {useTranslation} from 'react-i18next';
import type {HeaderButtonProps} from '@react-navigation/elements';

interface AMHeaderSkipButtonProps extends HeaderButtonProps {
  onPress?: Function;
}

const AMHeaderSkipButton: React.FC<AMHeaderSkipButtonProps> = ({onPress}) => {
  const {t} = useTranslation();
  return (
    <Container>
      <AMButton onPress={onPress}>
        <SkipLabel>{t('Skip')}</SkipLabel>
      </AMButton>
    </Container>
  );
};

AMHeaderSkipButton.defaultProps = {
  onPress: () => {},
};

export default AMHeaderSkipButton;
