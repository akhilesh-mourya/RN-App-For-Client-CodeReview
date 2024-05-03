import React, {FC} from 'react';
import {MainContainer, NameLabel, TouchableOpacity, Flag} from './styles';

interface CitySelectionItemProps {
  item: any;
  onPress?: any;
}

const CitySelectionItem: FC<CitySelectionItemProps> = React.memo(props => {
  const {item, onPress} = props;
  const {emoji} = item; //nodeEmoji.get('flag-us');
  const checkString = string => {
    return /^[0-9]*$/.test(string);
  };
  const getName = () => {
    const country = checkString(item?.cityCode)
      ? item?.countryCode
      : item?.cityCode;
    return item?.name + ', ' + country;
  };
  return (
    <MainContainer>
      <TouchableOpacity onPress={() => onPress(item.name)}>
        <Flag>{emoji}</Flag>
        <NameLabel>{getName()}</NameLabel>
      </TouchableOpacity>
    </MainContainer>
  );
});

export default CitySelectionItem;
