import i18next from 'i18next';
import {
  MessageText,
  MessageContainer,
  FillWidthDivider,
  FillWidthButton,
  PencilIcon,
  FillQueText,
  MayBeText,
} from './style';
import React, {FC} from 'react';
import {MessageOptionPressEventType} from '../../../../constants/enums';

interface MessageItemProps {
  text?: string;
  onMessageOptionPressEvent?: Function;
  item?: any;
  isOnlyFillQuitionnaire?: boolean;
}

const FillQuestionnaireMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {
    text,
    onMessageOptionPressEvent = () => {},
    item,
    isOnlyFillQuitionnaire = false,
  } = props;

  return (
    <>
      <MessageContainer>
        <MessageText selectable={true}>{text}</MessageText>
        <FillWidthDivider />
        <FillWidthButton
          onPress={() =>
            onMessageOptionPressEvent(
              MessageOptionPressEventType.FillQuestionnaire,
              item,
            )
          }>
          <PencilIcon />
          <FillQueText>{i18next.t('Fill_Questionnaire')}</FillQueText>
        </FillWidthButton>
        {!isOnlyFillQuitionnaire && (
          <>
            <FillWidthDivider />
            <FillWidthButton
              onPress={() =>
                onMessageOptionPressEvent(
                  MessageOptionPressEventType.MayBeLater,
                  item,
                )
              }>
              <MayBeText>{i18next.t('Maybe later')}</MayBeText>
            </FillWidthButton>
          </>
        )}
      </MessageContainer>
    </>
  );
});
export default FillQuestionnaireMessageCell;
