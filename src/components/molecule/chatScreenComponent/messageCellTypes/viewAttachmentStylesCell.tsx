import React, {FC} from 'react';
import {
  AnalysisContainer,
  AnalysisRowContainer,
  MultipleImageIcon,
  SentAnAnalysisText,
  SvgIcon,
  ViewAnalysisContainer,
  ViewAnalysisStick,
  MessageContainerThread,
  MessageText,
  FullFlexBlock,
} from './style';
import {t} from 'i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Analysis} from '../../../../enums';
import theme from '../../../../theme';
import {ChatMessagesType} from '../../../../types';
import AMButton from '../../../button/AMButton';
import {MessageType} from '../../../../constants/enums';

interface MessageItemProps {
  item?: ChatMessagesType;
  onMessageOptionPressEvent?: Function;
  type?: string;
}

const ViewAttachmentStylesCell: FC<MessageItemProps> = React.memo(
  ({item, type = MessageType.Text, onMessageOptionPressEvent = () => {}}) => {
    const renderAttachmentLoading = () => (
      <FullFlexBlock>
        <SkeletonPlaceholder
          backgroundColor={theme.colors.base_90}
          borderRadius={10}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={202}
              marginRight={4}
              marginTop={5}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </FullFlexBlock>
    );
    const renderTextView = () => (
      <MessageContainerThread>
        <MessageText>{item?.content}</MessageText>
      </MessageContainerThread>
    );
    const renderViewAnalyis = () => {
      const haveType = item?.attachments[0]?.type;
      return (
        <ViewAnalysisContainer>
          <SentAnAnalysisText>{t('SENT_AN_ANALYSIS')}</SentAnAnalysisText>
          <AnalysisContainer>
            {haveType ? (
              <AMButton onPress={() => onMessageOptionPressEvent(type, item)}>
                <>
                  <SvgIcon
                    icon={
                      type === MessageType.AttachmentStyleAnalysis
                        ? Analysis.AttachmentStyleChatSvgIcon
                        : Analysis.RelationshipStatusChatSvgIcon
                    }
                  />
                  <MultipleImageIcon />
                </>
              </AMButton>
            ) : (
              renderAttachmentLoading()
            )}
          </AnalysisContainer>
        </ViewAnalysisContainer>
      );
    };

    return (
      <ViewAnalysisContainer>
        <AnalysisRowContainer>
          <ViewAnalysisStick />
          {renderViewAnalyis()}
        </AnalysisRowContainer>
        {renderTextView()}
      </ViewAnalysisContainer>
    );
  },
);

export default ViewAttachmentStylesCell;
