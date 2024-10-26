import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useBleConnections from '@/src/hooks/bluetooth/useBleConnections';
import usePressureMeasurement from '../hooks/pressure/usePressureMeasurement';

const Home = () => {
  const { measurement } = usePressureMeasurement();
  useBleConnections();

  return (
    <View>
      <Text>{JSON.stringify(measurement)}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
