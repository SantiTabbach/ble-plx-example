import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useBleConnections from '@/src/hooks/bluetooth/useBleConnections';
import usePressureMeasurement from '@/src/hooks/pressure/usePressureMeasurement';
import Animation from '@/src/components/Animation';
import MeasurementResult from '@/src/components/MeasurementResult';

const scanAnimation = require('@/animations/scan-animation.json') as string;
const measureAnimation =
  require('@/animations/measure-animation.json') as string;

const Home = () => {
  const { measurement, device } = usePressureMeasurement();
  useBleConnections();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {device ? 'Measuring...' : 'Scanning devices...'}
      </Text>
      <Animation
        testID="Animation"
        animation={device ? measureAnimation : scanAnimation}
      />
      <MeasurementResult measurement={measurement} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 50,
  },
  title: {
    fontSize: 24,
    color: '#0387ec',
    fontFamily: 'GigaSans_500Medium',
  },
});
