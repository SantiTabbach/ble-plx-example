import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('screen');

interface Props {
  animation: string;
}

const Animation = ({ animation }: Props) => {
  const animationRef = useRef(null);

  return (
    <LottieView
      autoPlay
      loop={true}
      ref={animationRef}
      style={{
        width: 300,
        height: 300,
      }}
      source={animation}
    />
  );
};

export default Animation;
