import React, {FC} from 'react';
import {
  CheckArrowIcon,
  InputView,
  OptionLabel,
  RowOptionContainer,
  SelectionContainer,
} from './styles';
import {t} from 'i18next';

interface ReasonProps {
  item: any;
  onPress: any;
  isSelected: boolean;
  isForOthers: boolean;
  onChangeOtherReason: any;
  isOtherFieldAsInput: boolean;
  otherReason: string;
}

const DeleteAccountReasonItem: FC<ReasonProps> = React.memo(props => {
  const {
    item,
    onPress,
    isSelected,
    isForOthers,
    onChangeOtherReason,
    isOtherFieldAsInput,
    otherReason,
  } = props;
  return (
    <SelectionContainer onPress={onPress} isSelected={isSelected}>
      {isForOthers ? (
        <>
          {isOtherFieldAsInput ? (
            <InputView
              placeholder={t('Other comments here...')}
              onChangeText={onChangeOtherReason}
              value={otherReason}
            />
          ) : (
            <RowOptionContainer>
              {/* <OtherImage source={OTHER_ICON} /> */}
              <OptionLabel>{item.reasonData}</OptionLabel>
            </RowOptionContainer>
          )}
        </>
      ) : (
        <>
          <RowOptionContainer>
            {/* <EmojiLabel>{item.emojiData}</EmojiLabel> */}
            <OptionLabel>{item.reasonData}</OptionLabel>
          </RowOptionContainer>
          {isSelected && <CheckArrowIcon />}
        </>
      )}
    </SelectionContainer>
  );
});

export default DeleteAccountReasonItem;
