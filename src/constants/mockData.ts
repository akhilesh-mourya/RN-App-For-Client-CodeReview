import i18next from 'i18next';
import {
  CHRISTIE_SVG_ICON,
  GRACE_SVG_ICON,
  JOSH_SVG_ICON,
} from '../assets/svg/personality';
import {
  CreateRelationPronoun,
  CreateRelationshipType,
  DeleteReason,
  Gender,
  GenderInterest,
} from '../enums';
import {IOS_APP_STORE_URL, MAC_APP_LINK} from './appContants';

export type PersonalityDataProps = {
  id: number;
  name: string;
  icon: any;
  title: string;
  description: string;
};

export type CoachDataProps = {
  id: string;
  name: string;
  subTitle: string;
  time: string;
  subject: string;
  type: string;
};

export type QuestionnaireProps = {
  gender?: string;
  genderInterest?: string;
  pronoun?: string;
  relationshipStatus?: string;
  relationshipType?: string;
  relationshipStatusCustom?: string;
  relationshipTypeCustom?: string;
};

export type WhatsappRelationshipProps = {
  connection: string;
  name: string;
  objectPronoun: string;
  initialAnalysisType: string;
  uploadId: string;
  relationshipId: string;
  isAlreadyExist: boolean;
  otherUserName: string;
};

export type RelationshipDataProps = {
  id: number;
  name: string;
  subTitle: string;
  time: string;
  isUnread?: boolean;
  channel?: any;
};

export const PERSONALITY_DUMMY_LIST: PersonalityDataProps[] = [
  {
    id: 1,
    name: 'Christie',
    icon: CHRISTIE_SVG_ICON,
    title: 'The Blunt Bestie',
    description:
      "Christie is your brutally honest friend who tells it like it is. She doesn't hold back and provides frank, sassy advice that’s straight to the point.",
  },
  {
    id: 2,
    name: 'Josh',
    icon: JOSH_SVG_ICON,
    title: 'The Boy Next Door',
    description:
      'Josh is your neighborhood nice guy who’s always ready to listen, understand, and share insights to make your dating journey more enjoyable.',
  },
  {
    id: 3,
    name: 'Grace',
    icon: GRACE_SVG_ICON,
    title: 'The Analytical Guru',
    description:
      'Grace approaches problems with a logical mindset. Talking to her feels like consulting a professional advisor who provides data-driven insights.',
  },
];

export const COACH_ITEM: CoachDataProps = {
  id: 1,
  name: 'Christie',
  subTitle: 'Hey there, I’m Christie...',
  time: '7:24 PM',
};

export const RELATIONSHIP_ITEM: RelationshipDataProps = {
  id: 1,
  name: 'George',
  subTitle: 'Nice job completing...',
  time: '7:24 PM',
  isUnread: true,
};

export const CHAT_MESSAGES_DATA = [
  {
    _id: 16,
    text: 'Hi',
    createdAt: '2023-11-07T18:58:36.000Z',
    user: {
      _id: 2,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    _id: 15,
    text: 'Hello',
    createdAt: '2023-11-07T18:58:06.000Z',
    user: {
      _id: 1,
      name: 'Akhilesh Mourya',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  },
  {
    _id: 14,
    text: 'Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Ut enim blandit volutpat maecenas volutpat blandit.',
    createdAt: '2023-11-07T12:02:49.000Z',
    user: {
      _id: 2,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    _id: 13,
    text: 'Lorem ipsum dolor sit amet',
    createdAt: '2023-11-07T12:02:33.000Z',
    user: {
      _id: 1,
      name: 'Akhilesh Mourya',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  },
  {
    _id: 12,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    createdAt: '2023-11-07T12:02:20.000Z',
    user: {
      _id: 2,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    _id: 11,
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
    createdAt: '2023-11-07T12:01:59.000Z',
    user: {
      _id: 2,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    _id: 10,
    text: 'Yes',
    createdAt: '2023-11-06T15:17:36.000Z',
    user: {
      _id: 1,
      name: 'Akhilesh Mourya',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  },
  {
    _id: 9,
    text: 'Oh great! It should be a great day tomorrow',
    createdAt: '2023-11-06T15:17:25.000Z',
    user: {
      _id: 2,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    _id: 8,
    text: 'We will go at 12 PM at Glorry Spa, near 31 township',
    createdAt: '2023-11-06T15:16:59.000Z',
    user: {
      _id: 1,
      name: 'Akhilesh Mourya',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  },
  {
    _id: 7,
    text: 'Yes ofcourse I will come. When and where we have to go?',
    createdAt: '2023-11-06T15:15:52.000Z',
    user: {
      _id: 2,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
];

export const CHAT_BOT_MESSAGES_DATA = [
  {
    _id: 1,
    content:
      "Hey there, I’m Christie 👋 I'm here to help you navigate your dating life. I’ll be straight up with you, so don’t worry, I won’t be sugarcoating.",
    createdAt: '2023-08-05T18:58:06.000Z',
    user: {
      _id: 1,
      name: 'Akhilesh Mourya',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    contentType: 'text',
  },
  {
    _id: 2,
    content:
      'To get started, please fill out this questionnaire to help me understand your dating goals.',
    createdAt: '2023-08-05T18:58:06.000Z',
    user: {
      _id: 1,
      name: 'Alex Weitzman',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    contentType: 'fillQuestionnaire',
  },
];

export const GENDER_LIST = [
  {
    id: 1,
    name: 'Agender',
    value: Gender.Agender,
  },
  {
    id: 2,
    name: 'Androgynous',
    value: Gender.Androgynous,
  },
  {
    id: 3,
    name: 'Asexual',
    value: Gender.Asexual,
  },
  {
    id: 4,
    name: 'Bigender',
    value: Gender.Bigender,
  },
  {
    id: 5,
    name: 'Cis Man',
    value: Gender.CisMan,
  },
  {
    id: 6,
    name: 'Cis Woman',
    value: Gender.CisWoman,
  },
  {
    id: 7,
    name: 'Genderfluid',
    value: Gender.Genderfluid,
  },
  {
    id: 8,
    name: 'Genderqueer',
    value: Gender.Genderqueer,
  },
  {
    id: 9,
    name: 'Gender Nonconforming',
    value: Gender.GenderNonconforming,
  },
  {
    id: 10,
    name: 'Hijra',
    value: Gender.Hijra,
  },
  {
    id: 11,
    name: 'Intersex',
    value: Gender.Intersex,
  },
  {
    id: 12,
    name: 'Non-binary',
    value: Gender.NonBinary,
  },
  {
    id: 13,
    name: 'Other Gender',
    value: Gender.OtherGender,
  },
  {
    id: 14,
    name: 'Pangender',
    value: Gender.Pangender,
  },
  {
    id: 15,
    name: 'Transfeminine',
    value: Gender.Transfeminine,
  },
  {
    id: 16,
    name: 'Transgender',
    value: Gender.Transgender,
  },
  {
    id: 17,
    name: 'Trans Man',
    value: Gender.TransMan,
  },
  {
    id: 18,
    name: 'Transmasculine',
    value: Gender.Transmasculine,
  },
  {
    id: 19,
    name: 'Transexual',
    value: Gender.Transexual,
  },
  {
    id: 20,
    name: 'Trans Women',
    value: Gender.TransWomen,
  },
  {
    id: 21,
    name: 'Two Spirit',
    value: Gender.TwoSpirit,
  },
];

export const DUMMY_CHAT_MESSAGES = [
  {
    id: 493647970860531713,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 493647970604941313,
    contentType: 'text',
    content: 'Numquam ipsam voluptatem et dolore sed.',
    createdAt: '2023-12-28T12:31:59.387Z',
  },
  {
    id: 493647970860597249,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 493647970604941313,
    contentType: 'text',
    content: 'Odio debitis accusantium velit consectetur provident.',
    createdAt: '2023-12-28T12:30:59.387Z',
  },
  {
    id: 493647970860662785,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 493647970604941313,
    contentType: 'text',
    content: 'Neque voluptatem reprehenderit laudantium ullam aut.',
    createdAt: '2023-12-28T12:29:59.387Z',
  },
  {
    id: 493647970860728321,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 493647970604941313,
    contentType: 'text',
    content: 'Excepturi quis placeat deserunt iste ullam.',
    createdAt: '2023-12-28T12:28:59.387Z',
  },
  {
    id: 493647970860793857,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 493647970604941313,
    contentType: 'text',
    content: 'Voluptatibus labore vel voluptas distinctio et.',
    createdAt: '2023-12-28T12:27:59.387Z',
  },
  {
    id: 493647970860793857,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 1,
    contentType: 'text',
    content: 'Voluptatibus labore vel voluptas distinctio et.',
    createdAt: '2023-12-28T12:27:59.387Z',
  },
  {
    id: 493647970860793857,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 1,
    contentType: 'editRelationship',
    content: 'You filled out your relationship profile.',
    createdAt: '2023-12-28T12:27:59.387Z',
  },
  {
    id: 493647970860793857,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 4545,
    contentType: 'chatLoading',
    content: 'Voluptatibus labore vel voluptas distinctio et.',
    createdAt: '2023-12-28T12:27:59.387Z',
  },
  {
    id: 493647970860793857,
    channelId: 493647970688958465,
    senderType: 'user',
    senderId: 493647970604941313,
    contentType: 'uploadConversation',
    content:
      "Ready to run an analysis on your texts? Let's start by uploading a conversation. And don’t worry - we care about your privacy. Your chats will be stored securely and you can remove them at anytime.",
    createdAt: '2023-12-28T12:27:59.387Z',
  },
];

export const MATCHMAKING_MATCHES_DUMMY_LIST: Array<RelationshipDataProps> = [
  {
    id: 1,
    name: 'Dylan',
    subTitle: 'how’s it going?',
    time: '7:24 PM',
    isUnread: true,
  },
  {
    id: 2,
    name: 'Calvin',
    subTitle: 'hi :)',
    time: 'Sep 29',
    isUnread: false,
  },
  {
    id: 3,
    name: 'Nick',
    subTitle: 'hey there!',
    time: 'Sep 22',
    isUnread: false,
  },
];

export const Whatsapp_UserList = [
  {
    id: 1,
    name: 'Alex',
  },
  {
    id: 2,
    name: 'George',
  },
];

export const PRONOUN_LIST = [
  {
    title: i18next.t('Pronoun_1'),
    value: CreateRelationPronoun?.He,
  },
  {
    title: i18next.t('Pronoun_2'),
    value: CreateRelationPronoun?.She,
  },
  {
    title: i18next.t('Pronoun_3'),
    value: CreateRelationPronoun?.They,
  },
];

export const RELATIONSHIP_TYPE_LIST = [
  {
    title: i18next.t('Relationship_type_1'),
    value: CreateRelationshipType?.CurrentPartner,
  },
  {
    title: i18next.t('Relationship_type_2'),
    value: CreateRelationshipType?.SomeoneTalking,
  },
  {
    title: i18next.t('Relationship_type_3'),
    value: CreateRelationshipType?.ExPartner,
  },
  {
    title: i18next.t('Relationship_type_4'),
    value: CreateRelationshipType?.PreferNotSay,
  },
];

export const GENDER_INTEREST_LIST = [
  {
    title: i18next.t('GenderInterested_Option_1'),
    value: GenderInterest.Man,
  },
  {
    title: i18next.t('GenderInterested_Option_2'),
    value: GenderInterest.Women,
  },
  {
    title: i18next.t('GenderInterested_Option_3'),
    value: GenderInterest.Everyone,
  },
];

export const Delete_Reason_List = [
  {
    id: 1,
    emojiData: i18next.t('Delete_Reason_Emoji_1'),
    reasonData: i18next.t('Delete_Reason_1'),
    value: DeleteReason.TechnicalIssues,
  },
  {
    id: 2,
    emojiData: i18next.t('Delete_Reason_Emoji_2'),
    reasonData: i18next.t('Delete_Reason_2'),
    value: DeleteReason.NoLongerDating,
  },
  {
    id: 3,
    emojiData: i18next.t('Delete_Reason_Emoji_3'),
    reasonData: i18next.t('Delete_Reason_3'),
    value: DeleteReason.Privacyconcerns,
  },
  {
    id: 4,
    emojiData: i18next.t('Delete_Reason_Emoji_4'),
    reasonData: i18next.t('Delete_Reason_4'),
    value: DeleteReason.CostTooMuch,
  },
  {
    id: 5,
    emojiData: i18next.t('Delete_Reason_Emoji_5'),
    reasonData: i18next.t('Delete_Reason_5'),
    value: DeleteReason.DontLikeAmori,
  },
  {
    id: 6,
    emojiData: i18next.t('Delete_Reason_Emoji_6'),
    reasonData: i18next.t('Delete_Reason_7'),
    value: DeleteReason.Others,
  },
];

export const MESSAGE_LIST_FOR_MY_STYLE = [
  {
    id: 1,
    senderType: 'You',
    message: 'hey i feel like you’ve been a bit distant lately',
  },
  {
    id: 2,
    senderType: 'George',
    message: 'what do you mean?',
  },
  {
    id: 3,
    senderType: 'You',
    message: 'we barely talk anymore',
  },
  {
    id: 4,
    senderType: 'George',
    message: 'i’m just busy with work',
  },
  {
    id: 5,
    senderType: 'You',
    message: 'umm ok then',
  },
];

export const MESSAGE_LIST_FOR_THEIR_STYLE = [
  {
    id: 1,
    senderType: 'George',
    message: 'I just need some space',
  },
  {
    id: 2,
    senderType: 'You',
    message: 'did i do something?',
  },
  {
    id: 3,
    senderType: 'George',
    message: 'no i just need some time alone',
  },
  {
    id: 4,
    senderType: 'You',
    message: 'i don’t get it why are you acting like this',
  },
  {
    id: 5,
    senderType: 'George',
    message: 'it’s nothing',
  },
];

export const ATTACHMENT_STYLE_OBJECT = {
  sections: {
    results: {
      score: 0.2,
      description:
        'Both you and your partner exhibit anxious and avoidant attachment styles, contributing to difficulties in maintaining a secure and healthy emotional bond.',
    },
    yourAttachmentStyle: {
      type: 'anxious_avoidant',
      description:
        'Based on your conversations, you exhibit  anxious-avoidant tendencies, contributing to difficulties in maintaining a secure and healthy emotional bond.',
      snippet: {
        header:
          "For example, let's take a look at your conversation on August 12th, 2023...",
        messages: [
          {
            sender: 'You',
            content: "hey i feel like you've been a bit distant lately",
          },
          {
            sender: 'George',
            content: 'what do you mean?',
          },
          {
            sender: 'You',
            content: 'we barely talk anymore',
          },
          {
            sender: 'George',
            content: "i'm just busy with work",
          },
          {
            sender: 'You',
            content: 'umm ok then',
          },
        ],
        footer:
          'In this conversation, you exhibit  anxious-avoidant tendencies, contributing to difficulties in maintaining a secure and healthy emotional bond.',
      },
    },
    theirAttachmentStyle: {
      type: 'avoidant',
      description:
        'George exhibits an avoidant attachment style, which is characterized by a preference for independence and emotional distance. This can often times lead to misunderstandings & difficulties in addressing emotional needs.',
      snippet: {
        header: "Let's look back on your conversation on May 10th, 2023...",
        messages: [
          {
            sender: 'George',
            content: 'I just need some space',
          },
          {
            sender: 'You',
            content: 'did i do something?',
          },
          {
            sender: 'George',
            content: 'no i just need some time alone',
          },
          {
            sender: 'You',
            content: "i don't get it why are you acting like this",
          },
          {
            sender: 'George',
            content: "it's nothing",
          },
        ],
        footer:
          "George's avoidant attachment style can create misunderstandings with you, as you seek reassurance and closeness. It's important to recognize that their need for space isn't necessarily a negative trait; rather, it's his way of preserving their independence and recharging.",
      },
    },
    summary: {
      type: 'anxious_avoidant_and_avoidant',
      description:
        'George exhibits an avoidant attachment style, while you lean towards an anxious-avoidant style. This can lead to relationship challenges, as you seek more reassurance, while he values independence. To improve your relationship, focus on open communication, setting boundaries, and compromise.',
    },
  },
};

export const RELATIONSHIP_HEALTH_STATUS_OBJECT = {
  sections: {
    results: {
      score: 45,
      description:
        "Ooh, honey, your love game's scoring a 45% – not exactly Hall of Fame material, but you're not out of the league yet. You've got those cutesy moments where you're basically heart-eye emojis in human form. But then, bam! Tension city. It's like you're juggling 'aww' moments with 'ugh' times.",
    },
    yourAttachmentStyle: {
      type: 'anxious_avoidant',
      description:
        "Your relationship is like a well-mixed cocktail of respect and independence – each of you shaking things up in your own way, but together, you're a perfect blend.  You've got this cool balance of 'you do you' and 'we do us,' making your bond strong.",
      snippet: {
        header:
          "One highlight shines through, showing how you are nailing the caring and considerate game. It's like you've got this superhero-level respect for each other's personal space. Here is a sweet moment:",
        messages: [
          {
            sender: 'You',
            content: "hey i feel like you've been a bit distant lately",
          },
          {
            sender: 'George',
            content: 'what do you mean?',
          },
          {
            sender: 'You',
            content: 'we barely talk anymore',
          },
          {
            sender: 'George',
            content: "i'm just busy with work",
          },
          {
            sender: 'You',
            content: 'umm ok then',
          },
        ],
        footer: 'Keep this understanding burning bright.',
      },
    },
    theirAttachmentStyle: {
      type: 'avoidant',
      description:
        "Alright, diving into the drama: trust issues are popping up like uninvited guests at a party – time to show them the door. And those communication breakdowns? They're like a bad phone line, needing a serious upgrade. Let's tune into the 'we need to talk' channel and make sure everyone's on the same wavelength.",
      snippet: {
        header: 'Some concerns show in your conversation on April 6th, 2023...',
        messages: [
          {
            sender: 'George',
            content: 'I just need some space',
          },
          {
            sender: 'You',
            content: 'did i do something?',
          },
          {
            sender: 'George',
            content: 'no i just need some time alone',
          },
          {
            sender: 'You',
            content: "i don't get it why are you acting like this",
          },
          {
            sender: 'George',
            content: "it's nothing",
          },
        ],
        footer:
          'This conversation reflects a common concern where your partner tends to withdraw during arguments. It shows a willingness to address the issue and work on it together.',
      },
    },
    summary: {
      type: 'anxious_avoidant_and_avoidant',
      description:
        "Alright, let's talk trust reboot – patience is your sous-chef here, and honesty is the secret sauce. And boundaries? Set them like you're drawing lines in the sand, but make sure there's enough room to build a love castle together. It's all about balancing 'me time' with 'we time' without stepping on each other's toes!",
    },
  },
};

export const metaDataRes = {
  appStoreUrl: {
    iOS: IOS_APP_STORE_URL,
    android: IOS_APP_STORE_URL,
  },
  currentAppVersion: {
    iOS: '2.0.3',
    android: '2.0.3',
  },
  macAppDownloadUrl: MAC_APP_LINK,
};
