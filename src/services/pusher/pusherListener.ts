import {
  getRelationshipsData,
  getiMessageUploadInfo,
} from '../../apiServices/main';
import {MessageContentEnum, SCREEN_NAME} from '../../enums';
import {
  getCurrentRouteName,
  navigationRef,
} from '../../navigation/navigationHelper';
import {
  addMessagesDataInDB,
  shouldIgnoreMessage,
  updateChoicesMsgIntoDB,
} from '../../utility/chatUtility';
import {useAnalytics} from '../analytics';
import {MixpanelData} from '../../constants/enums';
import Emitter from '../../eventService';

const PusherListener = () => {
  const analytics = useAnalytics();

  const oniMessageUploadListener = async (uploadData: any) => {
    try {
      const data = await getiMessageUploadInfo(uploadData?.id);
      if (data?.senders?.length > 0) {
        navigationRef.current?.navigate(SCREEN_NAME.IMessageSyncedModalScreen, {
          iMessageInfo: data,
          uploadData: uploadData,
        });
      }
    } catch (error) {
      console.log('PUSHER oniMessageUploadListener error: ', error);
    }
  };

  const onNewMessageListener = async (data: any) => {
    try {
      if (
        data?.question?.choices?.length > 0 &&
        data?.question?.id === 'upload_conversation'
      ) {
        analytics.trackViewUploadConversationMessage();
      }
      if (!shouldIgnoreMessage(data)) {
        switch (data?.content) {
          case MessageContentEnum.YouFillQuestionnaire:
            analytics.trackViewFilledOutMessage();
            break;
        }
        if (data?.attachments?.length > 0) {
          if (data?.attachments[0].contentType === 'analysis') {
            try {
              Emitter.emit('analysis_ready', data)
              const response = await getRelationshipsData();
              const channelId = data?.channelId;
              const relationshipsList = response?.data;
              const filterList = relationshipsList.filter(
                item => item?.channel?.id === channelId,
              );
              if (filterList) {
                const relationshipData = filterList[0];
                const inputs = relationshipData.inputs;
                analytics.trackReceiveAnAnalysis(
                  inputs.length > 0 ? inputs[0].source : '',
                  relationshipData?.name,
                  MixpanelData[inputs[0].objectPronoun] || '',
                  MixpanelData[relationshipData?.connection] || '',
                );
              }
            } catch (error) {
              console.log('Catch ===', error)
            }
          }
        }
        try {
          // To update Home screen last message If on Home Screen
          if (getCurrentRouteName() === SCREEN_NAME.HomeScreen) {
            global?.channelRefetch && global?.channelRefetch();
          }
          addMessagesDataInDB([data], data?.channelId, true);
        } catch (error) {
          addMessagesDataInDB([data], data?.channelId, true);
        }
      }
    } catch (error) {
      console.log('PUSHER onNewMessageListener error: ', error);
    }
  };

  const onUpdateMessageListener = async (data: any) => {
    try {
      if (
        data?.question?.choices?.length > 0 &&
        data?.question?.id === 'upload_conversation'
      ) {
        updateChoicesMsgIntoDB({
          message_id: data?.id,
          ...data?.question?.choices[0],
        });
      }
    } catch (error) {
      console.log('PUSHER onUpdateMessageListener error: ', error);
    }
  };

  return {
    oniMessageUploadListener,
    onNewMessageListener,
    onUpdateMessageListener,
  };
};

export default PusherListener;
