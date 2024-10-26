import { useCallback, useEffect } from 'react';
import type { BleError } from 'react-native-ble-plx';
import { ScanCallbackType, State } from 'react-native-ble-plx';
import { LogLevel } from '@/src/enums/logs';
import { startDeviceScanLogger, stopDeviceScanLogger } from '@/src/utils/logs';
import { useBle } from '@/src/data/ble.store';
import { useBluetoothConnection } from '@/src/contexts/bluetooth-manager.context';
import { ScannerStatus } from '@/src/enums/ble';
import useDeviceConnection from './useDeviceConnection';
import { PRESSURE_CHARACTERISTICS } from '@/src/constants/bluetooth';
import { isYuwellDevice } from '@/src/utils/bluetooth';
import { isEmpty } from '@/src/utils/array';

interface Args {
  scanner: ScannerStatus;
  setScanner: React.Dispatch<React.SetStateAction<ScannerStatus>>;
}

const devicesToScan = [
  PRESSURE_CHARACTERISTICS.bps,
  //FOO_SERVICES.foo
];

const useDeviceScanner = ({ scanner, setScanner }: Args) => {
  const blePermissionsState = useBle((state) => state.blePermissionsState);
  const { manager } = useBluetoothConnection();
  const setBleState = useBle((state) => state.setBleState);

  const { connectToDevice } = useDeviceConnection({
    setScanner,
  });

  const stopDeviceScan = useCallback(async () => {
    stopDeviceScanLogger('Stop scan flow');
    await manager.stopDeviceScan();
  }, [manager]);

  const startDeviceScan = useCallback(async () => {
    startDeviceScanLogger('Start scan flow');
    setScanner(ScannerStatus.SCANNING);

    await manager.startDeviceScan(
      devicesToScan,
      { allowDuplicates: false, callbackType: ScanCallbackType.AllMatches },
      async (error: null | BleError, device) => {
        console.log({ error, device: device?.id });
        if (error) {
          startDeviceScanLogger(
            'Error on scan - ' + error.message,
            LogLevel.Error
          );
          await stopDeviceScan();
          setScanner(ScannerStatus.IDLE);
          return;
        }

        if (device && isYuwellDevice(device)) {
          startDeviceScanLogger('Device found - ' + device.id);
          await stopDeviceScan();
          await connectToDevice(device.id);
        }
      }
    );
  }, [manager]);

  // START-STOP SCAN
  useEffect(() => {
    const subscription = manager.onStateChange(async (newState: State) => {
      setBleState(newState);

      if (
        blePermissionsState === 'granted' &&
        newState === State.PoweredOn &&
        scanner === ScannerStatus.IDLE
      ) {
        // Workaround for -> BleError: Operation was cancelled
        const connectedDevices = await manager.connectedDevices(devicesToScan);

        if (isEmpty(connectedDevices)) {
          await startDeviceScan();
          subscription.remove();
        }
      }
    }, true);

    return () => subscription.remove();
  }, [manager, scanner, blePermissionsState]);

  return null;
};

export default useDeviceScanner;
