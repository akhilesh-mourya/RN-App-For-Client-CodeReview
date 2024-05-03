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
} from '../styles';
import {t} from 'i18next';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {MixpanelData, PrimaryButtonType} from '../../../../../constants/enums';
import useAuth from '../../../../../hooks/context/useAuth';
import WhatsappQuestionnaireItem from '../../../../../components/molecule/whatsappQuestionnaireItem';
import {useAnalytics} from '../../../../../services/analytics';

interface RelationshipStepProps {
  updateStep?: Function;
  senders?: Array<string>;
  otherUserName?: string;
}

const RelationshipPronoun: FC<RelationshipStepProps> = (props: any) => {
  const {
    selectedOptionForPronoun,
    updateOptionForStep,
    updateStep,
    pronounList,
  } = props;
  const {authContextData} = useAuth();
  const {currCreaterelationshipData} = authContextData;
  const analytics = useAnalytics();

  const renderHeaderContent = () => {
    return (
      <>
        <Title>
          {t('Whatsapp_UserSelector_Pronoun_Title').replace(
            '$',
            currCreaterelationshipData?.otherUserName,
          )}
        </Title>
        <DynamicBlock mTop={22} />
      </>
    );
  };

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          const objectPronoun =
            authContextData.currCreaterelationshipData?.objectPronoun;

          if (objectPronoun) {
            const mappedPronouns = (MixpanelData as any)[objectPronoun];
            analytics.trackTouchContinueButtonOnTheirPronounsPickerScreen(
              mappedPronouns,
            );
          }

          updateStep(3);
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
        onPress={() => updateOptionForStep(index, 2, item?.value)}
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

export default RelationshipPronoun;
