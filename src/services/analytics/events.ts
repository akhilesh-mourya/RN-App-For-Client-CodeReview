const IntroScreenEvent = {
  // done
  ViewYourAiDatingCopilotIntroScreen: {
    name: 'view your ai dating copilot intro screen',
  },
  // done
  ViewAmoriLearnsFromChatIntroScreen: {
    name: 'view amori learns from chat intro screen',
  },
  // done
  ViewWeCareAboutPrivacyIntroScreen: {
    name: 'view we care about privacy intro screen',
  },
  // done
  TouchGetStartedButtonOnIntroScreen: {
    name: 'touch get started button on intro screen',
  },
};

const WelcomeScreenEvent = {
  // done
  ViewWelcomeScreen: {
    name: 'view welcome screen',
  },
  // done
  TouchSignInOnWelcomeScreen: {
    name: 'touch sign in button on welcome screen',
  },
  // done
  TouchGetStartedOnWelcomeScreen: {
    name: 'touch get started button on welcome screen',
  },
  // done
  SelectPrivacyPolicyMenuOnWelcomeScreen: {
    name: 'select privacy policy menu on welcome screen',
  },
  // done
  SelectTermsOfServiceMenuOnWelcomeScreen: {
    name: 'select terms of service menu on welcome screen',
  },
};

const PhoneNumberFormScreenEvent = {
  // done
  ViewPhoneNumberFormScreen: {
    name: 'view phone number form screen',
  },
  // done
  TouchCountryFieldOnPhoneNumberFormScreen: {
    name: 'touch country field on phone number form screen',
  },
  // done
  SelectCountryOnCountryPickerOnPhoneNumberFormScreen: {
    name: 'select country on country picker on phone number form screen',
    Property: {
      CountryCode: 'country code',
      CallingCode: 'calling code',
    },
  },
  // done
  TouchPhoneNumberFieldOnPhoneNumberFormScreen: {
    name: 'touch phone number field on phone number form screen',
  },
  // done
  TouchContinueButtonOnPhoneNumberFormScreen: {
    name: 'touch continue button on phone number form screen',
    Property: {
      CountryCode: 'country code',
      CallingCode: 'calling code',
      PhoneNumber: 'phone number',
    },
  },
};

const OTPFormScreenEvent = {
  // done
  ViewOTPFormScreen: {
    name: 'view otp form screen',
  },
  // done
  TouchOTPFieldOnOTPFormScreen: {
    name: 'touch otp field on otp form screen',
  },
  // done
  TouchResendCodeButtonOnOTPFormScreen: {
    name: 'touch resend code button on otp form screen',
  },
  // done
  TouchContinueButtonOnOTPFormScreen: {
    name: 'touch continue button on otp form screen',
  },
};

const NameFormScreenEvent = {
  // done
  ViewNameFormScreen: {
    name: 'view name form screen',
  },
  // done
  TouchFirstNameFieldOnNameFormScreen: {
    name: 'touch first name field on name form screen',
  },
  // done
  TouchLastNameFieldOnNameFormScreen: {
    name: 'touch last name field on name form screen',
  },
  // done
  TouchContinueButtonOnNameFormScreen: {
    name: 'touch continue button on name form screen',
    Property: {
      Name: 'name',
    },
  },
};

const CoachPersonalityPickerScreenEvent = {
  // done
  ViewCoachPersonalityPickerScreen: {
    name: 'view coach personality picker screen',
  },
  // done
  TouchSelectPersonalityButtonOnCoachPersonalityPickerScreen: {
    name: 'touch select personality button on coach personality picker screen',
    Property: {
      Assistant: 'assistant',
    },
  },
  // done
  TouchSkipButtonOnCoachPersonalityPickerScreen: {
    name: 'touch skip button on coach personality picker screen',
  },
  TouchContinueButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen: {
    name: 'touch continue button on skip confirmation popup on coach personality picker screen',
  },
  // done
  TouchDismissButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen: {
    name: 'touch dismiss button on skip confirmation popup on coach personality picker screen',
  },
};

const EnableNotificationScreenEvent = {
  // done
  ViewEnableNotificationsScreen: {
    name: 'view enable notifications screen',
  },
  // done
  TouchEnableNotificationsButtonOnEnableNotificationsScreen: {
    name: 'touch enable notifications button on enable notifications screen',
  },
  // done
  SelectAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen: {
    name: 'select allow option on notifications permission popup on enable notifications screen',
  },
  // done
  SelectDontAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen: {
    name: 'select do not allow option on notifications permission popup on enable notifications screen',
  },
};

const WaitlistScreenEvent = {
  // done
  ViewWaitlistScreen: {
    name: 'view waitlist screen',
  },
  // done
  TouchInviteFriendsButtonOnWaitlistScreen: {
    name: 'touch invite friends button on waitlist screen',
  },
  // done
  TouchEnterReferralCodeButtonOnWaitlistScreen: {
    name: 'touch enter referral code button on waitlist screen',
  },
  // TODO: CHECK AGAIN!!!!!!
  TouchSubmitButtonOnReferralCodeInputPopupOnWaitlistScreen: {
    name: 'touch submit button on referral code input popup on waitlist screen',
    Property: {
      Code: 'code',
    },
  },
  // TODO: ADD Unsuccessful referral code
  // done
  TouchDismissButtonOnReferralCodeInputPopupOnWaitlistScreen: {
    name: 'touch dismiss button on referral code input popup on waitlist screen',
  },
  // done
  SelectAllowOptionOnContactPermissionDialogOnWaitlistScreen: {
    name: 'select allow option on contact permission dialog on waitlist screen',
  },
  SelectDontAllowOptionOnContactPermissionDialogOnWaitlistScreen: {
    name: 'select do not allow option on contact permission dialog on waitlist screen',
  },
};

const HomeScreenEvent = {
  // done
  ViewHomeScreen: {
    name: 'view home screen',
  },
  // done
  TouchMyRelationshipProfileCardOnHomeScreen: {
    name: 'touch my relationship profile card on home screen',
  },
  // done
  TouchGeneralAssistantCardOnHomeScreen: {
    name: 'touch general assistant card on home screen',
    Property: {
      Assistant: 'assistant',
    },
  },
  // done
  TouchRelationshipCardOnHomeScreen: {
    name: 'touch relationship card on home screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchUploadConversationButtonOnHomeScreen: {
    name: 'touch upload a conversation button on home screen',
  },
  // done
  TouchAnalyzeWhatsappConversationMenuOnUploadConversationSheetOnHomeScreen: {
    name: 'touch upload whatsapp conversation menu on upload conversation menu sheet on home screen',
  },
  // done
  TouchAnalyzeIMessageConversationMenuOnUploadConversationSheetOnHomeScreen: {
    name: 'touch upload imessage conversation menu on upload conversation menu sheet on home screen',
  },
};

const UploadWhatsappScreenEvent = {
  // done
  ViewUploadWhatsappTutorialScreen: {
    name: 'view upload whatsapp tutorial screen',
  },
  // done
  TouchUploadWhatsappFileOnWhatsappTutorialScreen: {
    name: 'touch upload whatsapp file on whatsapp tutorial screen',
  },
  // done
  SubmitWhatsappFileOnWhatsappTutorialScreen: {
    name: 'submit whatsapp file on whatsapp tutorial screen',
    Property: {
      FileName: 'file name',
      FileType: 'file type',
      FileSize: 'file weight',
    },
  },
};

const UploadIMessageScreenEvent = {
  // done
  ViewUploadIMessageTutorialScreen: {
    name: 'view upload imessage tutorial screen',
  },
  // done
  TouchShareButtonOnUploadIMessageTutorialScreen: {
    name: 'touch share button on upload imessage tutorial screen',
  },

  // done
  ViewIMessageSyncedScreen: {
    name: 'view imessage synced screen',
  },
  // done
  TouchContinueButtonOnIMessageSyncedScreen: {
    name: 'touch continue button on imessage synced screen',
  },

  // done
  TouchCancelUploadOnIMessageSyncedScreen: {
    name: 'touch cancel upload button on imessage synced screen',
  },
  // done
  TouchYesButtonOnCancelConfirmationPopupOnIMessageSyncedScreen: {
    name: 'touch yes button on cancel confirmation popup on imessage synced screen',
  },
  // done
  TouchNevermindButtonOnCancelConfirmationPopupOnIMessageSyncedScreen: {
    name: 'touch nevermind button on cancel confirmation popup on imessage synced screen',
  },
};

const UploadScreenEvent = {
  // done
  ViewCreateNewOrAddToExistingRelationshipScreen: {
    name: 'view create new or add to existing relationship screen',
  },
  // done
  SelectCreateNewRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen: {
    name: 'select create new relationship menu on create new or add to existing relationship screen',
  },
  // done
  SelectExistingRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen: {
    name: 'select existing relationship menu on create new or add to existing relationship screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchContinueButtonOnCreateNewOrAddToExistingRelationshipScreen: {
    name: 'touch continue button on create new or add to existing relationship screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  ViewSelectNameThatBelongsToYouScreen: {
    name: 'view select name that belongs to you screen',
  },
  // done
  TouchContinueButtonOnSelectNameThatBelongsToYouScreen: {
    name: 'touch continue button on view select name that belongs to you screen',
  },
  // done
  ViewTheirPronounsPickerScreen: {
    name: 'view their pronouns picker screen',
  },
  // done
  SelectTheirPronounsOnTheirPronounsPickerScreen: {
    name: 'select their pronouns on their pronouns picker screen',
    Property: {
      Pronouns: 'pronouns',
    },
  },
  // done
  TouchContinueButtonOnTheirPronounsPickerScreen: {
    name: 'touch continue button on their pronouns picker screen',
    Property: {
      Pronouns: 'pronouns',
    },
  },

  // done
  ViewRelationshipConnectionPickerScreen: {
    name: 'view relationship connection picker screen',
  },
  // done
  SelectConnectionOnRelationshipConnectionPickerScreen: {
    name: 'select connection on relationship connection picker screen',
    Property: {
      Connection: 'connection',
    },
  },
  // done
  TouchContinueButtonOnRelationshipConnectionPickerScreen: {
    name: 'touch continue button on relationship connection picker screen',
    Property: {
      Connection: 'connection',
    },
  },

  // done
  ViewAnalysisTypePickerScreen: {
    name: 'view analysis type picker screen',
  },
  // done
  SelectAnalysisTypeOnAnalysisTypePickerScreen: {
    name: 'select analysis type on analysis type picker screen',
    Property: {
      AnalysisType: 'analysis type',
      RelationshipId: 'relationship id',
    },
  },
};

const GeneralAssistantChannelScreenEvent = {
  // TODO: NEEDS FIX. THIS IS NOT CALLED WHEN NAVIGATING FROM WAITLIST INTO THIS SCREEN
  // BY ENTERING CODE
  // TODO: THIS SHOULD NOT BE CALLED MULTIPLE TIMES AFTER FILLING OUT QUESTIONNAIRE
  ViewGeneralAssistantChannelScreen: {
    name: 'view general assistant channel screen',
    Property: {
      Assistant: 'assistant',
    },
  },
  // done
  SendMessageOnGeneralAssistantChannelScreen: {
    name: 'send message on general assistant channel screen',
    Property: {
      Message: 'message',
    },
  },
  // done
  SelectOptionOnGetStartedMessageOnGeneralAssistantChannelScreen: {
    name: 'select option on get started message on general assistant channel screen',
    Property: {
      Option: 'option',
    },
  },
  // done
  TouchEditRelationshipButtonOnFilledRelationshipMessageOnGeneralAssistantChannelScreen:
    {
      name: 'touch edit relationship button on filled relationship message on general assistant channel screen',
    },
  // done
  SelectOptionOnUploadConversationMessageOnGeneralAssistantChannelScreen: {
    name: 'select option on upload conversation message on general assistant channel screen',
    Property: {
      Option: 'option',
    },
  },
  // done
  SelectOptionOnGettingYourAnalysisReadyMessageOnGeneralAssistantChannelScreen:
    {
      name: 'select option on getting your analysis ready message on general assistant channel screen',
      Property: {
        Option: 'option',
      },
    },
  // done
  TouchPlusIconOnGeneralAssistantChannelScreen: {
    name: 'touch plus icon on general assistant channel screen',
  },
  // done
  TouchAnalyzeWhatsappConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen:
    {
      name: 'touch analyze whatsapp conversation menu on plus button menu sheet on general assistant channel screen',
    },
  // done
  TouchAnalyzeIMessageConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen:
    {
      name: 'touch analyze imessage conversation menu on plus button menu sheet on general assistant channel screen',
    },
};

const RelationshipAssistantChannelScreenEvent = {
  // TODO: FIX IT'S NOT CALLED WHEN GOING BACK FROM ANALYSIS DETAIL SCREEN
  ViewRelationshipAssistantChannelScreen: {
    name: 'view relationship assistant channel screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchRelationshipInfoButtonOnRelationshipAssistantChannelScreen: {
    name: 'touch relationship info button on relationship assistant channel screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  OpenAnalysisAttachmentOnRelationshipAssistantChannelScreen: {
    name: 'open analysis on relationship assistant channel screen',
    Property: {
      RelationshipId: 'relationship id',
      AnalysisId: 'analysis id',
    },
  },
  // done
  SendMessageOnRelationshipAssistantChannelScreen: {
    name: 'send message on relationship assistant channel screen',
    Property: {
      RelationshipId: 'relationship id',
      Message: 'message',
    },
  },
  // done
  TouchPlusIconOnRelationshipAssistantChannelScreen: {
    name: 'touch plus icon on relationship assistant channel screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchUpdateYourWhatsappConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen:
    {
      name: 'touch update your whatsapp conversation menu on plus button menu sheet on relationship assistant channel screen',
      Property: {
        RelationshipId: 'relationship id',
      },
    },
  // TODO: THIS NEEDS TEST
  TouchUpdateYourIMessageConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen:
    {
      name: 'touch update your imessage conversation menu on plus button menu sheet on relationship assistant channel screen',
      Property: {
        RelationshipId: 'relationship id',
      },
    },
  // done
  TouchNewAnalysisMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen:
    {
      name: 'touch new analysis menu on plus button menu sheet on relationship assistant channel screen',
      Property: {
        RelationshipId: 'relationship id',
      },
    },
};

const RelationshipDetailScreenEvent = {
  // done
  ViewRelationshipDetailScreen: {
    name: 'view relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  TouchSyncButtonOnRelationshipDetailScreen: {
    name: 'touch sync button on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchAnalysisCardOnRelationshipDetailScreen: {
    name: 'touch analysis card on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
      AnalysisId: 'analysis id',
    },
  },
  // done
  TouchMenuButtonOnRelationshipDetailScreen: {
    name: 'touch menu button on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchEditNameMenuOnMenuSheetOnRelationshipDetailScreen: {
    name: 'touch edit name menu on menu sheet on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },

  // done
  TouchDeleteRelationshipMenuOnMenuSheetOnRelationshipDetailScreen: {
    name: 'touch delete relationship menu on menu sheet on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchDeleteButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen:
    {
      name: 'touch delete button on delete relationship confirmation popup on relationship detail screen',
      Property: {
        RelationshipId: 'relationship id',
      },
    },
  // done
  TouchCancelButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen:
    {
      name: 'touch cancel button on delete relationship confirmation popup on relationship detail screen',
      Property: {
        RelationshipId: 'relationship id',
      },
    },
  // done
  TouchCancelMenuOnMenuSheetOnRelationshipDetailScreen: {
    name: 'touch cancel menu on menu sheet on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchNewAnalysisButtonOnRelationshipDetailScreen: {
    name: 'touch new analysis button on relationship detail screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
};

const EditRelationshipScreenEvent = {
  // done
  ViewEditRelationshipScreen: {
    name: 'view edit relationship screen',
    Property: {
      RelationshipId: 'relationship id',
    },
  },
  // done
  TouchSaveButtonOnEditRelationshipScreen: {
    name: 'touch save button on edit relationship screen',
    Property: {
      RelationshipId: 'relationship id',
      RelationshipName: 'relationship name',
    },
  },
  // done
  TouchYesButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen: {
    name: 'touch yes button on save relationship confirmation popup on edit relationship screen',
    Property: {
      RelationshipId: 'relationship id',
      RelationshipName: 'relationship name',
    },
  },
  // done
  TouchDontSaveButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen:
    {
      name: 'touch dont save button on save relationship confirmation popup on edit relationship screen',
      Property: {
        RelationshipId: 'relationship id',
        RelationshipName: 'relationship name',
      },
    },
};

const AnalysisScreenEvent = {
  // done
  ViewAnalysisDetailScreen: {
    name: 'view analysis detail screen',
    Property: {
      AnalysisId: 'analysis id',
      AnalysisType: 'analysis type',
    },
  },
  // done
  ViewSectionOnAnalysisDetailScreen: {
    name: 'view section on analysis detail screen',
    Property: {
      AnalysisId: 'analysis id',
      Section: 'section',
    },
  },
  // done
  TouchNextAreaOnAnalysisDetailScreen: {
    name: 'touch next area on analysis detail screen',
    Property: {
      AnalysisId: 'analysis id',
      Section: 'section',
    },
  },
  // done
  TouchBackAreaOnAnalysisDetailScreen: {
    name: 'touch back area on analysis detail screen',
    Property: {
      AnalysisId: 'analysis id',
      Section: 'section',
    },
  },
  // done
  TouchDismissButtonOnAnalysisDetailScreen: {
    name: 'touch dismiss button on analysis detail screen',
    Property: {
      AnalysisId: 'analysis id',
      Section: 'section',
    },
  },
  // TODO: Test this - This is only testable on device
  TouchShareButtonOnAnalysisDetailScreen: {
    name: 'touch share button on analysis detail screen',
    Property: {
      AnalysisId: 'analysis id',
      Section: 'section',
    },
  },
};

const QuestionnaireScreenEvent = {
  // done
  TouchBackButtonOnQuestionnaireScreen: {
    name: 'touch back button on questionnaire screen',
  },
  // done
  TouchDismissButtonOnQuestionnaireScreen: {
    name: 'touch dismiss button on questionnaire screen',
  },
  // done
  TouchYesIAmSureButtonOnQuitConfirmationPopupOnQuestionnaireScreen: {
    name: 'touch yes i am sure button on quit confirmation popup on questionnaire screen',
  },
  // done
  TouchStayButtonOnQuitConfirmationPopupOnQuestionnaireScreen: {
    name: 'touch stay button on quit confirmation popup on questionnaire screen',
  },
  // done
  ViewGenderIdentityFormScreen: {
    name: 'view gender identity form screen',
  },
  // done
  TouchContinueButtonOnGenderIdentityFormScreen: {
    name: 'touch continue button on gender identity form screen',
    Property: {
      GenderIdentity: 'gender identity',
    },
  },
  // done
  ViewPronounsFormScreen: {
    name: 'view pronouns form screen',
  },
  // done
  TouchContinueButtonOnPronounsFormScreen: {
    name: 'touch continue button on pronouns form screen',
    Property: {
      Pronouns: 'pronouns',
    },
  },
  // done
  ViewGenderInterestFormScreen: {
    name: 'view gender interest form screen',
  },
  // done
  TouchContinueButtonOnGenderInterestFormScreen: {
    name: 'touch continue button on gender interest form screen',
    Property: {
      GenderInterest: 'gender interest',
    },
  },

  // done
  ViewRelationshipStatusFormScreen: {
    name: 'view relationship status form screen',
  },
  // done
  TouchContinueButtonOnRelationshipStatusFormScreen: {
    name: 'touch continue button on relationship status form screen',
    Property: {
      RelationshipStatus: 'relationship status',
    },
  },

  // done
  ViewRelationshipGoalsFormScreen: {
    name: 'view relationship goals form screen',
  },
  // done
  TouchContinueButtonOnRelationshipGoalsFormScreen: {
    name: 'touch continue button on relationship goals form screen',
    Property: {
      RelationshipGoals: 'relationship goals',
    },
  },
};

const MatchmakingScreenEvent = {
  // done
  ViewMatchmakingScreen: {
    name: 'view matchmaking screen',
  },
  // done
  TouchJoinWaitlistButtonOnMatchmakingScreen: {
    name: 'touch join waitlist button on matchmaking screen',
  },
  // done
  TouchInviteFriendsButtonOnMatchmakingScreen: {
    name: 'touch invite friends button on matchmaking screen',
  },
  // done
  SelectAllowOptionOnContactPermissionDialogOnMatchmakingScreen: {
    name: 'select allow option on contact permission dialog on matchmaking screen',
  },
  // done
  SelectDontAllowOptionOnContactPermissionDialogOnMatchmakingScreen: {
    name: 'select do not allow option on contact permission dialog on matchmaking screen',
  },
};

const MatchmakingRegistrationScreenEvent = {
  // done
  ViewMatchmakingRegistrationScreen: {
    name: 'view matchmaking registration screen',
  },
  // done
  TouchBirthdayInputFieldOnMatchmakingRegistrationScreen: {
    name: 'touch birthday input field on matchmaking registration screen',
  },
  // done
  TouchLocationInputFieldOnMatchmakingRegistrationScreen: {
    name: 'touch location input field on matchmaking registration screen',
  },
  // done
  SelectCityOnCityPickerSheetOnMatchmakingRegistrationScreen: {
    name: 'select city on city picker on matchmaking registration screen',
    Property: {
      City: 'city',
      State: 'state',
      Country: 'country',
    },
  },
  // done
  TouchJoinWaitlistButtonOnMatchmakingRegistrationScreen: {
    name: 'touch join waitlist button on matchmaking registration screen',
    Property: {
      Birthday: 'birthday',
      City: 'city',
      State: 'state',
      Country: 'country',
    },
  },
};

const ProfileScreenEvent = {
  // done
  ViewProfileScreen: {
    name: 'view profile screen',
  },
  // done
  SelectMyRelationshipProfileMenuOnProfileScreen: {
    name: 'select my relationship profile menu on profile screen',
  },
  // done
  SelectSettingsMenuOnProfileScreen: {
    name: 'select settings menu on profile screen',
  },
  // done
  SelectGiveFeedbackMenuOnProfileScreen: {
    name: 'select give feedback menu on profile screen',
  },
  // done
  TouchLogOutButtonOnProfileScreen: {
    name: 'touch log out button on profile screen',
  },
  // TODO: Test this
  TouchLogOutButtonOnLogOutConfirmationPopupOnProfileScreen: {
    name: 'touch log out button on log out confirmation popup on profile screen',
  },
  // done
  TouchCancelButtonOnLogOutConfirmationPopupOnProfileScreen: {
    name: 'touch cancel button on log out confirmation popup on profile screen',
  },
};

const MyRelationshipProfileScreenEvent = {
  // done
  ViewMyRelationshipProfileScreen: {
    name: 'view my relationship profile screen',
  },
  // done
  TouchMyBasicsCardOnMyRelationshipProfileScreen: {
    name: 'touch my basics card on my relationship profile screen',
  },
};

const SettingsScreenEvent = {
  // done
  ViewSettingsScreen: {
    name: 'view settings screen',
  },
  // done
  SelectCoachPersonalityMenuOnSettingsScreen: {
    name: 'select coach personality menu on settings screen',
  },
  // done
  SelectPrivacyPolicyMenuOnSettingsScreen: {
    name: 'select privacy policy menu on settings screen',
  },
  // done
  SelectTermsAndConditionsMenuOnSettingsScreen: {
    name: 'select terms and conditions menu on settings screen',
  },
  // done
  TouchDeleteAccountButtonOnSettingsScreen: {
    name: 'touch delete account button on settings screen',
  },
};

const DeleteAccountScreenEvent = {
  // done
  ViewDeleteAccountScreen: {
    name: 'view delete account screen',
  },
  // done
  SelectReasonOnDeleteAccountScreen: {
    name: 'select reason on delete account screen',
    Property: {
      Reason: 'reason',
    },
  },
  // done
  TouchContinueButtonOnDeleteAccountScreen: {
    name: 'touch continue button on delete account screen',
    Property: {
      Reason: 'reason',
      Comments: 'comments',
    },
  },

  // done
  ViewConfirmDeleteAccountScreen: {
    name: 'view confirm delete account screen',
  },
  // done
  TouchConfirmButtonOnConfirmDeleteAccountScreen: {
    name: 'touch confirm button on confirm delete account screen',
    Property: {
      Reason: 'reason',
      Comments: 'comments',
    },
  },
  // done
  TouchCancelButtonOnConfirmDeleteAccountScreen: {
    name: 'touch cancel button on confirm delete account screen',
  },

  // TODO: Check this
  ViewDeleteAccountSuccessScreen: {
    name: 'view delete account success screen',
  },
};

// TODO: THIS SHOULD BE UPDATE PERSONALITY SCREEN EVENT
// TO DIFFERENTIATE INITIAL CHOOSE AND UPDATE
const SwitchPersonalityScreenEvent = {
  // done
  TouchCancelButtonOnSwitchCoachPersonalityPopup: {
    name: 'touch cancel button on are you sure you want to switch your coach’s personality popup',
  },
  // done
  TouchSwitchPersonalityOnCoachPersonalityScreen: {
    name: 'touch switch personality on coach personality screen',
  },
  // done
  TouchSwitchOnSwitchPersonalityPopup: {
    name: 'touch switch button on are you sure you want to switch your coach’s personality popup',
    Property: {
      Assistant: 'assistant',
    },
  },
};

const InviteFriendsEvent = {
  // done
  TouchDismissButtonOnInviteFriendsSheet: {
    name: 'touch dismiss button on invite friends sheet',
  },
  // done
  TouchInviteButtonOnInviteFriendsSheet: {
    name: 'touch invite button on invite friends sheet',
    Property: {
      PhoneNumber: 'phone number',
    },
  },
  // done
  SendInvitationMessage: {
    name: 'send invitation message',
    Property: {
      PhoneNumber: 'phone number',
      Message: 'message',
    },
  },
  // done
  CancelSendInvitationMessage: {
    name: 'cancel send invitation message',
  },
};

const GeneralEvent = {
  // done
  TouchHomeItemOnTabBar: {
    name: 'touch home icon on tab bar',
  },
  // done
  TouchMatchmakingItemOnTabBar: {
    name: 'touch matchmaking icon on tab bar',
  },
  // done
  TouchProfileItemOnTabBar: {
    name: 'touch profile icon on tab bar',
  },
};

export const Event = {
  ...IntroScreenEvent,
  ...WelcomeScreenEvent,
  ...PhoneNumberFormScreenEvent,
  ...OTPFormScreenEvent,
  ...NameFormScreenEvent,
  ...CoachPersonalityPickerScreenEvent,
  ...EnableNotificationScreenEvent,
  ...WaitlistScreenEvent,
  ...HomeScreenEvent,
  ...UploadWhatsappScreenEvent,
  ...UploadIMessageScreenEvent,
  ...UploadScreenEvent,
  ...GeneralAssistantChannelScreenEvent,
  ...RelationshipAssistantChannelScreenEvent,
  ...RelationshipDetailScreenEvent,
  ...EditRelationshipScreenEvent,
  ...AnalysisScreenEvent,
  ...QuestionnaireScreenEvent,
  ...MatchmakingScreenEvent,
  ...MatchmakingRegistrationScreenEvent,
  ...ProfileScreenEvent,
  ...MyRelationshipProfileScreenEvent,
  ...SettingsScreenEvent,
  ...DeleteAccountScreenEvent,
  ...SwitchPersonalityScreenEvent,
  ...InviteFriendsEvent,
  ...GeneralEvent,
};

// NOT DOING
// ViewFilledOutMessage: {
//     name: 'view you filled out your relationship profile message on general assistant channel screen',
//   },
// ViewUploadConversationMessage: {
//     name: 'read upload a conversation message from coach on general assistant channel screen',
//   },
// ReceiveAnAnalysis: {
//     name: 'receive analysis in relationship channel',
//     Property: {
//       ChatType: 'chat type',
//       RelationshipType: 'relationship type',
//       RelationshipPronoun: 'relationship pronouns',
//       RelationshipName: 'relationship name',
//     },
//   },
// FirstAppOpen: {
//   name: 'first app open',
// },
//
// WHAT'S THIS?
// EditFilledRelationhipProfile: {
//   name: 'touch edit button on you filled out your relationship profile message',
// },

// WRONG NAMES
// TouchAnalysisIsReadyNotification: {
//   name: 'touch analysis is ready notification',
// },
