import React, {FC} from 'react';
import {CheckArrowIcon, OptionLabel, SelectionContainer} from './styles';

interface ItemProps {
  item: any;
  isSelected: boolean;
  onPress: any;
}
const QuestionnaireCommonItem: FC<ItemProps> = React.memo(props => {
  const {item, isSelected, onPress} = props;

  return (
    <SelectionContainer isSelected={isSelected} onPress={onPress}>
      <OptionLabel>{item.title}</OptionLabel>
      {isSelected && <CheckArrowIcon />}
    </SelectionContainer>
  );
});

export default QuestionnaireCommonItem;
