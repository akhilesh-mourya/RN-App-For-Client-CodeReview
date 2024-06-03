import React, {FC} from 'react';
import {
  Container,
  ProfileContainer,
  DetailContainer,
  DotIcon,
  NameContainer,
  NameLabel,
  ProfileImg,
  IconContainer,
  SubTitleLabel,
  TimeLabel,
  InnerRowView,
  RightContainer,
  IMessageContainer,
  ButtonLabel,
  NameInitialLabel,
  SubTitleBoldLabel,
} from './styles';
import AMButton from '../../button/AMButton';
import {getEachFirstLetterCapitalize, getTime} from '../../../utility';
import {getOnltFirstLatterOfName} from '../../../helpers/commonFunctions';
import {AssistantDataType} from '../../../../@types/context';
import i18next from 'i18next';

interface RelationshipItemProps {
  item: any;
  onItemPress: any;
  coachData: AssistantDataType | {};
}

const RelationshipItem: FC<RelationshipItemProps> = React.memo(props => {
  const {item, onItemPress, coachData} = props;
  const getTagName = () => {
    if (item?.inputs?.length > 0) {
      if (item?.inputs[0]?.source === 'whatsapp') {
        return i18next.t('WhatsApp');
      } else if (item?.inputs[0]?.source === 'imessage') {
        return i18next.t('iMessage');
      }
    } else {
      return '';
    }
  };

  return (
    <AMButton onPress={() => onItemPress(item, coachData)}>
      <Container>
        <InnerRowView>
          <ProfileContainer>
            <IconContainer>
              <NameInitialLabel>
                {getOnltFirstLatterOfName(item?.name || '')}
              </NameInitialLabel>
            </IconContainer>
            <ProfileImg source={{uri: coachData?.avatarUrl}} />
          </ProfileContainer>
          <DetailContainer>
            <NameContainer>
              <NameLabel>{getEachFirstLetterCapitalize(item?.name)}</NameLabel>
            </NameContainer>
            {item?.isRead ? (
              <SubTitleLabel>
                {item?.latestMessage?.content || ''}
              </SubTitleLabel>
            ) : (
              <SubTitleBoldLabel>
                {item?.latestMessage?.content || ''}
              </SubTitleBoldLabel>
            )}
          </DetailContainer>
        </InnerRowView>
        <RightContainer>
          <IMessageContainer>
            <ButtonLabel>{getTagName()}</ButtonLabel>
          </IMessageContainer>
          {item?.latestMessage && (
            <NameContainer>
              <TimeLabel>{getTime(item?.latestMessage?.createdAt)}</TimeLabel>
              {!item?.isRead && <DotIcon />}
            </NameContainer>
          )}
        </RightContainer>
      </Container>
    </AMButton>
  );
});
export default RelationshipItem;
