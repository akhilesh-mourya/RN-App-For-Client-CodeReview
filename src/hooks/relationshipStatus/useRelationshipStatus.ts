import {useEffect, useRef, useState} from 'react';
import {
  ProgressList,
  getRelationshipSectionDetail,
} from '../../helpers/commonFunctions';
import {captureRef} from 'react-native-view-shot';
import SendSMS from 'react-native-sms';
import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import Share from 'react-native-share';
import {useAnalytics} from '../../services/analytics';
import {MixpanelData} from '../../constants/enums';
import DeviceInfo from 'react-native-device-info';

export const useRelationshipStatus = (props: any) => {
  const [step, setStep] = useState(1);
  const progressList = ProgressList || [];
  const {analysisData, isVisible, expandedAttachmentRef} = props;
  const [resultScore, setResultScore] = useState(20);
  const [resultDescription, setResultDescription] = useState('');
  const [yourStatusDescritpion, setYourStatusDescription] = useState('');
  const [yourSnippetHeader, setYourSnippetHeader] = useState('');
  const [yourSnippetFooter, setYourSnippetFooter] = useState('');
  const [yourSnippetMessageList, setYourSnippetMessageList] = useState();
  const [yourPartnerStatusDescription, setYourPartnerStatusDescription] =
    useState('');
  const [yourPartnerSnippetHeader, setYourPartnerSnippetHeader] = useState('');
  const [yourPartnerSnippetFooter, setYourPartnerSnippetFooter] = useState('');
  const [yourPartnerSnippetMessageList, setYourPartnerSnippetMessageList] =
    useState();
  const [summaryDetails, setSummaryDetails] = useState('');
  const compareWidth = Dimensions.get('screen').width / 2;
  const analytics = useAnalytics();
  const viewShot = useRef(null);

  useEffect(() => {
    if (analysisData?.body) {
      let _body = analysisData?.body;
      const body = JSON.parse(_body);
      const section = body?.sections;
      const results = section?.results;
      const yourData = section?.strengths || section?.strength;
      const yourSnippet =
        section?.yourAttachmentStyleExample || yourData?.snippet;
      const yourPartnerData = section?.concerns;
      const yourPartnerSnippet =
        section?.theirAttachmentStyleExample || yourPartnerData?.snippet;
      const summary = section?.summary;
      setResultScore(results?.score * 100);
      setResultDescription(results?.description);
      setYourStatusDescription(yourData?.description);
      setYourSnippetHeader(yourSnippet?.header);
      setYourSnippetFooter(yourSnippet?.footer);
      setYourSnippetMessageList(yourSnippet?.messages);
      setYourPartnerStatusDescription(yourPartnerData?.description);
      setYourPartnerSnippetHeader(yourPartnerSnippet?.header);
      setYourPartnerSnippetFooter(yourPartnerSnippet?.footer);
      setYourPartnerSnippetMessageList(yourPartnerSnippet?.messages);
      setSummaryDetails(summary?.description);
    }
  }, [analysisData]);

  const updateStep = (stepVal: number) => {
    setStep(stepVal);
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const captureScreen = () => {
    analytics.trackTouchShareButtonOnAnalysisDetailScreen(
      analysisData?.id,
      MixpanelData[analysisData?.type],
      getRelationshipSectionDetail(step - 1, false),
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
      const section = getRelationshipSectionDetail(step - 1, false);
      analytics.trackViewSectionOnAnalysisDetailScreen(
        analysisData.id,
        section,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, step]);

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
      url: `file:/${uri}`,
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
    yourStatusDescritpion,
    yourSnippetHeader,
    yourSnippetFooter,
    yourSnippetMessageList,
    yourPartnerStatusDescription,
    yourPartnerSnippetHeader,
    yourPartnerSnippetFooter,
    yourPartnerSnippetMessageList,
    summaryDetails,
    viewShot,
    compareWidth,
    analysisData,
    isVisible,
    captureScreen,
    updateStep,
    previousStep,
  };
};
