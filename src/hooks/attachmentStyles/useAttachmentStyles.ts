import {useEffect, useState, useRef} from 'react';
import {
  ProgressList,
  getRelationshipSectionDetail,
} from '../../helpers/commonFunctions';
import SendSMS from 'react-native-sms';
import {Dimensions, Keyboard, PermissionsAndroid, Platform} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import {MixpanelData} from '../../constants/enums';
import {useAnalytics} from '../../services/analytics';
import DeviceInfo from 'react-native-device-info';

export const useAttachmentStyles = (props: any) => {
  const progressList = ProgressList || [];
  const {analysisData, isVisible, expandedAttachmentRef} = props;
  const [step, setStep] = useState(1);
  const [resultScore, setResultScore] = useState(20);
  const [resultDescription, setResultDescription] = useState('');
  const [yourStyle, setYourStyle] = useState('ANXIOUS_AVOIDANT');
  const [yourStyleDescritpion, setYourStyleDescription] = useState('');
  const [yourSnippetHeader, setYourSnippetHeader] = useState('');
  const [yourSnippetFooter, setYourSnippetFooter] = useState('');
  const [yourSnippetMessageList, setYourSnippetMessageList] = useState();
  const [yourPartnerStyle, setYourPartnerStyle] = useState('');
  const [yourPartnerStyleDescription, setYourPartnerStyleDescription] =
    useState('');
  const [yourPartnerSnippetHeader, setYourPartnerSnippetHeader] = useState('');
  const [yourPartnerSnippetFooter, setYourPartnerSnippetFooter] = useState('');
  const [yourPartnerSnippetMessageList, setYourPartnerSnippetMessageList] =
    useState();
  const [summaryStyle, setSummaryStyle] = useState('');
  const [summaryDetails, setSummaryDetails] = useState('');

  const compareWidth = Dimensions.get('screen').width / 2;

  const updateStep = (stepVal: number) => {
    setStep(stepVal);
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const viewShot = useRef(null);
  const analytics = useAnalytics();

  useEffect(() => {
    if (analysisData?.body) {
      const body = JSON.parse(analysisData?.body);
      const section = body?.sections;
      const results = section?.results;
      const yourAttachmentStyleData = section?.yourAttachmentStyle;
      const yourStyleSnippet =
        section?.yourAttachmentStyleExample || yourAttachmentStyleData?.snippet;
      const yourPartnerAttachmentStyleData = section?.theirAttachmentStyle;
      const yourPartnerSnippet =
        section?.theirAttachmentStyleExample ||
        yourPartnerAttachmentStyleData?.snippet;
      const summary = section?.summary;
      setYourStyle(yourAttachmentStyleData?.type);
      setYourStyleDescription(yourAttachmentStyleData?.description);
      setResultScore(results?.score * 100);
      setResultDescription(results?.description);
      setYourSnippetHeader(yourStyleSnippet?.header);
      setYourSnippetFooter(yourStyleSnippet?.footer);
      setYourSnippetMessageList(yourStyleSnippet?.messages);
      setYourPartnerStyle(yourPartnerAttachmentStyleData?.type);
      setYourPartnerStyleDescription(
        yourPartnerAttachmentStyleData?.description,
      );
      setYourPartnerSnippetHeader(yourPartnerSnippet?.header);
      setYourPartnerSnippetFooter(yourPartnerSnippet?.footer);
      setYourPartnerSnippetMessageList(yourPartnerSnippet?.messages);
      setSummaryStyle(summary?.type);
      setSummaryDetails(summary?.description);
    }
  }, [analysisData]);

  useEffect(() => {
    if (isVisible && analysisData) {
      const analysisId = analysisData.id;
      const analysisType = analysisData.type;
      analytics.trackViewAnalysisDetailScreen(
        analysisId,
        MixpanelData[analysisType],
      );
    }
  }, [analysisData, isVisible]);

  useEffect(() => {
    if (isVisible) {
      const section = getRelationshipSectionDetail(step - 1, true);
      analytics.trackViewSectionOnAnalysisDetailScreen(
        analysisData.id,
        section,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, step]);

  const captureScreen = () => {
    analytics.trackTouchShareButtonOnAnalysisDetailScreen(
      analysisData?.id,
      getRelationshipSectionDetail(step - 1, true),
    );
    let deviceVersion: any = DeviceInfo.getSystemVersion();
    if (Platform.OS === 'android' && deviceVersion < 13) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

        {
          title: 'Storage Permission',

          message:
            'This app needs access to your device storage to save screenshots.',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      ).then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          captureScreenshot();
        }
      });
    } else {
      captureScreenshot();
    }
  };

  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const captureScreenshot = async () => {
    const uri = await captureRef(viewShot, {
      format: 'jpg',
      quality: 0.1,
      result: 'tmpfile',
    });
    const attachment = {
      url: Platform.OS === 'android' ? `${uri}` : `file:/${uri}`,
      iosType: 'new-image.jpg',
      iosFilename: 'my-image.jpg',
      androidType: 'image/*',
    };
    switch (Platform.OS) {
      case 'android':
        await share({
          title: 'Sharing image file from awesome share app',
          message: 'Please take a look at this image',
          url: uri,
        });
        break;
      case 'ios':
        SendSMS.send(
          {
            body: '',
            recipients: [],
            successTypes: ['all', 'sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true,
            attachment,
          },
          (completed, cancelled, error) => {
            Keyboard.dismiss();
            // Success CallBack
            console.log('Log', completed, cancelled, error);
          },
        );
        break;
    }
  };

  return {
    step,
    progressList,
    resultScore,
    resultDescription,
    yourStyle,
    yourStyleDescritpion,
    yourSnippetHeader,
    yourSnippetFooter,
    yourSnippetMessageList,
    yourPartnerStyle,
    yourPartnerStyleDescription,
    yourPartnerSnippetHeader,
    yourPartnerSnippetFooter,
    yourPartnerSnippetMessageList,
    summaryStyle,
    summaryDetails,
    viewShot,
    compareWidth,
    analysisData,
    isVisible,
    captureScreen,
    previousStep,
    updateStep,
    setStep,
  };
};
