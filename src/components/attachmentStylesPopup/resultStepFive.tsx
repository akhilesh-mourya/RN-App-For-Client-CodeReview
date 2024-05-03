import React, {FC, useRef} from 'react';
import {
  ChatContainer,
  CrossContainer,
  CrossIcon,
  CrossTouchable,
  MainNewContainer,
  MessageFlatList,
  RoundedMainContainer,
  SnippetLabel,
  SnippetLabelBottom,
  StyleHeaderLabel,
  SubContainer,
  SvgIcon,
  VerticalBlock,
} from './styles';
import {renderProgress} from '.';
import {AttachmentMessageItem} from '../molecule/attachmentMessageItem';
import {MessageType} from '../../constants/enums';
import theme from '../../theme';
import ScrollingText from '../scrollingText';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import {
  FullTouchableViewLeft,
  FullTouchableViewRight,
} from '../relationshipHealthStatusPopup/styles';

interface ScreenProps {
  step: number;
  updateStep?: any;
  progressList?: any;
  onHide: any;
  messageList: any;
  snippetHeader: string;
  snippetFooter: string;
  subject: string;
  redirectToNextStep: Function;
}

let touchEnabled = false;
export const ResultStepFive: FC<ScreenProps> = React.memo(props => {
  const {
    step,
    updateStep,
    progressList,
    onHide,
    snippetHeader,
    snippetFooter,
    messageList,
    subject,
    redirectToNextStep,
  } = props;

  const dismissButtonPressedRef = useRef(false);

  const renderCross = (title: string) => {
    return (
      <CrossContainer>
        {title && (
          <StyleHeaderLabel colors={theme.colors.black}>
            {title}
          </StyleHeaderLabel>
        )}
        <CrossTouchable
          onPress={() => {
            dismissButtonPressedRef.current = true;
            onHide();
            updateStep(0);
          }}>
          <CrossIcon />
        </CrossTouchable>
      </CrossContainer>
    );
  };

  const renderDateTitle = () => {
    return (
      <>
        <SnippetLabel>{snippetHeader}</SnippetLabel>
      </>
    );
  };

  const renderItem = (item: any) => {
    return (
      <AttachmentMessageItem
        item={item?.item}
        type={MessageType.AttachmentStyleAnalysis}
        subject={subject}
      />
    );
  };

  const renderListDataWithDetail = () => {
    return (
      <>
        <MessageFlatList data={messageList} renderItem={renderItem} />
        <VerticalBlock mTop={40} />
        <ScrollingText>
          <SnippetLabelBottom>{snippetFooter}</SnippetLabelBottom>
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
          {renderCross(' ')}
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
