import {LottieDotsAnim, MessageLoadingContainer} from './style';
import React, {FC} from 'react';

const LeftMessageLoadingCell: FC<{}> = React.memo(() => {
  return (
    <MessageLoadingContainer>
      <LottieDotsAnim />
    </MessageLoadingContainer>
  );
});
export default LeftMessageLoadingCell;
