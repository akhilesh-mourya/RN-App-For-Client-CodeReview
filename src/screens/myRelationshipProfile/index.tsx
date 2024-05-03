import React, {FC, useEffect} from 'react';
import HeaderWithBackTitle from '../../components/headerWithBackTitle';
import {t} from 'i18next';
import {
  ComingSoonContainer,
  ComingSoonTitle,
  IconContainer,
  IconTitle,
  NextArrowIcon,
  RowContainer,
  SafeAreaContainer,
  SectionContainer,
  SectionTitle,
  SubContainer,
  SubTitle,
  TouchableView,
} from './styles';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {useMyRelationshipProfile} from '../../hooks/myRelationshipProfile/useMyRelationshipProfile';
import {useAnalytics} from '../../services/analytics';
import {useIsFocused} from '@react-navigation/native';

const MyRelationshipProfileScreen: FC<{}> = React.memo(() => {
  const {redirectToPreviousScreen, redirectToNextScreen, getIconTitle} =
    useMyRelationshipProfile();
  const analytics = useAnalytics();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      analytics.trackViewMyRelationshipProfileScreen();
    }
  }, [analytics, isFocused]);

  const renderHeader = () => {
    return (
      <HeaderWithBackTitle
        title={t('Home_Progress_Header_Label')}
        onBackPress={redirectToPreviousScreen}
      />
    );
  };

  const renderSubTitle = () => {
    return <SubTitle>{t('MY_RELATIONSHIP_PROFILE_SUBTITLE')}</SubTitle>;
  };

  const renderComingSoonLayout = () => {
    return (
      <ComingSoonContainer>
        <ComingSoonTitle>
          {t('MY_RELATIONSHIP_PROFILE_Coming_Soon')}
        </ComingSoonTitle>
      </ComingSoonContainer>
    );
  };

  const renderMyBasicLayout = (title: string, type: number) => {
    return (
      <TouchableView onPress={() => redirectToNextScreen(type)}>
        <SectionContainer>
          <RowContainer>
            <IconContainer>
              <IconTitle>{getIconTitle(type)}</IconTitle>
            </IconContainer>
            <SectionTitle>{title}</SectionTitle>
          </RowContainer>
          <RowContainer>
            <NextArrowIcon />
          </RowContainer>
        </SectionContainer>
      </TouchableView>
    );
  };

  const renderSectionLayout = (title: string, type: number) => {
    return (
      <SectionContainer>
        <RowContainer>
          <IconContainer>
            <IconTitle>{getIconTitle(type)}</IconTitle>
          </IconContainer>
          <SectionTitle>{title}</SectionTitle>
        </RowContainer>
        <RowContainer>{renderComingSoonLayout()}</RowContainer>
      </SectionContainer>
    );
  };

  return (
    <SafeAreaContainer>
      <DarkBackgroundContainer>
        {renderHeader()}
        <SubContainer>
          {renderSubTitle()}
          {renderMyBasicLayout(t('MY_BASICS'), 1)}
          {renderSectionLayout(t('MY_PREFERENCE'), 2)}
          {renderSectionLayout(t('My_PERSONALITY'), 3)}
          {renderSectionLayout(t('MY_LOVE_LANGUAGES'), 4)}
          {renderSectionLayout(t('My_DEALBREAKERS'), 5)}
        </SubContainer>
      </DarkBackgroundContainer>
    </SafeAreaContainer>
  );
});

export default MyRelationshipProfileScreen;
