import React, {FC, memo} from 'react';
import {
  CheckArrowIcon,
  ImageLabel,
  OptionLabel,
  OptionSemiLabel,
  ProfileBG,
  RowContainer,
  SelectionContainer,
  TouchableOpacity,
} from './styles';

interface UserSelectionProps {
  item: any;
  isSelected: boolean;
  onPress: any;
  isExistUser: boolean;
}

const UserSelectionItem: FC<UserSelectionProps> = React.memo(props => {
  const {item, isSelected, onPress, isExistUser} = props;
  const getFirstLetter = () => {
    return item?.name?.charAt(0) || item?.charAt(0);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <SelectionContainer isSelected={isSelected}>
        {isExistUser ? (
          <RowContainer>
            <ProfileBG>
              <ImageLabel>{getFirstLetter()}</ImageLabel>
            </ProfileBG>
            <OptionLabel>{item?.name || item}</OptionLabel>
          </RowContainer>
        ) : (
          <OptionSemiLabel>{item?.name || item}</OptionSemiLabel>
        )}

        {isSelected && <CheckArrowIcon />}
      </SelectionContainer>
    </TouchableOpacity>
  );
});

export default memo(UserSelectionItem);
