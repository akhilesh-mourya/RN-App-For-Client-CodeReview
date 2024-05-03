import React, {FC} from 'react';
import {ScrollView} from './styles';

interface ScrollingTextProps {
  children: React.ReactNode;
}

const ScrollingText: FC<ScrollingTextProps> = ({children}) => (
  <ScrollView>{children}</ScrollView>
);

export default ScrollingText;
