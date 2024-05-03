import React, {FC} from 'react';
import {
  Container,
  DetailContainer,
  DotIcon,
  NameContainer,
  NameLabel,
  ProfileImg,
  SubTitleLabel,
  TimeLabel,
  InnerRowView,
  RightContainer,
} from './styles';
import {DUMMY_USER_PROFILE} from '../../../constants/appContants';
import {CoachDataProps} from '../../../constants/mockData';

interface MatchmakingMatchesItemProps {
  item: CoachDataProps;
}

const MatchmakingMatchesItem: FC<MatchmakingMatchesItemProps> = React.memo(
  props => {
    const {item} = props;

    return (
      <Container>
        <InnerRowView>
          <ProfileImg source={{uri: DUMMY_USER_PROFILE}} />
          <DetailContainer>
            <NameContainer>
              <NameLabel>{item?.name}</NameLabel>
            </NameContainer>
            <SubTitleLabel>{item?.subTitle}</SubTitleLabel>
          </DetailContainer>
        </InnerRowView>
        <RightContainer>
          <NameContainer>
            <TimeLabel>{item?.time}</TimeLabel>
            {item?.isUnread && <DotIcon />}
          </NameContainer>
        </RightContainer>
      </Container>
    );
  },
);
export default MatchmakingMatchesItem;
