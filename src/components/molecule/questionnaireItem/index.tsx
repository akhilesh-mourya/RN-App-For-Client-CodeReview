import React, {FC, memo} from 'react';
import {
  CheckArrowIcon,
  InputView,
  OptionLabel,
  SelectionContainer,
  TouchableOpacity,
} from './styles';
import {t} from 'i18next';

interface QuestionnaireProps {
  item: any;
  isSelected: boolean;
  onPress: any;
  isForOther: boolean;
  isOtherFieldAsInput: boolean;
  onTextChange: any;
}

const QuestionnaireItem: FC<QuestionnaireProps> = React.memo(props => {
  const {
    item,
    isSelected,
    onPress,
    isForOther,
    isOtherFieldAsInput,
    onTextChange,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <SelectionContainer isSelected={isSelected}>
        {isForOther ? (
          <>
            {isOtherFieldAsInput ? (
              <InputView
                autoFocus={true}
                placeholder={t('')}
                onChangeText={onTextChange}
              />
            ) : (
              <OptionLabel>{item?.title}</OptionLabel>
            )}

            {isSelected && <CheckArrowIcon />}
          </>
        ) : (
          <>
            <OptionLabel>{item?.title}</OptionLabel>
            {isSelected && <CheckArrowIcon />}
          </>
        )}
      </SelectionContainer>
    </TouchableOpacity>
  );
});

export default memo(QuestionnaireItem);
