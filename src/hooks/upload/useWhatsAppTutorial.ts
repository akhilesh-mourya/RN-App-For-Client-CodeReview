import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {unzip} from 'react-native-zip-archive';
import RNFS from 'react-native-fs';
import {ErroPopupType, SCREEN_NAME} from '../../enums';
import {
  WhatsAppIOSTutorial,
  WhatsAppAndroidTutorial,
  getIndexOfMatchesAuthorWithExistingRelation,
} from '../../helpers/commonFunctions';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import {useLoader} from '../loader/useLoader';
import * as whatsapp from 'whatsapp-chat-parser';
import {
  configureWhatsappContentList,
  getAuthorsFromUploadedChat,
} from '../../utility';
import {AuthorsListType, UploadedChatListType} from '../../types';
import {useTranslation} from 'react-i18next';
import {PRESS_UPLOAD_WHATSAPP_FILE} from '../../constants/mixPanelEventsConstants';
import {useEffect} from 'react';
import {useAnalytics} from '../../services/analytics';
import useAuth from '../context/useAuth';

export const useWhatsAppTutorial = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {showLoader, hideLoader, showErrorMessage} = useLoader();
  const {params} = useRoute();
  const {authContextData} = useAuth();
  const {
    isFromChat = false,
    isFromAnalysis = false,
    relationShipData = null,
  }: any = params || {};
  const stepsArray = IS_IOS_PLATFORM
    ? WhatsAppIOSTutorial
    : WhatsAppAndroidTutorial;

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewUploadWhatsappTutorialScreen();
  }, [analytics]);

  const onUploadPress = () => {
    analytics.trackTouchUploadWhatsappFileOnWhatsappTutorialScreen();

    DocumentPicker.pickSingle({
      presentationStyle: 'formSheet',
      type: [DocumentPicker.types.plainText, DocumentPicker.types.zip],
    })
      .then(async docRes => {
        showLoader();
        analytics.trackSubmitWhatsappFileOnWhatsappTutorialScreen(
          docRes?.name || '',
          docRes?.type || '',
          docRes?.size || 0,
        );

        if (IS_IOS_PLATFORM) {
          const SourceFile = `/${docRes?.uri
            .replace(/^file:\/\/\//g, '')
            .replaceAll('%20', ' ')}`;

          if (docRes?.type === 'application/zip') {
            unZipIosDoc(SourceFile, `${RNFS.CachesDirectoryPath}`);
          } else if (docRes?.type === 'text/plain') {
            readFileAndUploadChat(SourceFile);
          } else {
            showErrorMessage({
              errorMessage: t('wrong_chat_format_Error'),
              errorPopupType: ErroPopupType.OnlyError,
            });
          }
        } else {
          if (docRes?.type === 'application/zip') {
            if (docRes?.uri?.startsWith('content://')) {
              const destPath = `${RNFS.CachesDirectoryPath}/${docRes?.name}`;
              await RNFS.copyFile(docRes?.uri, destPath);
              unZipIosDoc(destPath, `${RNFS.CachesDirectoryPath}`);
            } else {
              unZipIosDoc(docRes?.uri, `${RNFS.CachesDirectoryPath}`);
            }
          } else if (docRes?.type === 'text/plain') {
            readFileAndUploadChat(docRes?.uri); // android
          } else {
            showErrorMessage({
              errorMessage: t('wrong_chat_format_Error'),
              errorPopupType: ErroPopupType.OnlyError,
            });
          }
        }
      })
      .catch(error => {
        hideLoader();
      });
  };

  const unZipIosDoc = (sourcePath: string, targetPath: string) => {
    unzip(sourcePath, targetPath)
      .then(async path => {
        const formatedPath = `${path}/${'_chat.txt'}`;
        readFileAndUploadChat(formatedPath); // iOS
      })
      .catch(error => {
        hideLoader();
      });
  };

  const readFileAndUploadChat = async (formatedPath: string) => {
    const contents = await RNFS.readFile(formatedPath);
    const realContent = whatsapp.parseString(contents);
    // console.log('Real Content', realContent);
    hideLoader();
    const dataList = configureWhatsappContentList(realContent);
    const authorsList = getAuthorsFromUploadedChat(dataList);
    checkForUploadedChatValidity(authorsList || [], dataList);
  };

  const checkForUploadedChatValidity = (
    authorsList: AuthorsListType,
    dataList: UploadedChatListType,
  ) => {
    if (authorsList?.length === 0) {
      showErrorMessage({
        errorMessage: t('Chat_Not_Detected_Error'),
        errorPopupType: ErroPopupType.OnlyError,
      });
      return;
    } else if (authorsList?.length === 1) {
      showErrorMessage({
        errorMessage: t('Onlt_One_Sender_In_Chat_Error'),
        errorPopupType: ErroPopupType.OnlyError,
      });
      return;
    } else if (authorsList?.length > 2) {
      showErrorMessage({
        errorMessage: t('Group_Chat_Uploaded_Error'),
        errorPopupType: ErroPopupType.OnlyError,
      });
      return;
    } else {
      redirectToWhatsappQuestionnire(dataList, authorsList);
    }
  };

  const getScreenNameToredirect = (
    authorsList: AuthorsListType,
    relationShipData: any,
  ) => {
    let screenName = SCREEN_NAME.FillWhatappQuestionnaireScreen;
    if (isFromAnalysis) {
      const prevName =
        relationShipData?.inputs?.length > 0
          ? relationShipData?.inputs[0]?.object
          : ''; // Here taking Object
      const matchIndex = getIndexOfMatchesAuthorWithExistingRelation(
        authorsList,
        prevName,
      );
      if (matchIndex >= 0) {
        // Uploaded Same Chat Case
        screenName = SCREEN_NAME?.FillWhatsAppQuitionnarireForAnalysisScreen;
      }
    }
    return screenName;
  };

  const redirectToWhatsappQuestionnire = (
    dataList: UploadedChatListType,
    authorsList: AuthorsListType,
  ) => {
    authContextData?.setCurrCreateRelationshipData(null);
    const screenName = getScreenNameToredirect(authorsList, relationShipData);
    navigation.navigate(screenName, {
      isFromWhatsAppUpload: true,
      messagesList: dataList,
      authorsList: authorsList,
      relationShipData: relationShipData,
      isFromChat: isFromChat,
      isFromUpdateAndDiffConv: isFromAnalysis,
    });
  };

  return {
    onUploadPress,
    redirectToWhatsappQuestionnire,
    stepsArray,
  };
};
