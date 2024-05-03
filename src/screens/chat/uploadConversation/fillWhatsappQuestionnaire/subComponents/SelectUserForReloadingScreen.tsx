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
import useAuth from '../../../../../hooks/context/useAuth';

interface RelationshipStepProps {
  updateStep?: Function;
  senders?: Array<string>;
  relationshipList?: any;
  onNextPress?: Function;
}

const SelectUserForReloadingScreen: FC<RelationshipStepProps> = React.memo(
  (props: any) => {
    const {
      userSelectionList,
      selectedOptionForUserSelection,
      updateOptionForStep,
      updateStep,
      onNextPress,
    } = props;

    const {authContextData} = useAuth();
    const {currCreaterelationshipData} = authContextData;

    const renderHeaderContent = () => {
      return (
        <>
          <Title>
            {!authContextData?.currCreaterelationshipData
              ?.isFromSameRelationshipName
              ? t('Whatsapp_UserName_Selector_Title')
              : t('Changed_Name')}
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
            updateOptionForStep(index, 1, item.name);
          }}
          isSelected={index === selectedOptionForUserSelection}
        />
      );
    };

    const renderBodyContent = () => {
      return (
        <MaskedView>
          <UserSelectionFlatList
            data={userSelectionList}
            renderItem={renderListItem}
          />
        </MaskedView>
      );
    };

    const renderBottomButton = () => (
      <BottomView>
        <AMPrimaryButton
          buttonType={PrimaryButtonType.FullButton}
          label={t('Continue')}
          onPress={() => {
            onNextPress();
            updateStep(2);
          }}
          isDisabled={!currCreaterelationshipData?.name}
          rightIcon={
            currCreaterelationshipData?.name ? (
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

export default SelectUserForReloadingScreen;
