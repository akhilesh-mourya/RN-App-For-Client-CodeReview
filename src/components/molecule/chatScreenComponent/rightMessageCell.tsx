import React, {FC} from 'react';
import {MessageType} from '../../../constants/enums';
import RightTextMessageCell from './messageCellTypes/rightTextMessageCell';
import RightEditWithTextMessageCell from './messageCellTypes/rightEditWithTextMessageCell';
import RightTextWithIconMessageCell from './messageCellTypes/rightTextWithIconMessageCell';
import {UploadButtonIcon} from './styles';
import {t} from 'i18next';

interface MessageItemProps {
  text?: string;
  type?: string;
  onMessageOptionPressEvent?: Function;
  item?: any;
}

const RightMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {
    text,
    type = MessageType.Text,
    onMessageOptionPressEvent,
    item,
  } = props;
  let MessageView;
  switch (type) {
    case MessageType.Text:
      MessageView = <RightTextMessageCell text={text} />;
      break;
    case MessageType.EditRelationship:
      MessageView = (
        <RightEditWithTextMessageCell
          text={t('You_Filled_Out_Questionnaire')}
          onMessageOptionPressEvent={onMessageOptionPressEvent}
          item={item}
        />
      );
      break;
    case MessageType.UploadedConversation:
      MessageView = (
        <RightTextWithIconMessageCell
          text={text}
          leftIcon={<UploadButtonIcon />}
        />
      );
      break;
    default:
      MessageView = <RightTextMessageCell text={text} />;
      break;
  }

  return <>{MessageView}</>;
});
export default RightMessageCell;
