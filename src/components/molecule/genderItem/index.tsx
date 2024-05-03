import React, {FC} from 'react';
import {MainContainer, NameLabel, TouchableOpacity} from './styles';

interface GenderItemProps {
  item: any;
  onPress?: any;
}

const GenderItem: FC<GenderItemProps> = React.memo(props => {
  const {item, onPress} = props;
  return (
    <MainContainer onPress={() => onPress(item.name, item.value)}>
        <NameLabel>{item.name}</NameLabel>
    </MainContainer>
  );
});

export default GenderItem;
