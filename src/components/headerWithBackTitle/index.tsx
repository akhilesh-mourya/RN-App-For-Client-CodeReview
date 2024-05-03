import React, {FC} from 'react';
import {BackIcon, HeaderContainer, HeaderTitle, TouchableOpacity} from './styles';

interface HeaderWithBackTitleProps {
  onBackPress: any;
  title: string;
}

const HeaderWithBackTitle: FC<HeaderWithBackTitleProps> = React.memo(props => {
  const {onBackPress, title} = props;
  return (
    <HeaderContainer>
      <TouchableOpacity onPress={onBackPress}>
        <BackIcon />
      </TouchableOpacity>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
});

export default HeaderWithBackTitle;
