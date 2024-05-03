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
} from '../../fillWhatsappQuestionnaire/styles';
import {t} from 'i18next';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../../constants/enums';
import WhatsappQuestionnaireItem from '../../../../../components/molecule/whatsappQuestionnaireItem';

interface IMessageRelationshipStepProps {
  relationshipsList?: Array<any>;
  selectedOptionForRelationshipType?: number;
  updateOptionForStep?: Function;
  onFinalStepPress?: Function;
}

const IMessageRelationshipType: FC<IMessageRelationshipStepProps> = React.memo(
  props => {
    const {
      selectedOptionForRelationshipType,
      updateOptionForStep = () => {},
      onFinalStepPress = () => {},
      relationshipsList,
    } = props;

    const renderHeaderContent = () => {
      return (
        <>
          <Title>{t('IMessage_RelationshipType_Title')}</Title>
          <SubTitle>{t('IMessage_RelationshipType_Des')}</SubTitle>
          <DynamicBlock mTop={22} />
        </>
      );
    };

    const renderRelationshipTypeItem = ({item, index}) => {
      return (
        <WhatsappQuestionnaireItem
          item={item}
          isSelected={selectedOptionForRelationshipType === index}
          onPress={() => updateOptionForStep(index, 2, item?.value)}
        />
      );
    };

    const renderBodyContent = () => {
      return (
        <CommonFlatList
          data={relationshipsList}
          renderItem={renderRelationshipTypeItem}
        />
      );
    };

    const renderBottomButton = () => (
      <BottomView>
        <AMPrimaryButton
          buttonType={PrimaryButtonType.FullButton}
          label={t('Continue')}
          onPress={onFinalStepPress}
          isDisabled={selectedOptionForRelationshipType === -1}
          rightIcon={
            selectedOptionForRelationshipType === -1 ? (
              <ButtonNextArrowDisabled />
            ) : (
              <ButtonNextArrowActive />
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
  },
);

export default IMessageRelationshipType;
