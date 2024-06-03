import React, {FC} from 'react';
import {
  Block,
  Container,
  HeaderTitle,
  MainContainer,
  SafeAreaContainer,
  SectionListView,
  SkeletonPlaceholderItemContainer,
  SkeletonPlaceholderItemImage,
  SkeletonPlaceholderItemRowContainer,
  SkeletonPlaceholderItemView,
  SkeletonPlaceholderView,
  SubContainer,
} from './styles';
import MessageItem from '../../components/molecule/chatScreenComponent/messageItem';
import Header from '../../components/header';
import Footer from '../../components/footer/chatFooter';
import {MessageSectionItemProps} from '../../enums';
import {useChatMessages} from '../../hooks/chat/useChatMessages';
import UploadConversationBottomSheet from '../../components/bottomSheet/uploadConversationBottomSheet';
import {ChatScreenScreenProps} from '../../types';
import {MessageContentType} from '../../constants/enums';
import {getMessageDisable} from '../../utility/chatUtility';
import UpdateRelationshipConversationBottomSheet from '../../components/bottomSheet/updateRelationshipConversationBottomSheet';
import {AttachmentStylesResultModal} from '../../components/attachmentStylesPopup';
import {RelationshipStatusModal} from '../../components/relationshipHealthStatusPopup';

const ChatScreen: FC<ChatScreenScreenProps> = screenProps => {
  const {
    bottomSheetRef,
    receiverData,
    restructureMessage,
    onMessageOptionPressEvent,
    onWhatsAppPress,
    onIMessagePress,
    onNewAnalysisPress,
    sendMessage,
    messagesRawData,
    showSkeletonAnim,
    updateRelationbottomSheetRef,
    onUploadConvPress,
    isIMessageUploadType,
    showHideAttachmentStyle,
    showHideHealthStatus,
    isAttachmentStyleVisible,
    isRelationshipHealthStatusVaisible,
    onUpdateConvPress,
    onProfilePress,
    myRelationshipsList,
    analysisData,
    selectedExpandedAttachmentRef,
    isKeyboardAvoidingViewEnabled,
  } = useChatMessages(screenProps);

  const renderMessageItem = ({item, index}: MessageSectionItemProps) => {
    return (
      <MessageItem
        item={item}
        avatar={item?.avatar}
        text={item?.content}
        left={item?.senderType !== MessageContentType?.User}
        index={index}
        restructureMessageData={restructureMessage}
        sectionIndex={item?.sectionIndex}
        type={item?.contentType}
        onMessageOptionPressEvent={onMessageOptionPressEvent}
        myRelationshipsList={myRelationshipsList}
      />
    );
  };

  const renderUploadConvSheet = () => (
    <UploadConversationBottomSheet
      setRef={bottomSheetRef}
      onWhatsAppPress={onWhatsAppPress}
      onIMessagePress={onIMessagePress}
    />
  );

  const renderUpdateRelationshipConvSheet = () => (
    <UpdateRelationshipConversationBottomSheet
      setRef={updateRelationbottomSheetRef}
      onWhatsAppPress={onUpdateConvPress}
      onNewAnalysisPress={onNewAnalysisPress}
      isImessageUpload={isIMessageUploadType}
    />
  );

  const renderSectionHeader = (title: string) => {
    return <HeaderTitle>{title}</HeaderTitle>;
  };

  const renderAttachmentStylesLayout = () => {
    return (
      <AttachmentStylesResultModal
        isVisible={isAttachmentStyleVisible}
        onHide={showHideAttachmentStyle}
        analysisData={analysisData}
        subject={receiverData?.subject || ''}
        expandedAttachmentRef={selectedExpandedAttachmentRef}
      />
    );
  };

  const renderRelationshipStatusLayout = () => {
    return (
      <RelationshipStatusModal
        isVisible={isRelationshipHealthStatusVaisible}
        onHide={showHideHealthStatus}
        analysisData={analysisData}
        subject={receiverData?.subject || ''}
        expandedAttachmentRef={selectedExpandedAttachmentRef}
      />
    );
  };

  return (
    <MainContainer>
      <SafeAreaContainer>
        <Header receiverData={receiverData} onProfilePress={onProfilePress} />
        <Container enabled={isKeyboardAvoidingViewEnabled}>
          <SubContainer>
            {restructureMessage && restructureMessage.length > 0 ? (
              <SectionListView
                sections={restructureMessage}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderMessageItem}
                keyExtractor={(item, index) => `${item._id}_${index}`}
                renderSectionFooter={({section: {title}}) =>
                  renderSectionHeader(title)
                }
                onScrollToIndexFailed={() => {}}
              />
            ) : showSkeletonAnim ? (
              <Block>
                <SkeletonPlaceholderView>
                  <SkeletonPlaceholderItemContainer>
                    <SkeletonPlaceholderItemRowContainer>
                      <SkeletonPlaceholderItemImage />
                      <SkeletonPlaceholderItemView />
                    </SkeletonPlaceholderItemRowContainer>
                  </SkeletonPlaceholderItemContainer>
                </SkeletonPlaceholderView>
              </Block>
            ) : (
              <Block />
            )}
            {renderRelationshipStatusLayout()}
            {renderAttachmentStylesLayout()}
            <Footer
              sendMessage={sendMessage}
              isDisabled={getMessageDisable(messagesRawData)}
              onUploadConvPress={onUploadConvPress}
            />
          </SubContainer>
        </Container>
      </SafeAreaContainer>
      {renderUploadConvSheet()}
      {renderUpdateRelationshipConvSheet()}
    </MainContainer>
  );
};

export default ChatScreen;
