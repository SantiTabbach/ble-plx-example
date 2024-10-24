import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useBleConnections from '@/src/hooks/bluetooth/useBleConnections';
import { useGlucometerDevice } from '@/src/data/glucometer-device.store';

const Home = () => {
  const device = useGlucometerDevice((state) => state.device);
  useBleConnections();

  return (
    <View>
      {device ? (
        <Text>{device.id} connected</Text>
      ) : (
        <Text>Searching devices...</Text>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
