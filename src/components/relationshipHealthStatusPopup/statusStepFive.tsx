import React, {FC, useRef} from 'react';
import {
  ChatContainer,
  SnippetLabel,
  RoundedMainContainer,
  SubContainer,
  VerticalBlock,
  MessageFlatList,
  CrossContainer,
  StatusHeaderLabel,
  CrossTouchable,
  CrossIcon,
  MainNewContainer,
  SvgIcon,
  FullTouchableViewRight,
  FullTouchableViewLeft,
} from './styles';
import {renderProgress} from '.';
import {AttachmentMessageItem} from '../molecule/attachmentMessageItem';
import {MessageType} from '../../constants/enums';
import ScrollingText from '../scrollingText';
import {IS_IOS_PLATFORM} from '../../constants/appContants';

interface ScreenProps {
  step: number;
  updateStep?: any;
  progressList?: any;
  snippetHeader: string;
  snippetFooter: string;
  onHide: any;
  messageList: any;
  subject: string;
  redirectToNextStep: Function;
}
let touchEnabled = false;
export const StatusStepFive: FC<ScreenProps> = React.memo(props => {
  const {
    step,
    updateStep,
    progressList,
    snippetHeader,
    snippetFooter,
    onHide,
    messageList,
    subject,
    redirectToNextStep,
  } = props;

  const renderDateTitle = () => {
    return <SnippetLabel>{snippetHeader}</SnippetLabel>;
  };

  const renderItem = (item: any) => {
    return (
      <AttachmentMessageItem
        item={item?.item}
        type={MessageType.RelationshipHealthStatus}
        subject={subject}
      />
    );
  };

  const dismissButtonPressedRef = useRef(false);

  const renderListDataWithDetail = () => {
    return (
      <>
        <MessageFlatList data={messageList} renderItem={renderItem} />
        <VerticalBlock mTop={40} />
        <ScrollingText>
          <SnippetLabel>{snippetFooter}</SnippetLabel>
        </ScrollingText>
      </>
    );
  };

  return (
    <MainNewContainer
      onTouchEnd={e => {
        if (!dismissButtonPressedRef.current) {
          touchEnabled && redirectToNextStep(e.nativeEvent.locationX);
        }

        dismissButtonPressedRef.current = false;
      }}
      onTouchStart={() => {
        touchEnabled = true;
      }}
      onTouchMove={() => {
        touchEnabled = false;
      }}>
      <SvgIcon />
      <RoundedMainContainer>
        <SubContainer>
          {renderProgress(progressList, step, 24)}
          <CrossContainer>
            <StatusHeaderLabel>{' ' || ''}</StatusHeaderLabel>
            <CrossTouchable
              onPress={() => {
                dismissButtonPressedRef.current = true;
                onHide();
                updateStep(0);
              }}>
              <CrossIcon />
            </CrossTouchable>
          </CrossContainer>
          <ChatContainer>
            {renderDateTitle()}
            {renderListDataWithDetail()}
          </ChatContainer>
        </SubContainer>
      </RoundedMainContainer>
      {!IS_IOS_PLATFORM && (
        <>
          <FullTouchableViewRight
            onPress={() => redirectToNextStep('', true, true)}
          />
          <FullTouchableViewLeft
            onPress={() => redirectToNextStep('', true, false)}
          />
        </>
      )}
    </MainNewContainer>
  );
});
