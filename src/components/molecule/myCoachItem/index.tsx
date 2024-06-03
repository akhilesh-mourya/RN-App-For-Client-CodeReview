import React, {FC} from 'react';
import {
  Container,
  DetailContainer,
  DotIcon,
  NameContainer,
  NameLabel,
  ProfileImg,
  StarIcon,
  SubTitleLabel,
  TimeLabel,
  InnerRowView,
  SubTitleBoldLabel,
} from './styles';
import {AssistantDataType} from '../../../../@types/context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from 'styled-components';
import {getTime} from '../../../utility';
import {ChatMessagesType} from '../../../types';
import {getMessageContentToShow} from '../../../utility/chatUtility';

interface MyCoachItemProps {
  item: AssistantDataType | {};
  lastMessageDataForCoach: ChatMessagesType | null;
  onCoachPress: Function;
}

const MyCoachItem: FC<MyCoachItemProps> = React.memo(props => {
  const {item, onCoachPress = () => {}, lastMessageDataForCoach = null} = props;
  const theme = useTheme();
  return (
    <Container onPress={() => onCoachPress(item)}>
      {item?.name ? (
        <>
          <InnerRowView>
            <ProfileImg source={{uri: item?.avatarUrl}} />
            <DetailContainer>
              <NameContainer>
                <NameLabel>{item?.name}</NameLabel>
                <StarIcon />
              </NameContainer>
              {lastMessageDataForCoach?.isRead ? (
                <SubTitleLabel>
                  {getMessageContentToShow(
                    lastMessageDataForCoach?.latestMessage?.content ||
                      item?.intro,
                  )}
                </SubTitleLabel>
              ) : (
                <SubTitleBoldLabel>
                  {getMessageContentToShow(
                    lastMessageDataForCoach?.latestMessage?.content ||
                      item?.intro,
                  )}
                </SubTitleBoldLabel>
              )}
            </DetailContainer>
          </InnerRowView>
          {lastMessageDataForCoach && (
            <NameContainer>
              <TimeLabel>
                {getTime(lastMessageDataForCoach?.latestMessage?.createdAt)}
              </TimeLabel>
              {!lastMessageDataForCoach?.isRead && <DotIcon />}
            </NameContainer>
          )}
        </>
      ) : (
        <SkeletonPlaceholder
          backgroundColor={theme.colors.base_90}
          borderRadius={10}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={20}
              />
              <SkeletonPlaceholder.Item
                width={'80%'}
                height={30}
                marginLeft={10}
                marginRight={4}
                borderRadius={0}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={'80%'}
              height={20}
              marginLeft={50}
              marginRight={4}
              marginTop={1}
              borderRadius={0}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
    </Container>
  );
});
export default MyCoachItem;
