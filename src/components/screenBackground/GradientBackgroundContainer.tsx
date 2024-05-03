import React from 'react';
import {
  Container,
  GradientContainer,
  GradientCommonContainer,
  DiamondGradientContainer,
  DarkContainer,
} from './styles';

interface GradientBackgroundContainer {
  children: React.ReactNode;
  bottomMargin?: number;
  backgroundOpacity?: number;
}

const GradientBackgroundContainer: React.FC<GradientBackgroundContainer> = ({
  children,
  bottomMargin = 0,
  backgroundOpacity = 1,
}) => (
  <Container>
    <GradientContainer
      bottomMargin={bottomMargin}
      opacity={backgroundOpacity}
    />
    {children}
  </Container>
);

export const GradientCommonBackgroundContainer: React.FC<
  GradientBackgroundContainer
> = ({children, bottomMargin = 0, backgroundOpacity = 1}) => (
  <Container>
    <GradientCommonContainer
      bottomMargin={bottomMargin}
      opacity={backgroundOpacity}
    />
    {children}
  </Container>
);

export const DiamondGradientBackgroundContainer: React.FC<
  GradientBackgroundContainer
> = ({children, bottomMargin = 0, backgroundOpacity = 1}) => (
  <DiamondGradientContainer>
    <GradientContainer
      bottomMargin={bottomMargin}
      opacity={backgroundOpacity}
    />
    {children}
  </DiamondGradientContainer>
);

export const DarkBackgroundContainer: React.FC<GradientBackgroundContainer> = ({
  children,
}) => <DarkContainer>{children}</DarkContainer>;

export default GradientBackgroundContainer;
