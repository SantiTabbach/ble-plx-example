import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BluetoothConnectionProvider } from './src/contexts/bluetooth-manager.context';
import Home from './src/pages/Home';
import useInitApp from './src/hooks/useInitApp';

global.Buffer = require('buffer').Buffer;

export default function App() {
  const { appReady } = useInitApp();

  return (
    <BluetoothConnectionProvider>
      <View style={styles.container}>
        {appReady && <Home />}
        <StatusBar test-ID="StatusBar" style="auto" />
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
