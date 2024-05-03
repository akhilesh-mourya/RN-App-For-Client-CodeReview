import React, {FC} from 'react';
import {
  BottomView,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  CommonFlatList,
  DynamicBlock,
  MainSubContainer,
  SubContainer,
  Title,
} from '../../fillWhatsappQuestionnaire/styles';
import {t} from 'i18next';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {MixpanelData, PrimaryButtonType} from '../../../../../constants/enums';
import WhatsappQuestionnaireItem from '../../../../../components/molecule/whatsappQuestionnaireItem';
import {useAnalytics} from '../../../../../services/analytics';
import useAuth from '../../../../../hooks/context/useAuth';

interface IMessageRelationshipStepProps {
  updateStep?: Function;
  otherUserName?: string;
}

const IMessageRelationshipPronoun: FC<IMessageRelationshipStepProps> = (
  props: any,
) => {
  const {
    selectedOptionForPronoun,
    updateOptionForStep,
    updateStep,
    pronounList,
    otherUserName,
  } = props;
  const analytics = useAnalytics();
  const renderHeaderContent = () => {
    return (
      <>
        <Title>
          {t('Whatsapp_UserSelector_Pronoun_Title').replace('$', otherUserName)}
        </Title>
        <DynamicBlock mTop={22} />
      </>
    );
  };

  const {authContextData} = useAuth();

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          const objectPronoun =
            authContextData.currCreaterelationshipData?.objectPronoun;

          console.log('object pronoun:', objectPronoun);

          if (objectPronoun) {
            const mappedPronouns = (MixpanelData as any)[objectPronoun];
            analytics.trackTouchContinueButtonOnTheirPronounsPickerScreen(
              mappedPronouns,
            );
          }

          updateStep(2);
        }}
        isDisabled={selectedOptionForPronoun === -1}
        rightIcon={
          selectedOptionForPronoun > -1 ? (
            <ButtonNextArrowActive />
          ) : (
            <ButtonNextArrowDisabled />
          )
        }
      />
    </BottomView>
  );

  const renderPronounItem = ({item, index}) => {
    return (
      <WhatsappQuestionnaireItem
        item={item}
        isSelected={selectedOptionForPronoun === index}
        onPress={() => updateOptionForStep(index, 1, item?.value)}
      />
    );
  };

  const renderBodyContent = () => {
    return <CommonFlatList data={pronounList} renderItem={renderPronounItem} />;
  };

  return (
    <MainSubContainer>
      <SubContainer>
        {renderHeaderContent()}
        {renderBodyContent()}
      </SubContainer>
      {renderBottomButton()}
    </MainSubContainer>
  );
};

export default IMessageRelationshipPronoun;
