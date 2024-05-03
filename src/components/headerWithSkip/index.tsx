import React, {FC} from 'react';
import {RowContainer} from './styles';
import AMHeaderSkipButton from '../button/AMHeaderSkipButton';
import AMHeaderBackButton from '../button/AMHeaderBackButton';

interface HeaderProps {
  onPress: any;
}

export const HeaderWithSkip: FC<HeaderProps> = React.memo(props => {
  const {onPress} = props;
  return (
    <RowContainer>
      <AMHeaderBackButton isForRegistration={true} />
      <AMHeaderSkipButton onPress={onPress} />
    </RowContainer>
  );
});
