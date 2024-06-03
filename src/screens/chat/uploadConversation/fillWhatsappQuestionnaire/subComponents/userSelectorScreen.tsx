import React, {FC} from 'react';
import {
  BottomView,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  DynamicBlock,
  MainSubContainer,
  SubContainer,
  Title,
  UserSelectionFlatList,
} from '../styles';
import {t} from 'i18next';
import MaskedView from '../../../fillQuestionnaire/linearGradient/maskedView';
import UserSelectionItem from '../../../../../components/molecule/userSelectionItem';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../../constants/enums';
import {useAnalytics} from '../../../../../services/analytics';

interface RelationshipStepProps {
  updateStep?: Function;
  removeRelationhipId?: Function;
  updateOptionForStep?: Function;
  senders?: Array<string>;
  selectedOptionForUserSelection?: number;
  isButtonEnabled?: boolean;
  isNamesDiff?: boolean;
  isFromWhatsAppUpload: boolean;
  isUpdateFlow?: boolean;
  updateExistingRelationship?: Function;
  isFromUpdateAndDiffConv?: boolean;
}

const UserSelectorScreen: FC<RelationshipStepProps> = React.memo(props => {
  const {
    selectedOptionForUserSelection,
    updateOptionForStep = () => {},
    removeRelationhipId = () => {},
    updateStep = () => {},
    senders = [],
    isNamesDiff = false,
    isUpdateFlow = false,
    updateExistingRelationship = () => {},
    isFromUpdateAndDiffConv = false,
  } = props;

  const analytics = useAnalytics();

  const getIsButtonDisabled = () => {
    return selectedOptionForUserSelection === -1;
  };

  const renderHeaderContent = () => {
    return (
      <>
        <Title>
          {isNamesDiff && !isFromUpdateAndDiffConv
            ? t('Changed_Name')
            : t('Whatsapp_UserName_Selector_Title')}
        </Title>
        <DynamicBlock mTop={22} />
      </>
    );
  };

  const renderListItem = ({item, index}) => {
    return (
      <UserSelectionItem
        item={item}
        isExistUser={false}
        onPress={() => {
          updateOptionForStep(index, 1, item);
        }}
        isSelected={index === selectedOptionForUserSelection}
      />
    );
  };

  const renderBodyContent = () => {
    return (
      <MaskedView>
        <UserSelectionFlatList data={senders} renderItem={renderListItem} />
      </MaskedView>
    );
  };

  const renderBottomButton = () => (
    <BottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          if (isUpdateFlow && !isNamesDiff) {
            updateExistingRelationship();
          } else {
            removeRelationhipId();
            analytics.trackTouchContinueButtonOnSelectNameThatBelongsToYouScreen();
            updateOptionForStep(
              selectedOptionForUserSelection,
              1,
              senders[selectedOptionForUserSelection],
            );
            updateStep(2);
          }
        }}
        isDisabled={getIsButtonDisabled()}
        rightIcon={
          getIsButtonDisabled() ? (
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
});

export default UserSelectorScreen;
