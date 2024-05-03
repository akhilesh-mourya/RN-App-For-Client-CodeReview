import React, {FC} from 'react';
import TextMessageCell from './messageCellTypes/textMessageCell';
import {MessageType} from '../../../constants/enums';
import FillQuestionnaireMessageCell from './messageCellTypes/fillQuestionnaireMessageCell';
import LeftMessageLoadingCell from './messageCellTypes/leftMessageLoadingCell';
import UploadConvMessageCell from './messageCellTypes/uploadConvMessageCell';
import i18next from 'i18next';
import ViewAnalysisMessageCell from './messageCellTypes/viewAttachmentStylesCell';
import ViewRelationshipHealthStatusCell from './messageCellTypes/viewRelationshipHealthStatusCell';

interface MessageItemProps {
  text?: string;
  type?: string;
  onMessageOptionPressEvent?: Function;
  item?: any;
}

const LeftMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {
    text,
    type = MessageType.Text,
    onMessageOptionPressEvent,
    item,
  } = props;

  let MessageView;
  switch (type) {
    case MessageType.Text:
      MessageView = <TextMessageCell text={text} />;
      break;
    case MessageType.FillQuestionnaire:
      MessageView = (
        <FillQuestionnaireMessageCell
          text={text}
          item={item}
          onMessageOptionPressEvent={onMessageOptionPressEvent}
        />
      );
      break;
    case MessageType.MayBeLater:
      MessageView = (
        <FillQuestionnaireMessageCell
          text={text}
          item={item}
          onMessageOptionPressEvent={onMessageOptionPressEvent}
          isOnlyFillQuitionnaire={true}
        />
      );
      break;
    case MessageType.UploadConversation:
      MessageView = (
        <UploadConvMessageCell
          text={text}
          onMessageOptionPressEvent={onMessageOptionPressEvent}
        />
      );
      break;
    case MessageType.GoToRelationships:
    case MessageType.Getting_Analysis_Ready:
      MessageView = (
        <UploadConvMessageCell
          text={text}
          onMessageOptionPressEvent={onMessageOptionPressEvent}
          label={i18next.t('Go_To_Relationships')}
          type={MessageType.GoToRelationships}
          leftIcon={false}
        />
      );
      break;
    case MessageType.ChatLoading:
      MessageView = <LeftMessageLoadingCell />;
      break;
    case MessageType.RelationshipHealthStatus:
    case MessageType.AttachmentStyleAnalysis:
      MessageView = (
        <ViewAnalysisMessageCell
          item={item}
          type={type}
          onMessageOptionPressEvent={onMessageOptionPressEvent}
        />
      );
      break;
    default:
      MessageView = <TextMessageCell text={text} />;
      break;
  }

  return <>{MessageView}</>;
});
export default LeftMessageCell;
