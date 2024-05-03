import React, {FC} from 'react';
import {
  ButtonContainerView,
  ButtonNextArrowActive,
  ButtonNextArrowDisabled,
  DynamicBlock,
  MainSubContainer,
  NameInput,
  SelectionContainer,
  SubContainer,
  Title,
} from '../styles';
import {t} from 'i18next';
import AMPrimaryButton from '../../../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../../../constants/enums';

const RelationshipName: FC<{}> = React.memo((props: any) => {
  const {isRelationshipNameContinueActive, updateRelationshipName, updateStep} = props;
  const renderHeaderContent = () => {
    return (
      <>
        <Title>{t('Whatsapp_RelationshipName_Title')}</Title>
        <DynamicBlock mTop={30} />
      </>
    );
  };

  const renderBodyContent = () => {
    return (
      <SelectionContainer isSelected={isRelationshipNameContinueActive}>
        <NameInput
          autoFocus={true}
          placeholder={t('')}
          onChangeText={updateRelationshipName}
        />
      </SelectionContainer>
    );
  };

  const renderBottomContent = () => (
    <ButtonContainerView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={t('Continue')}
        onPress={() => {
          updateStep(4);
        }}
        isDisabled={!isRelationshipNameContinueActive}
        rightIcon={
          isRelationshipNameContinueActive ? (
            <ButtonNextArrowActive />
          ) : (
            <ButtonNextArrowDisabled />
          )
        }
      />
    </ButtonContainerView>
  );

  return (
    <MainSubContainer>
      <SubContainer>
        {renderHeaderContent()}
        {renderBodyContent()}
      </SubContainer>
      {renderBottomContent()}
    </MainSubContainer>
  );
});

export default RelationshipName;
