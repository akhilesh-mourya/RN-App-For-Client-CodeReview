import React, {FC} from 'react';
import {
  BasicSectionContainer,
  ColumnContainer,
  NextArrowIcon,
  RowContainer,
  SafeAreaContainer,
  SectionTitle,
  SectionValue,
  SeparatorView,
  TouchableView,
} from './styles';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import HeaderWithBackTitle from '../../components/headerWithBackTitle';
import {useMyRelationshipProfile} from '../../hooks/myRelationshipProfile/useMyRelationshipProfile';
import {t} from 'i18next';
import {MyBasicsStatus} from '../../enums';
import {capitalizeFirstLetter} from '../../utility';

const MyBasicsScreen: FC<{}> = React.memo(() => {
  const {
    redirectToPreviousScreen,
    gender,
    genderInterest,
    relationshipStatus,
    relationshipGoal,
  } = useMyRelationshipProfile();
  const renderHeader = () => {
    return (
      <HeaderWithBackTitle
        title={t('MY_BASICS')}
        onBackPress={redirectToPreviousScreen}
      />
    );
  };

  const renderSectionLayout = (title: string, value: string, type: number) => {
    return (
      <>
        <TouchableView>
          <BasicSectionContainer>
            <ColumnContainer>
              <SectionTitle>{title}</SectionTitle>
              <SectionValue>
                {type === 2
                  ? capitalizeFirstLetter(value)
                  : MyBasicsStatus[`${value}`]}
              </SectionValue>
            </ColumnContainer>
            <RowContainer>
              <NextArrowIcon />
            </RowContainer>
          </BasicSectionContainer>
        </TouchableView>
        {type !== 4 && <SeparatorView />}
      </>
    );
  };

  return (
    <SafeAreaContainer>
      <DarkBackgroundContainer>
        {renderHeader()}
        {renderSectionLayout(t('Gender_Identity'), gender, 1)}
        {renderSectionLayout(t('Interested_In'), genderInterest, 2)}
        {renderSectionLayout(t('Relationship_status'), relationshipStatus, 3)}
        {renderSectionLayout(t('Relationship_goals'), relationshipGoal, 4)}
      </DarkBackgroundContainer>
    </SafeAreaContainer>
  );
});

export default MyBasicsScreen;
