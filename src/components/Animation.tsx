import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';

interface Props {
  animation: string;
  testID?: string;
}

const Animation = ({ animation, testID = 'Animation' }: Props) => {
  const animationRef = useRef(null);

  return (
    <LottieView
      testID={testID}
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
