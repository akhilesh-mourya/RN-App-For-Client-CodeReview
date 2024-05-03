import React, {FC} from 'react';
import {
  LoaderContainer,
  MainContainer,
  LottieContainer,
  Container,
} from './styles';
import {useLoader} from '../../hooks/loader/useLoader';
import {Animated} from 'react-native';

interface LoaderProps {
  isVisible?: boolean;
  isAnimationEnabled?: boolean;
}

const Loader: FC<LoaderProps> = React.memo(props => {
  const {isVisible, isAnimationEnabled} = props;
  const {startBorderColorAnim, startOpacityForMainContainer} = useLoader();
  const RowSubAnimatedContainer =
    Animated.createAnimatedComponent(MainContainer);
  const LoaderAnimatedContainer =
    Animated.createAnimatedComponent(LoaderContainer);
  const translateBorderColor = startBorderColorAnim();
  //const opacityMain = startOpacityForMainContainer();
  if (isVisible) {
    return (
      // <ModalContainer
      //   isVisible={isVisible}
      //   isAnimationEnabled={isAnimationEnabled}>
      <Container>
        <RowSubAnimatedContainer>
          {/* <TransparentContainer /> */}
          <LoaderContainer>
            <LottieContainer />
          </LoaderContainer>
        </RowSubAnimatedContainer>
      </Container>
      // </ModalContainer>
    );
  }
});

export default Loader;
