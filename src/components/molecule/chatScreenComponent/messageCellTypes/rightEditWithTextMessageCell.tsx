import {
  BGGradientRow,
  MessageText,
  EditButton,
  EditLabel,
  PencilIcon,
} from './rightCellstyles';
import React, {FC} from 'react';
import i18next from 'i18next';
import {MessageOptionPressEventType} from '../../../../constants/enums';

interface MessageItemProps {
  text?: string;
  onMessageOptionPressEvent?: Function;
  item?: any;
}

const RightEditWithTextMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {text, onMessageOptionPressEvent = () => {}, item} = props;
  return (
    <BGGradientRow>
      <MessageText>{text}</MessageText>
      <EditButton
        onPress={() =>
          onMessageOptionPressEvent(
            MessageOptionPressEventType.EditRelationship,
            item,
          )
        }>
        <PencilIcon />
        <EditLabel>{i18next.t('Edit')}</EditLabel>
      </EditButton>
    </BGGradientRow>
  );
});
export default RightEditWithTextMessageCell;
