/**
 * All Commonly used functions will goes here
 */
import {parsePhoneNumber} from 'awesome-phonenumber';
import i18next from 'i18next';
import moment from 'moment';
import {
  IMESSAGE_UPLOAD_FOUR_IMAGE,
  IMESSAGE_UPLOAD_ONE_IMAGE,
  IMESSAGE_UPLOAD_THREE_IMAGE,
  IMESSAGE_UPLOAD_TWO_IMAGE,
  WHATSAPP_UPLOAD_FIVE_ANDROID_IMAGE,
  WHATSAPP_UPLOAD_FOUR_ANDROID_IMAGE,
  WHATSAPP_UPLOAD_FOUR_IMAGE,
  WHATSAPP_UPLOAD_ONE_ANDROID_IMAGE,
  WHATSAPP_UPLOAD_ONE_IMAGE,
  WHATSAPP_UPLOAD_THREE_ANDROID_IMAGE,
  WHATSAPP_UPLOAD_THREE_IMAGE,
  WHATSAPP_UPLOAD_TWO_ANDROID_IMAGE,
  WHATSAPP_UPLOAD_TWO_IMAGE,
} from '../constants/imageConstants';
import {
  AnalysisListEnum,
  MessageStatusEnum,
  RelationshipGoal,
  RelationshipStatus,
} from '../enums';
import {AnalysysItemType} from '../types';
import {UserDataType} from '../../@types/context';
import DeviceInfo from 'react-native-device-info';

export const formatNumberAndCheckValidity = (
  phoneNumber: string,
  countryCode: any,
) => {
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, {
    regionCode: countryCode,
  });
  const filteredNumber =
    parsedPhoneNumber?.number?.significant || parsedPhoneNumber?.number?.input;
  const cleanedNumber = filteredNumber?.replace(/\D/g, '');
  const formattedNumber = cleanedNumber?.replace(
    /(\d{3})(\d{3})?(\d{1,4})?/,
    (_, part1, part2, part3) => {
      let result = part1;
      if (part2) {
        result += `-${part2}`;
      }
      if (part3) {
        result += `-${part3}`;
      }
      return result;
    },
  );
  return {
    formattedNum: formattedNumber, //parsedPhoneNumber.number?.input,
    isValidNum: parsedPhoneNumber.valid,
  };
};

export const formatNumberBeforeCall = (phoneNumber: string) => {
  return phoneNumber.replaceAll('-', '');
};

export const formatDOBDate = (date: any = '') => {
  return moment(date).format('MM/DD/YYYY');
};

export const isValidDOb = (dob: any = '') => {
  const today = moment();
  const age = moment.duration(today.diff(dob)).asYears();
  return age >= 18;
};

export const capitalizeFirstLater = (label: string = '') => {
  if (label && typeof label === 'string') {
    return label?.charAt(0).toUpperCase() + label?.slice(1);
  } else {
    return '';
  }
};

export const mixpanelPropertiesValueCapitalization = (
  key: string = '',
  value: string = '',
) => {
  if (value && typeof value === 'string') {
    if (key === 'chat type') {
      return value.toLowerCase() === 'imessage'
        ? 'iMessage'
        : value?.charAt(0).toUpperCase() + value?.slice(1);
    } else {
      return value?.charAt(0).toUpperCase() + value?.slice(1);
    }
  } else {
    return value;
  }
};

export const getNameInitials = (nameString: string = '') => {
  return nameString
    .match(/(\b\S)?/g)
    .join('')
    .match(/(^\S|\S$)?/g)
    .join('')
    .toUpperCase();
};

export const getOnltFirstLatterOfName = (nameString: string = '') => {
  let latter = '';
  if (nameString?.length > 0) {
    latter = nameString.charAt(0).toUpperCase();
  }
  return latter;
};

export const getFullNameForReferList = (contactData: any) => {
  const name =
    contactData?.givenName && contactData?.familyName
      ? `${contactData?.givenName} ${contactData?.familyName}`
      : contactData?.givenName
      ? `${contactData?.givenName}`
      : `${contactData?.familyName}`;
  return name;
};

export const getNameForInviteMsg = (contactData: any) => {
  const name = contactData?.givenName
    ? `${contactData?.givenName}`
    : contactData?.familyName
    ? `${contactData?.familyName}`
    : `${contactData?.familyName}`;
  return name;
};

export const getFirstAndLastNameFromString = (name: string = '') => {
  var first_name = name.split(' ')[0];
  var last_name = name.substring(first_name.length).trim();
  return {
    first_name: first_name,
    last_name: last_name,
  };
};

export const getOnlyFirstName = (fullName: string = '') => {
  const nameArray = fullName.split(' ');
  const firstName = nameArray[0];
  return firstName;
};

export const relationshipStatusList = [
  {title: i18next.t('Single'), value: RelationshipStatus.Single},
  {
    title: i18next.t('Talking_To_Someone'),
    value: RelationshipStatus.TalkingToSomeone,
  },
  {
    title: i18next.t('In_Exclusive_Relation'),
    value: RelationshipStatus.InAnExclusiveRelationship,
  },
  {
    title: i18next.t('In_Open_Relation'),
    value: RelationshipStatus.InAnOpenRelationship,
  },
  {title: i18next.t('Married'), value: RelationshipStatus.Married},
  {title: i18next.t('Divorced'), value: RelationshipStatus.Divorced},
  {title: i18next.t('Complicated'), value: RelationshipStatus.Complicated},
  // {title: i18next.t('Ques1_Option3'), value: 'custom'},
];

export const relationshipGoalsList = [
  {title: i18next.t('Date casually'), value: RelationshipGoal.Casual},
  {
    title: i18next.t('Be_In_Long_Term_Relation'),
    value: RelationshipGoal.LongTermRelationship,
  },
  {title: i18next.t('Dating_To_Marry'), value: RelationshipGoal.Marry},
  {
    title: i18next.t('Figuring_Out_Dating_Goals'),
    value: RelationshipGoal.FiguringOut,
  },
  {
    title: i18next.t('Taking_Break_From_Dating'),
    value: RelationshipGoal.TakingABreak,
  },
  // {title: i18next.t('Ques1_Option3'), value: 'custom'},
];

export const WhatsAppIOSTutorial = [
  {
    image: WHATSAPP_UPLOAD_ONE_IMAGE,
    number: 1,
    label: i18next.t('WhatsApp_Upload_One_Des'),
  },
  {
    image: WHATSAPP_UPLOAD_TWO_IMAGE,
    number: 2,
    label: i18next.t('Press_Export_Chat'),
  },
  {
    image: WHATSAPP_UPLOAD_THREE_IMAGE,
    number: 3,
    label: i18next.t('Select_Without_Media'),
  },
  {
    image: WHATSAPP_UPLOAD_FOUR_IMAGE,
    number: 4,
    label: i18next.t('Tap_Save_To_Files'),
  },
];

export const WhatsAppAndroidTutorial = [
  {
    image: WHATSAPP_UPLOAD_ONE_ANDROID_IMAGE,
    number: 1,
    label: i18next.t('WhatsApp_Android_One_Hint'),
  },
  {
    image: WHATSAPP_UPLOAD_TWO_ANDROID_IMAGE,
    number: 2,
    label: i18next.t('WhatsApp_Android_Two_Hint'),
  },
  {
    image: WHATSAPP_UPLOAD_THREE_ANDROID_IMAGE,
    number: 3,
    label: i18next.t('WhatsApp_Android_Three_Hint'),
  },
  {
    image: WHATSAPP_UPLOAD_FOUR_ANDROID_IMAGE,
    number: 4,
    label: i18next.t('WhatsApp_Android_Four_Hint'),
  },
  {
    image: WHATSAPP_UPLOAD_FIVE_ANDROID_IMAGE,
    number: 5,
    label: i18next.t('WhatsApp_Android_Five_Hint'),
  },
];

export const IMessageTutorial = [
  {
    image: IMESSAGE_UPLOAD_ONE_IMAGE,
    number: 2,
    label: i18next.t('IMessage_Upload_Description_One'),
  },
  {
    image: IMESSAGE_UPLOAD_TWO_IMAGE,
    number: 3,
    label: i18next.t('IMessage_Upload_Description_Two'),
    sublabel: i18next.t('IMessage_Upload_Sub_Description_Two'),
  },
  {
    image: IMESSAGE_UPLOAD_THREE_IMAGE,
    number: 4,
    label: i18next.t('IMessage_Upload_Description_Three'),
  },
  {
    image: IMESSAGE_UPLOAD_FOUR_IMAGE,
    number: 5,
    label: i18next.t('IMessage_Upload_Description_FOUR'),
    showDivider: false,
  },
];

export const ProgressList = [{}, {}, {}, {}, {}, {}];

export const AnalysisDataList = [
  {
    header: i18next.t('Analysis_Header_One'),
    description: i18next.t('Analysis_Des_One'),
    value: AnalysisListEnum.RelationshipHealthStatus,
  },
  {
    header: i18next.t('Analysis_Header_Two'),
    description: i18next.t('Analysis_Des_Two'),
    value: AnalysisListEnum.AttachmentStyle,
  },
  {
    header: i18next.t('Analysis_Header_Three'),
    description: i18next.t('Analysis_Des_Three'),
    value: AnalysisListEnum.Communication,
  },
  {
    header: i18next.t('Analysis_Header_Four'),
    description: i18next.t('Analysis_Des_Four'),
    value: AnalysisListEnum.Highlights,
  },
  {
    header: i18next.t('Analysis_Header_Five'),
    description: i18next.t('Analysis_Des_Five'),
    value: AnalysisListEnum.Lowlights,
  },
  {
    header: i18next.t('Analysis_Header_Six'),
    description: i18next.t('Analysis_Des_Six'),
    value: AnalysisListEnum.CuteMoments,
  },
  {
    header: i18next.t('Analysis_Header_Seven'),
    description: i18next.t('Analysis_Des_Seven'),
    value: AnalysisListEnum.Sexiness,
  },
  {
    header: i18next.t('Analysis_Header_Eight'),
    description: i18next.t('Analysis_Des_Eight'),
    value: AnalysisListEnum.YourFlags,
  },
];

export const getLastSyncedDate = (date: any = '') => {
  return `${moment(date).format('M/D/YYYY')} at ${moment(date).format(
    'h:mm A',
  )}`;
};

export const getInTimeFormat = (date: any = '') => {
  return `${moment(date).format('h:mm A')}`;
};

export const getRelationshipTypeOnAnalysys = (type: string) => {
  const filteredAnalysys = AnalysisDataList.find(
    analysys => analysys?.value === type,
  );
  return filteredAnalysys?.header || '';
};

export const getRelationshipStatusOnAnalysys = (status: string) => {
  let _status = i18next.t('Analysys_Status_In_Que');
  switch (status) {
    case MessageStatusEnum?.MessageProcessStatusInQueue:
      _status = i18next.t('Analysys_Status_In_Que');
      break;
    case MessageStatusEnum?.MessageProcessStatusSucceeded:
      _status = i18next.t('Analysys_Status_Done');
      break;
    default:
      break;
  }
  return _status;
};

export const isSelectedAnalysysAlreadyExist = (
  analysysList: Array<AnalysysItemType> = [],
  selectedAnalysys = '',
) => {
  return analysysList?.some(item => item?.type === selectedAnalysys);
};

export const getIndexOfMatchesAuthor = (
  authorsList: Array<string>,
  userData: UserDataType,
) => {
  const userName = `${userData?.firstName}${
    userData?.lastName ? ` ${userData?.lastName}` : ''
  }`;
  let matchIndex = -1;
  authorsList?.map((data, index) => {
    const chatFirstName = data?.split(' ')?.[0];
    if (
      chatFirstName &&
      chatFirstName?.toLowerCase() === userData?.firstName?.toLowerCase()
    ) {
      matchIndex = index;
    } else if (isNameMatch(data, userName)) {
      matchIndex = index;
    }
  });
  return matchIndex;
};

export const getIndexOfMatchesAuthorWithExistingRelation = (
  authorsList: Array<string>,
  prevName: string,
) => {
  let matchIndex = -1;
  authorsList?.map((data, index) => {
    const chatFirstName = data?.split(' ')?.[0];
    const prevFirstName = prevName?.split(' ')?.[0];
    if (
      chatFirstName &&
      chatFirstName?.toLowerCase() === prevFirstName?.toLowerCase()
    ) {
      matchIndex = index;
    } else if (isNameMatch(data, prevName)) {
      matchIndex = index;
    }
  });
  return matchIndex;
};

export const isNameMatch = (name1: string, name2: string) => {
  const lowerName1 = name1.toLowerCase();
  const lowerName2 = name2.toLowerCase();
  const minLength = Math.min(lowerName1.length, lowerName2.length);
  let matchingCount = 0;
  for (let i = 0; i < minLength; i++) {
    if (lowerName1[i] === lowerName2[i]) {
      matchingCount++;
    }
  }
  const matchPercentage = (matchingCount / minLength) * 100;
  return matchPercentage >= 40;
};

export const getFormatDateForAnalysis = (inputDate: string) => {
  const currentDate = new Date();
  const inputDateTime = new Date(inputDate);

  // Calculate the time difference in seconds
  const timeDifference = Math.floor((currentDate - inputDateTime) / 1000);

  // Check if it's older than 1 day
  if (timeDifference >= 24 * 60 * 60) {
    const formattedDate = inputDateTime.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
    return formattedDate;
  }

  // Check if it's the same day
  if (timeDifference < 24 * 60 * 60 && timeDifference > 0) {
    const formattedTime = inputDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formattedTime;
  }

  // If it's just some seconds ago
  return 'Just now';
};

export const checkForApiVersionIsGreater = (
  apiVersion: any = '1.0.0',
  appVersion: any = DeviceInfo?.getVersion(),
) => {
  const currentParts = apiVersion.split('.').map(Number);
  const oldParts = appVersion.split('.').map(Number);
  for (let i = 0; i < currentParts.length; i++) {
    if ((oldParts[i] || 0) < currentParts[i]) {
      return true;
    } else if ((oldParts[i] || 0) > currentParts[i]) {
      return false;
    }
  }
  return false;
};

export const removeHttpsPrefix = (webLink: string) => {
  const httpsPrefix = 'https://';
  const httpPrefix = 'http://';
  if (webLink.startsWith(httpsPrefix)) {
    return webLink.substring(httpsPrefix.length);
  } else if (webLink.startsWith(httpPrefix)) {
    return webLink.substring(httpPrefix.length);
  }
  return webLink;
};

export const isTimeDifferenceGreaterThan60Seconds = (
  date1: any,
  date2: any,
) => {
  const timeDifference = Math.abs(date1 - date2);
  const timeDifferenceInSeconds = timeDifference / 1000;
  return timeDifferenceInSeconds > 60;
};

export const getRelationshipSectionDetail = (
  index: number = 0,
  isAttachmentStyle: boolean = false,
) => {
  const attachmentStyleArr = [
    'your results',
    'your attachment style',
    'your attachment style snippet',
    'their attachment style',
    'their attachment style snippet',
    'summary',
  ];
  const relationshipHealthArr = [
    'your results',
    'strengths in your relationship',
    'strengths snippet',
    'concerns to watch out for',
    'concerns snippet',
    'things to work on',
  ];
  const arrayToProcess = isAttachmentStyle
    ? attachmentStyleArr
    : relationshipHealthArr;
  const arrayIndex = index < 0 ? 0 : index;
  return arrayToProcess[arrayIndex];
};
