import {Mixpanel} from 'mixpanel-react-native';
import LogRocket from '@logrocket/react-native';
import {Config} from 'react-native-config';
import {UserDataType} from '../../../@types/context';
import {Event} from './events';
import {IEvent} from './types';

export class Analytics {
  private mixpanel = new Mixpanel(Config.MIXPANEL_CONFIG, true);

  constructor() {
    this.initialize();
  }

  initialize() {
    this.mixpanel.init();
    this.mixpanel.setLoggingEnabled(true);
    LogRocket.init('RNCodeForClientReview/RNCodeForClientReview');
  }

  identify(id: string) {
    this.mixpanel.identify(id);
  }

  deidentify() {
    this.mixpanel.reset();
  }

  identifyLogRocket(userData: UserDataType) {
    LogRocket.identify(userData?.id, {
      name: `${userData.firstName} ${
        userData.lastName ? userData.lastName : ''
      }`,
      phone: userData.phoneNumber,
    });
  }

  updateProfile(userData: UserDataType) {
    const people = this.mixpanel.getPeople();
    people.set('$first_name', userData.firstName);
    people.set('$last_name', userData.lastName);
    people.set('$phone', userData.phoneNumber);
    this.identifyLogRocket(userData);
  }

  track<T extends IEvent>(
    event: T,
    properties?: {[K in keyof T['Property']]: any},
  ) {
    // console.log('TRACK EVENT:', event.name);

    if (event.Property && properties && Object.keys(properties).length) {
      const mappedProperties: Record<string, any> = {};

      for (const key in properties) {
        const mappedKey = event.Property[key];
        const value = properties[key];
        mappedProperties[mappedKey] = value;
      }

      this.mixpanel.track(event.name, mappedProperties);

      // console.log('PROPERTIES:', mappedProperties);
    } else {
      this.mixpanel.track(event.name);
    }

    // console.log('\n');

    this.mixpanel.flush();
  }

  ////////// INTRO SCREEN EVENTS //////////
  trackViewYourAiDatingCopilotIntroScreen() {
    this.track(Event.ViewYourAiDatingCopilotIntroScreen);
  }

  trackViewRNCodeForClientReviewLearnsFromChatIntroScreen() {
    this.track(Event.ViewRNCodeForClientReviewLearnsFromChatIntroScreen);
  }

  trackViewWeCareAboutPrivacyIntroScreen() {
    this.track(Event.ViewWeCareAboutPrivacyIntroScreen);
  }

  trackTouchGetStartedButtonOnIntroScreen() {
    this.track(Event.TouchGetStartedButtonOnIntroScreen);
  }

  ////////// WELCOME SCREEN EVENTS //////////
  trackViewWelcomeScreen() {
    this.track(Event.ViewWelcomeScreen);
  }

  trackTouchSignInOnWelcomeScreen() {
    this.track(Event.TouchSignInOnWelcomeScreen);
  }

  trackTouchGetStartedOnWelcomeScreen() {
    this.track(Event.TouchGetStartedOnWelcomeScreen);
  }

  trackSelectPrivacyPolicyMenuOnWelcomeScreen() {
    this.track(Event.SelectPrivacyPolicyMenuOnWelcomeScreen);
  }

  trackSelectTermsOfServiceMenuOnWelcomeScreen() {
    this.track(Event.SelectTermsOfServiceMenuOnWelcomeScreen);
  }

  ////////// PHONE NUMBER SCREEN EVENTS //////////
  trackViewPhoneNumberFormScreen() {
    this.track(Event.ViewPhoneNumberFormScreen);
  }

  trackTouchCountryFieldOnPhoneNumberFormScreen() {
    this.track(Event.TouchCountryFieldOnPhoneNumberFormScreen);
  }

  trackSelectCountryOnCountryPickerOnPhoneNumberFormScreen(
    countryCode: string,
    callingCode: string,
  ) {
    this.track(Event.SelectCountryOnCountryPickerOnPhoneNumberFormScreen, {
      CountryCode: countryCode,
      CallingCode: callingCode,
    });
  }

  trackTouchPhoneNumberFieldOnPhoneNumberFormScreen() {
    this.track(Event.TouchPhoneNumberFieldOnPhoneNumberFormScreen);
  }

  trackTouchContinueButtonOnPhoneNumberFormScreen(
    countryCode: string,
    callingCode: string,
    phoneNumber: string,
  ) {
    this.track(Event.TouchContinueButtonOnPhoneNumberFormScreen, {
      CountryCode: countryCode,
      CallingCode: callingCode,
      PhoneNumber: phoneNumber,
    });
  }

  ////////// OTP FORM SCREEN EVENTS //////////
  trackViewOTPFormScreen() {
    this.track(Event.ViewOTPFormScreen);
  }

  trackTouchOTPFieldOnOTPFormScreen() {
    this.track(Event.TouchOTPFieldOnOTPFormScreen);
  }

  trackTouchResendCodeButtonOnOTPFormScreen() {
    this.track(Event.TouchResendCodeButtonOnOTPFormScreen);
  }

  trackTouchContinueButtonOnOTPFormScreen() {
    this.track(Event.TouchContinueButtonOnOTPFormScreen);
  }

  ////////// NAME FORM SCREEN EVENTS //////////
  trackViewNameFormScreen() {
    this.track(Event.ViewNameFormScreen);
  }

  trackTouchFirstNameFieldOnNameFormScreen() {
    this.track(Event.TouchFirstNameFieldOnNameFormScreen);
  }

  trackTouchLastNameFieldOnNameFormScreen() {
    this.track(Event.TouchLastNameFieldOnNameFormScreen);
  }

  trackTouchContinueButtonOnNameFormScreen(name: string) {
    this.track(Event.TouchContinueButtonOnNameFormScreen, {
      Name: name,
    });
  }

  ////////// COACH PERSONALITY SCREEN EVENTS //////////
  trackViewCoachPersonalityPickerScreen() {
    this.track(Event.ViewCoachPersonalityPickerScreen);
  }

  trackTouchSelectPersonalityButtonOnCoachPersonalityPickerScreen(
    assistant: string,
  ) {
    this.track(
      Event.TouchSelectPersonalityButtonOnCoachPersonalityPickerScreen,
      {
        Assistant: assistant.toLowerCase(),
      },
    );
  }

  trackTouchSkipButtonOnCoachPersonalityPickerScreen() {
    this.track(Event.TouchSkipButtonOnCoachPersonalityPickerScreen);
  }

  trackTouchContinueButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen() {
    this.track(
      Event.TouchContinueButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen,
    );
  }

  trackTouchDismissButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen() {
    this.track(
      Event.TouchDismissButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen,
    );
  }

  ////////// ENABLE NOTIFICATION SCREEN EVENTS //////////
  trackViewEnableNotificationsScreen() {
    this.track(Event.ViewEnableNotificationsScreen);
  }

  trackTouchEnableNotificationsButtonOnEnableNotificationsScreen() {
    this.track(Event.TouchEnableNotificationsButtonOnEnableNotificationsScreen);
  }

  trackSelectAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen() {
    this.track(
      Event.SelectAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen,
    );
  }

  trackSelectDontAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen() {
    this.track(
      Event.SelectDontAllowOptionOnNotificationsPermissionDialogOnMatchmakingScreen,
    );
  }

  ////////// WAITLIST SCREEN EVENTS //////////
  trackViewWaitlistScreen() {
    this.track(Event.ViewWaitlistScreen);
  }

  trackTouchInviteFriendsButtonOnWaitlistScreen() {
    this.track(Event.TouchInviteFriendsButtonOnWaitlistScreen);
  }

  trackTouchEnterReferralCodeButtonOnWaitlistScreen() {
    this.track(Event.TouchEnterReferralCodeButtonOnWaitlistScreen);
  }

  trackTouchSubmitButtonOnReferralCodeInputPopupOnWaitlistScreen(code: string) {
    this.track(
      Event.TouchSubmitButtonOnReferralCodeInputPopupOnWaitlistScreen,
      {
        Code: code,
      },
    );
  }

  trackTouchDismissButtonOnReferralCodeInputPopupOnWaitlistScreen() {
    this.track(
      Event.TouchDismissButtonOnReferralCodeInputPopupOnWaitlistScreen,
    );
  }

  trackSelectAllowOptionOnContactPermissionDialogOnWaitlistScreen() {
    this.track(
      Event.SelectAllowOptionOnContactPermissionDialogOnWaitlistScreen,
    );
  }

  trackSelectDontAllowOptionOnContactPermissionDialogOnWaitlistScreen() {
    this.track(
      Event.SelectDontAllowOptionOnContactPermissionDialogOnWaitlistScreen,
    );
  }

  ////////// HOME SCREEN EVENTS //////////
  trackViewHomeScreen() {
    this.track(Event.ViewHomeScreen);
  }

  trackTouchMyRelationshipProfileCardOnHomeScreen() {
    this.track(Event.TouchMyRelationshipProfileCardOnHomeScreen);
  }

  trackTouchGeneralAssistantCardOnHomeScreen(assistant: string) {
    this.track(Event.TouchGeneralAssistantCardOnHomeScreen, {
      Assistant: assistant.toLowerCase(),
    });
  }

  trackTouchRelationshipCardOnHomeScreen(relationshipId: string) {
    this.track(Event.TouchRelationshipCardOnHomeScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchUploadConversationButtonOnHomeScreen() {
    this.track(Event.TouchUploadConversationButtonOnHomeScreen);
  }

  trackTouchAnalyzeWhatsappConversationMenuOnUploadConversationSheetOnHomeScreen() {
    this.track(
      Event.TouchAnalyzeWhatsappConversationMenuOnUploadConversationSheetOnHomeScreen,
    );
  }

  trackTouchAnalyzeIMessageConversationMenuOnUploadConversationSheetOnHomeScreen() {
    this.track(
      Event.TouchAnalyzeIMessageConversationMenuOnUploadConversationSheetOnHomeScreen,
    );
  }

  ////////// UPLOAD WHATSAPP SCREEN EVENTS //////////
  trackViewUploadWhatsappTutorialScreen() {
    this.track(Event.ViewUploadWhatsappTutorialScreen);
  }

  trackTouchUploadWhatsappFileOnWhatsappTutorialScreen() {
    this.track(Event.TouchUploadWhatsappFileOnWhatsappTutorialScreen);
  }

  trackSubmitWhatsappFileOnWhatsappTutorialScreen(
    fileName: string,
    fileType: string,
    fileSize: number,
  ) {
    this.track(Event.SubmitWhatsappFileOnWhatsappTutorialScreen, {
      FileName: fileName,
      FileType: fileType,
      FileSize: fileSize,
    });
  }

  ////////// UPLOAD IMESSAGE EVENTS //////////
  trackViewUploadIMessageTutorialScreen() {
    this.track(Event.ViewUploadIMessageTutorialScreen);
  }

  trackTouchShareButtonOnUploadIMessageTutorialScreen() {
    this.track(Event.TouchShareButtonOnUploadIMessageTutorialScreen);
  }

  trackViewIMessageSyncedScreen() {
    this.track(Event.ViewIMessageSyncedScreen);
  }

  trackTouchContinueButtonOnIMessageSyncedScreen() {
    this.track(Event.TouchContinueButtonOnIMessageSyncedScreen);
  }

  trackTouchCancelUploadOnIMessageScreen() {
    this.track(Event.TouchCancelUploadOnIMessageSyncedScreen);
  }

  trackTouchYesButtonOnCancelConfirmationPopupOnIMessageSyncedScreen() {
    this.track(
      Event.TouchYesButtonOnCancelConfirmationPopupOnIMessageSyncedScreen,
    );
  }

  trackTouchNevermindButtonOnCancelConfirmationPopupOnIMessageSyncedScreen() {
    this.track(
      Event.TouchNevermindButtonOnCancelConfirmationPopupOnIMessageSyncedScreen,
    );
  }

  ////////// UPLOAD SCREEN EVENTS //////////
  trackViewCreateNewOrAddToExistingRelationshipScreen() {
    this.track(Event.ViewCreateNewOrAddToExistingRelationshipScreen);
  }

  trackSelectCreateNewRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen() {
    this.track(
      Event.SelectCreateNewRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen,
    );
  }

  trackSelectExistingRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.SelectExistingRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackTouchContinueButtonOnCreateNewOrAddToExistingRelationshipScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchContinueButtonOnCreateNewOrAddToExistingRelationshipScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackViewSelectNameThatBelongsToYouScreen() {
    this.track(Event.ViewSelectNameThatBelongsToYouScreen);
  }

  trackTouchContinueButtonOnSelectNameThatBelongsToYouScreen() {
    this.track(Event.TouchContinueButtonOnSelectNameThatBelongsToYouScreen);
  }

  trackViewTheirPronounsPickerScreen() {
    this.track(Event.ViewTheirPronounsPickerScreen);
  }

  trackSelectTheirPronounsOnTheirPronounsPickerScreen(pronouns: string) {
    this.track(Event.SelectTheirPronounsOnTheirPronounsPickerScreen, {
      Pronouns: pronouns,
    });
  }

  trackTouchContinueButtonOnTheirPronounsPickerScreen(pronouns: string) {
    this.track(Event.TouchContinueButtonOnTheirPronounsPickerScreen, {
      Pronouns: pronouns,
    });
  }

  trackViewRelationshipConnectionPickerScreen() {
    this.track(Event.ViewRelationshipConnectionPickerScreen);
  }

  trackSelectConnectionOnRelationshipConnectionPickerScreen(
    connection: string,
  ) {
    this.track(Event.SelectConnectionOnRelationshipConnectionPickerScreen, {
      Connection: connection,
    });
  }

  trackTouchContinueButtonOnRelationshipConnectionPickerScreen(
    connection: string,
  ) {
    this.track(Event.TouchContinueButtonOnRelationshipConnectionPickerScreen, {
      Connection: connection,
    });
  }

  trackViewAnalysisTypePickerScreen() {
    this.track(Event.ViewAnalysisTypePickerScreen);
  }

  trackSelectAnalysisTypeOnAnalysisTypePickerScreen(
    analysisType: string,
    relationshipId?: string,
  ) {
    const properties: Record<string, any> = {
      AnalysisType: analysisType,
    };

    if (relationshipId) {
      properties.RelationshipId = relationshipId;
    }

    this.track(
      Event.SelectAnalysisTypeOnAnalysisTypePickerScreen,
      properties as any,
    );
  }

  ////////// GENERAL ASSISTANT CHANNEL SCREEN EVENTS //////////

  // Done and some property added by Akhilesh
  trackViewGeneralAssistantChannelScreen(assistant?: string) {
    this.track(Event.ViewGeneralAssistantChannelScreen, {
      Assistant: assistant.toLowerCase(),
    });
  }

  trackSendMessageOnGeneralAssistantChannelScreen(message: string) {
    this.track(Event.SendMessageOnGeneralAssistantChannelScreen, {
      Message: message,
    });
  }

  trackSelectOptionOnGetStartedMessageOnGeneralAssistantChannelScreen(
    option: string,
  ) {
    this.track(
      Event.SelectOptionOnGetStartedMessageOnGeneralAssistantChannelScreen,
      {
        Option: option,
      },
    );
  }

  trackTouchEditRelationshipButtonOnFilledRelationshipMessageOnGeneralAssistantChannelScreen() {
    this.track(
      Event.TouchEditRelationshipButtonOnFilledRelationshipMessageOnGeneralAssistantChannelScreen,
    );
  }

  trackSelectOptionOnUploadConversationMessageOnGeneralAssistantChannelScreen(
    option: string,
  ) {
    this.track(
      Event.SelectOptionOnUploadConversationMessageOnGeneralAssistantChannelScreen,
      {
        Option: option,
      },
    );
  }

  trackSelectOptionOnGettingYourAnalysisReadyMessageOnGeneralAssistantChannelScreen(
    option: string,
  ) {
    this.track(
      Event.SelectOptionOnGettingYourAnalysisReadyMessageOnGeneralAssistantChannelScreen,
      {
        Option: option,
      },
    );
  }

  trackTouchPlusIconOnGeneralAssistantChannelScreen() {
    this.track(Event.TouchPlusIconOnGeneralAssistantChannelScreen);
  }

  trackTouchAnalyzeWhatsappConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen() {
    this.track(
      Event.TouchAnalyzeWhatsappConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen,
    );
  }

  trackTouchAnalyzeIMessageConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen() {
    this.track(
      Event.TouchAnalyzeIMessageConversationMenuOnPlusButtonMenuSheetOnGeneralAssistantChannelScreen,
    );
  }

  ////////// RELATIONSHIP ASSISTANT CHANNEL SCREEN EVENTS //////////
  trackViewRelationshipAssistantChannelScreen(relationshipId: string) {
    this.track(Event.ViewRelationshipAssistantChannelScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchRelationshipInfoButtonOnRelationshipAssistantChannelScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchRelationshipInfoButtonOnRelationshipAssistantChannelScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackOpenAnalysisAttachmentOnRelationshipAssistantChannelScreen(
    relationshipId: string,
    analysisId: string,
  ) {
    this.track(
      Event.OpenAnalysisAttachmentOnRelationshipAssistantChannelScreen,
      {
        RelationshipId: relationshipId,
        AnalysisId: analysisId,
      },
    );
  }

  trackSendMessageOnRelationshipAssistantChannelScreen(
    relationshipId: string,
    message: string,
  ) {
    this.track(Event.SendMessageOnRelationshipAssistantChannelScreen, {
      RelationshipId: relationshipId,
      Message: message,
    });
  }

  trackTouchPlusIconOnRelationshipAssistantChannelScreen(
    relationshipId: string,
  ) {
    this.track(Event.TouchPlusIconOnRelationshipAssistantChannelScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchUpdateYourWhatsappConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchUpdateYourWhatsappConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackTouchUpdateYourIMessageConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchUpdateYourIMessageConversationMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackTouchNewAnalysisMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchNewAnalysisMenuOnPlusButtonMenuSheetOnRelationshipAssistantChannelScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  ////////// RELATIONSHIP DETAIL SCREEN EVENTS //////////
  trackViewRelationshipDetailScreen(relationshipId: string) {
    this.track(Event.ViewRelationshipDetailScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchSyncButtonOnRelationshipDetailScreen(relationshipId: string) {
    this.track(Event.TouchSyncButtonOnRelationshipDetailScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchAnalysisCardOnRelationshipDetailScreen(
    relationshipId: string,
    analysisId: string,
  ) {
    this.track(Event.TouchAnalysisCardOnRelationshipDetailScreen, {
      RelationshipId: relationshipId,
      AnalysisId: analysisId,
    });
  }

  trackTouchMenuButtonOnRelationshipDetailScreen(relationshipId: string) {
    this.track(Event.TouchMenuButtonOnRelationshipDetailScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchEditNameMenuOnMenuSheetOnRelationshipDetailScreen(
    relationshipId: string,
  ) {
    this.track(Event.TouchEditNameMenuOnMenuSheetOnRelationshipDetailScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchDeleteRelationshipMenuOnMenuSheetOnRelationshipDetailScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchDeleteRelationshipMenuOnMenuSheetOnRelationshipDetailScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackTouchDeleteButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchDeleteButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackTouchCancelButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen(
    relationshipId: string,
  ) {
    this.track(
      Event.TouchCancelButtonOnDeleteRelationshipConfirmationPopupOnRelationshipDetailScreen,
      {
        RelationshipId: relationshipId,
      },
    );
  }

  trackTouchCancelMenuOnMenuSheetOnRelationshipDetailScreen(
    relationshipId: string,
  ) {
    this.track(Event.TouchCancelMenuOnMenuSheetOnRelationshipDetailScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchNewAnalysisButtonOnRelationshipDetailScreen(
    relationshipId: string,
  ) {
    this.track(Event.TouchNewAnalysisButtonOnRelationshipDetailScreen, {
      RelationshipId: relationshipId,
    });
  }

  ////////// EDIT RELATIONSHIP SCREEN EVENTS //////////
  trackViewEditRelationshipScreen(relationshipId: string) {
    this.track(Event.ViewEditRelationshipScreen, {
      RelationshipId: relationshipId,
    });
  }

  trackTouchSaveButtonOnEditRelationshipScreen(
    relationshipId: string,
    relationshipName: string,
  ) {
    this.track(Event.TouchSaveButtonOnEditRelationshipScreen, {
      RelationshipId: relationshipId,
      RelationshipName: relationshipName,
    });
  }

  trackTouchYesButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen(
    relationshipId: string,
    relationshipName: string,
  ) {
    this.track(
      Event.TouchYesButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen,
      {
        RelationshipId: relationshipId,
        RelationshipName: relationshipName,
      },
    );
  }

  trackTouchDontSaveButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen(
    relationshipId: string,
    relationshipName: string,
  ) {
    this.track(
      Event.TouchDontSaveButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen,
      {
        RelationshipId: relationshipId,
        RelationshipName: relationshipName,
      },
    );
  }

  ////////// ANALYSIS SCREEN EVENTS //////////
  trackViewAnalysisDetailScreen(analysisId: string, analysisType: string) {
    this.track(Event.ViewAnalysisDetailScreen, {
      AnalysisId: analysisId,
      AnalysisType: analysisType,
    });
  }

  trackViewSectionOnAnalysisDetailScreen(analysisId: string, section: string) {
    this.track(Event.ViewSectionOnAnalysisDetailScreen, {
      AnalysisId: analysisId,
      Section: section,
    });
  }

  trackTouchNextAreaOnAnalysisDetailScreen(
    analysisId: string,
    section: string,
  ) {
    this.track(Event.TouchNextAreaOnAnalysisDetailScreen, {
      AnalysisId: analysisId,
      Section: section,
    });
  }

  trackTouchBackAreaOnAnalysisDetailScreen(
    analysisId: string,
    section: string,
  ) {
    this.track(Event.TouchBackAreaOnAnalysisDetailScreen, {
      AnalysisId: analysisId,
      Section: section,
    });
  }

  trackTouchDismissButtonOnAnalysisDetailScreen(
    analysisId: string,
    section: string,
  ) {
    this.track(Event.TouchDismissButtonOnAnalysisDetailScreen, {
      AnalysisId: analysisId,
      Section: section,
    });
  }

  trackTouchShareButtonOnAnalysisDetailScreen(
    analysisId: string,
    section: string,
  ) {
    this.track(Event.TouchShareButtonOnAnalysisDetailScreen, {
      AnalysisId: analysisId,
      Section: section.toLowerCase(),
    });
  }

  ////////// QUESTIONNAIRE SCREEN EVENTS //////////
  // done
  trackTouchBackButtonOnQuestionnaireScreen() {
    this.track(Event.TouchBackButtonOnQuestionnaireScreen);
  }

  // done
  trackTouchDismissButtonOnQuestionnaireScreen() {
    this.track(Event.TouchDismissButtonOnQuestionnaireScreen);
  }

  // done
  trackTouchYesIAmSureButtonOnQuitConfirmationPopupOnQuestionnaireScreen() {
    this.track(
      Event.TouchYesIAmSureButtonOnQuitConfirmationPopupOnQuestionnaireScreen,
    );
  }

  // done
  trackTouchStayButtonOnQuitConfirmationPopupOnQuestionnaireScreen() {
    this.track(
      Event.TouchStayButtonOnQuitConfirmationPopupOnQuestionnaireScreen,
    );
  }

  // done
  trackViewGenderIdentityFormScreen() {
    this.track(Event.ViewGenderIdentityFormScreen);
  }

  // done
  trackTouchContinueButtonOnGenderIdentityFormScreen(genderIdentity: string) {
    this.track(Event.TouchContinueButtonOnGenderIdentityFormScreen, {
      GenderIdentity: genderIdentity.toLowerCase(),
    });
  }

  // done
  trackViewPronounsFormScreen() {
    this.track(Event.ViewPronounsFormScreen);
  }

  trackTouchContinueButtonOnPronounsFormScreen(pronouns: string) {
    this.track(Event.TouchContinueButtonOnPronounsFormScreen, {
      Pronouns: pronouns.toLowerCase(),
    });
  }

  // done
  trackViewGenderInterestFormScreen() {
    this.track(Event.ViewGenderInterestFormScreen);
  }

  // done
  trackTouchContinueButtonOnGenderInterestFormScreen(genderInterest: string) {
    this.track(Event.TouchContinueButtonOnGenderInterestFormScreen, {
      GenderInterest: genderInterest.toLowerCase(),
    });
  }

  // done
  trackViewRelationshipStatusFormScreen() {
    this.track(Event.ViewRelationshipStatusFormScreen);
  }

  // done
  trackTouchContinueButtonOnRelationshipStatusFormScreen(
    relationshipStatus: string,
  ) {
    this.track(Event.TouchContinueButtonOnRelationshipStatusFormScreen, {
      RelationshipStatus: relationshipStatus.toLowerCase(),
    });
  }

  // done
  trackViewRelationshipGoalsFormScreen() {
    this.track(Event.ViewRelationshipGoalsFormScreen);
  }

  // done
  trackTouchContinueButtonOnRelationshipGoalsFormScreen(
    relationshipGoals: string,
  ) {
    this.track(Event.TouchContinueButtonOnRelationshipGoalsFormScreen, {
      RelationshipGoals: relationshipGoals.toLowerCase(),
    });
  }

  ////////// MATCHMAKING SCREEN EVENTS //////////
  // Done but with useEffect
  trackViewMatchmakingScreen() {
    this.track(Event.ViewMatchmakingScreen);
  }

  trackTouchJoinWaitlistButtonOnMatchmakingScreen() {
    this.track(Event.TouchJoinWaitlistButtonOnMatchmakingScreen);
  }

  trackTouchInviteFriendsButtonOnMatchmakingScreen() {
    this.track(Event.TouchInviteFriendsButtonOnMatchmakingScreen);
  }

  trackSelectAllowOptionOnContactPermissionDialogOnMatchmakingScreen() {
    this.track(
      Event.SelectAllowOptionOnContactPermissionDialogOnMatchmakingScreen,
    );
  }

  trackSelectDontAllowOptionOnContactPermissionDialogOnMatchmakingScreen() {
    this.track(
      Event.SelectDontAllowOptionOnContactPermissionDialogOnMatchmakingScreen,
    );
  }

  ////////// MATCHMAKING REGISTRATION SCREEN EVENTS //////////
  trackViewMatchmakingRegistrationScreen() {
    this.track(Event.ViewMatchmakingRegistrationScreen);
  }

  trackTouchBirthdayInputFieldOnMatchmakingRegistrationScreen() {
    this.track(Event.TouchBirthdayInputFieldOnMatchmakingRegistrationScreen);
  }

  trackTouchLocationInputFieldOnMatchmakingRegistrationScreen() {
    this.track(Event.TouchLocationInputFieldOnMatchmakingRegistrationScreen);
  }

  trackSelectCityOnCityPickerSheetOnMatchmakingRegistrationScreen(location: {
    city: string;
    state?: string;
    country: string;
  }) {
    const properties: Record<string, any> = {
      City: location.city,
      Country: location.country,
    };

    if (location.state && location.country === 'US') {
      properties.State = location.state;
    }

    this.track(
      Event.SelectCityOnCityPickerSheetOnMatchmakingRegistrationScreen,
      properties as any,
    );
  }

  trackTouchJoinWaitlistButtonOnMatchmakingRegistrationScreen(
    birthday: string,
    location: {
      city: string;
      state?: string;
      country: string;
    },
  ) {
    const properties: Record<string, any> = {
      Birthday: birthday,
      City: location.city,
      Country: location.country,
    };

    if (location.state && location.country === 'US') {
      properties.State = location.state;
    }

    this.track(
      Event.TouchJoinWaitlistButtonOnMatchmakingRegistrationScreen,
      properties as any,
    );
  }

  ////////// PROFILE SCREEN EVENTS //////////
  trackViewProfileScreen() {
    this.track(Event.ViewProfileScreen);
  }

  trackSelectMyRelationshipProfileMenuOnProfileScreen() {
    this.track(Event.SelectMyRelationshipProfileMenuOnProfileScreen);
  }

  trackSelectSettingsMenuOnProfileScreen() {
    this.track(Event.SelectSettingsMenuOnProfileScreen);
  }

  trackSelectGiveFeedbackMenuOnProfileScreen() {
    this.track(Event.SelectGiveFeedbackMenuOnProfileScreen);
  }

  trackTouchLogOutButtonOnProfileScreen() {
    this.track(Event.TouchLogOutButtonOnProfileScreen);
  }

  trackTouchLogOutButtonOnLogOutConfirmationPopupOnProfileScreen() {
    this.track(Event.TouchLogOutButtonOnLogOutConfirmationPopupOnProfileScreen);
  }

  trackTouchCancelButtonOnLogOutConfirmationPopupOnProfileScreen() {
    this.track(Event.TouchCancelButtonOnLogOutConfirmationPopupOnProfileScreen);
  }

  ////////// MY RELATIONSHIP PROFILE SCREEN EVENTS //////////
  trackViewMyRelationshipProfileScreen() {
    this.track(Event.ViewMyRelationshipProfileScreen);
  }

  trackTouchMyBasicsCardOnMyRelationshipProfileScreen() {
    this.track(Event.TouchMyBasicsCardOnMyRelationshipProfileScreen);
  }

  ////////// SETTINGS SCREEN EVENTS //////////
  // Done but with useEffect
  trackViewSettingsScreen() {
    this.track(Event.ViewSettingsScreen);
  }

  trackSelectCoachPersonalityMenuOnSettingsScreen() {
    this.track(Event.SelectCoachPersonalityMenuOnSettingsScreen);
  }

  trackSelectPrivacyPolicyMenuOnSettingsScreen() {
    this.track(Event.SelectPrivacyPolicyMenuOnSettingsScreen);
  }

  trackSelectTermsAndConditionsMenuOnSettingsScreen() {
    this.track(Event.SelectTermsAndConditionsMenuOnSettingsScreen);
  }

  trackTouchDeleteAccountButtonOnSettingsScreen() {
    this.track(Event.TouchDeleteAccountButtonOnSettingsScreen);
  }

  ////////// DELETE ACCOUNT SCREEN EVENTS //////////
  trackViewDeleteAccountScreen() {
    this.track(Event.ViewDeleteAccountScreen);
  }

  trackSelectReasonOnDeleteAccountScreen(reason: string) {
    this.track(Event.SelectReasonOnDeleteAccountScreen, {
      Reason: reason,
    });
  }

  trackTouchContinueButtonOnDeleteAccountScreen(
    reason: string,
    comments?: string,
  ) {
    const properties: Record<string, any> = {
      Reason: reason,
    };

    if (comments) {
      properties.Comments = comments;
    }

    this.track(
      Event.TouchContinueButtonOnDeleteAccountScreen,
      properties as any,
    );
  }

  trackViewConfirmDeleteAccountScreen() {
    this.track(Event.ViewConfirmDeleteAccountScreen);
  }

  trackTouchConfirmButtonOnConfirmDeleteAccountScreen(
    reason: string,
    comments?: string,
  ) {
    const properties: Record<string, any> = {
      Reason: reason,
    };

    if (comments) {
      properties.Comments = comments;
    }

    this.track(
      Event.TouchConfirmButtonOnConfirmDeleteAccountScreen,
      properties as any,
    );
  }

  trackTouchCancelButtonOnConfirmDeleteAccountScreen() {
    this.track(Event.TouchCancelButtonOnConfirmDeleteAccountScreen);
  }

  trackViewDeleteAccountSuccessScreen() {
    this.track(Event.ViewDeleteAccountSuccessScreen);
  }

  ////////// SWITCH PERSONALITY SCREEN EVENTS //////////
  trackTouchCancelButtonOnSwitchCoachPersonalityPopup() {
    this.track(Event.TouchCancelButtonOnSwitchCoachPersonalityPopup);
  }

  trackTouchSwitchPersonalityOnCoachPersonalityScreen() {
    this.track(Event.TouchSwitchPersonalityOnCoachPersonalityScreen);
  }

  trackTouchSwitchOnSwitchPersonalityPopup(assistant: string) {
    this.track(Event.TouchSwitchOnSwitchPersonalityPopup, {
      Assistant: assistant.toLowerCase(),
    });
  }

  ////////// INVITE FRIENDS EVENTS //////////
  trackTouchDismissButtonOnInviteFriendsSheet() {
    this.track(Event.TouchDismissButtonOnInviteFriendsSheet);
  }

  trackTouchInviteButtonOnInviteFriendsSheet(phoneNumber: string) {
    this.track(Event.TouchInviteButtonOnInviteFriendsSheet, {
      PhoneNumber: phoneNumber,
    });
  }

  trackSendInvitationMessage(phoneNumber: string, message: string) {
    this.track(Event.SendInvitationMessage, {
      PhoneNumber: phoneNumber,
      Message: message,
    });
  }

  trackCancelSendInvitationMessage() {
    this.track(Event.CancelSendInvitationMessage);
  }

  ////////// GENERAL EVENTS //////////
  // Done need to be update
  trackTouchHomeItemOnTabBar() {
    this.track(Event.TouchHomeItemOnTabBar);
  }

  // Done need to be update
  trackTouchMatchmakingItemOnTabBar() {
    this.track(Event.TouchMatchmakingItemOnTabBar);
  }

  // Done need to be update
  trackTouchProfileItemOnTabBar() {
    this.track(Event.TouchProfileItemOnTabBar);
  }

  // NOT DOING
  // trackViewFilledOutMessage() {
  //   this.track(Event.ViewFilledOutMessage);
  // }
  //
  // trackReceiveAnAnalysis(
  //   chatType?: string,
  //   relationshipName?: string,
  //   relationshipPronoun?: string,
  //   relationshipType?: string,
  // ) {
  //   this.track(Event.ReceiveAnAnalysis, {
  //     ChatType: chatType,
  //     RelationshipName: relationshipName,
  //     RelationshipPronoun: relationshipPronoun,
  //     RelationshipType: relationshipType,
  //   });
  // }
  // trackCoachSentAMessage(message: string, assistant: string) {
  //   this.track(Event.CoachSentAMessage, {
  //     Message: message,
  //     Assistant: assistant.toLowerCase(),
  //   });
  // }
  // trackFirstAppOpen() {
  //   this.track(Event.FirstAppOpen);
  // }
  //
  // I don't understand what is this
  // trackViewUploadConversationMessage() {
  //   this.track(Event.ViewUploadConversationMessage);
  // }
  // trackEditFilledRelationhipProfile() {
  //   this.track(Event.EditFilledRelationhipProfile);
  // }

  // WRONG NAME
  // trackTouchAnalysisIsReadyNotification() {
  //   this.track(Event.TouchAnalysisIsReadyNotification);
  // }
}
