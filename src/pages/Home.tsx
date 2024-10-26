import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useBleConnections from '@/src/hooks/bluetooth/useBleConnections';
import useGlucoseMeasurement from '../hooks/glucose/useGlucoseMeasurement';

const Home = () => {
  const { measurement } = useGlucoseMeasurement();
  useBleConnections();

  return (
    <View>
      <Text>{JSON.stringify(measurement)}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
