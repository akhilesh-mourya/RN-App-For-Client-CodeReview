import React, {FC} from 'react';
import {
  BottomView,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  CommonFlatList,
  DynamicBlock,
  MainSubContainer,
  SubContainer,
  SubTitle,
  Title,
} from '../styles';
import {t} from 'i18next';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../../constants/enums';
import useAuth from '../../../../../hooks/context/useAuth';
import WhatsappQuestionnaireItem from '../../../../../components/molecule/whatsappQuestionnaireItem';

interface RelationshipStepProps {
  otherUserName?: any;
}

const RelationshipType: FC<RelationshipStepProps> = React.memo(props => {
  const {
    selectedOptionForRelationshipType,
    callCreateRelationshipAPI,
    updateOptionForStep,
    relationshipTypeList,
  } = props;

  const {authContextData} = useAuth();
  const {currCreaterelationshipData} = authContextData;
  const renderHeaderContent = () => {
    return (
      <>
        <Title>
          {t('Whatsapp_RelationshipType_Title').replace(
            '$',
            currCreaterelationshipData?.otherUserName,
          )}
        </Title>
        <SubTitle>{t('Whatsapp_RelationshipType_Subtitle')}</SubTitle>
        <DynamicBlock mTop={22} />
      </>
    );
  };

  const renderRelationshipTypeItem = ({item, index}) => {
    return (
      <WhatsappQuestionnaireItem
        item={item}
        isSelected={selectedOptionForRelationshipType === index}
        onPress={() => updateOptionForStep(index, 3, item?.value)}
      />
    );
  };

  const renderBodyContent = () => {
    return (
      <CommonFlatList
        data={relationshipTypeList}
        renderItem={renderRelationshipTypeItem}
      />
    );
  };

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={callCreateRelationshipAPI}
        isDisabled={!currCreaterelationshipData?.connection}
        rightIcon={
          currCreaterelationshipData?.connection ? (
            <ButtonNextArrowActive />
          ) : (
            <ButtonNextArrowDisabled />
          )
        }
      />
    </BottomView>
  );

  return (
    <MainSubContainer>
      <SubContainer>
        {renderHeaderContent()}
        {renderBodyContent()}
      </SubContainer>
      {renderBottomButton()}
    </MainSubContainer>
  );
});

export default RelationshipType;
