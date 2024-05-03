import React, {FC} from 'react';
import {
  BottomView,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  DynamicBlock,
  MainSubContainer,
  NextArrowIcon,
  OptionLabel,
  PlusIcon,
  ProfileBG,
  RowContainer,
  SelectionContainer,
  SubContainer,
  Title,
  UserSelectionFlatList,
} from '../styles';
import {t} from 'i18next';
import UserSelectionItem from '../../../../../components/molecule/userSelectionItem';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../../constants/enums';
import {useAnalytics} from '../../../../../services/analytics';

interface RelationshipStepProps {
  updateStep?: Function;
  senders?: Array<string>;
  relationshipList?: any;
  onNextPress?: Function;
  onClickCreateNewRelationship?: Function;
  isFromUpdateAndDiffConv?: boolean;
  existingRelationToUpdateName?: string;
}

const SelectExistingUser: FC<RelationshipStepProps> = React.memo(
  (props: any) => {
    const {
      selectedOptionForExistingUserSelection,
      updateOptionForExistingUser,
      removeRelationhipId,
      onExistingUserContinuePress,
      updateStep,
      relationshipList,
      onNextPress,
      onClickCreateNewRelationship = () => {},
      isFromUpdateAndDiffConv = false,
      existingRelationToUpdateName = '',
      updateExistingRelationWithDiffNameConfirmation = () => {},
    } = props;

    const analytics = useAnalytics();

    const renderHeaderContent = () => {
      return (
        <>
          <Title>
            {isFromUpdateAndDiffConv
              ? t('Update_Conv_With_Diff_Chat').replaceAll(
                  '$',
                  existingRelationToUpdateName,
                )
              : t('Existing_Relationship')}
          </Title>
          <DynamicBlock mTop={22} />
        </>
      );
    };

    const renderListItem = ({item, index}) => {
      return (
        <UserSelectionItem
          item={item}
          isExistUser={true}
          onPress={() => updateOptionForExistingUser(index, item)}
          isSelected={index === selectedOptionForExistingUserSelection}
        />
      );
    };

    const renderCreateUserLayout = () => {
      return (
        <SelectionContainer
          onPress={() => {
            analytics.trackSelectCreateNewRelationshipMenuOnCreateNewOrAddToExistingRelationshipScreen();
            onClickCreateNewRelationship();
            updateStep(2);
            removeRelationhipId();
          }}>
          <RowContainer>
            <ProfileBG>
              <PlusIcon />
            </ProfileBG>
            <OptionLabel>{t('Create_New')}</OptionLabel>
          </RowContainer>
          <NextArrowIcon />
        </SelectionContainer>
      );
    };

    const renderBodyContent = () => {
      return (
        <UserSelectionFlatList
          data={relationshipList}
          renderItem={renderListItem}
          ListFooterComponent={() => renderCreateUserLayout()}
        />
      );
    };

    const renderBottomButton = () => (
      <BottomView>
        <AMPrimaryButton
          buttonType={PrimaryButtonType.FullButton}
          label={t('Continue')}
          onPress={() =>
            isFromUpdateAndDiffConv
              ? updateExistingRelationWithDiffNameConfirmation()
              : onExistingUserContinuePress(onNextPress)
          }
          isDisabled={selectedOptionForExistingUserSelection === -1}
          rightIcon={
            selectedOptionForExistingUserSelection > -1 ? (
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
  },
);

export default SelectExistingUser;
