import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BluetoothConnectionProvider } from './src/contexts/bluetooth-manager.context';
import { useEffect } from 'react';
import { useRequestBlePermissions } from './src/hooks/bluetooth/useRequestBlePermissions';
import { useBle } from './src/data/ble.store';
import Home from './src/pages/Home';
import { useLoadFonts } from './src/hooks/useLoadFonts';

global.Buffer = require('buffer').Buffer;

export default function App() {
  useLoadFonts();
  const setBlePermissionsState = useBle(
    (state) => state.setBlePermissionsState
  );
  const requestPermission = useRequestBlePermissions();

  useEffect(() => {
    const checkPermissions = async () => {
      const grantedPermissions = await requestPermission();

      if (!grantedPermissions) {
        console.log('Bt permission not granted'); // Show a message or something to the user
      } else {
        setBlePermissionsState('granted');
      }

      return grantedPermissions;
    };

    checkPermissions();
  }, []);

  return (
    <BluetoothConnectionProvider>
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </BluetoothConnectionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
