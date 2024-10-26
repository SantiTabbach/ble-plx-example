import { usePressureDevice } from '@/src/data/pressure-device.store';
import { ScannerStatus } from '@/src/enums/ble';
import { useCallback, useEffect, useState } from 'react';
import type { BleError, Device, Subscription } from 'react-native-ble-plx';
import useConnectedDevice from './useConnectedDevice';
import { useBluetoothConnection } from '@/src/contexts/bluetooth-manager.context';
import {
  connectToDeviceLogger,
  disconnectFromDeviceLogger,
} from '@/src/utils/logs';
import { CONNECTION_OPTIONS } from '@/src/constants/bluetooth';
import { LogLevel } from '@/src/enums/logs';

interface Args {
  setScanner: React.Dispatch<React.SetStateAction<ScannerStatus>>;
}

const useDeviceConnection = ({ setScanner }: Args) => {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const removePressureDevice = usePressureDevice((state) => state.resetState);

  const { workWithConnectedDevice } = useConnectedDevice();
  const { manager } = useBluetoothConnection();

  const connectToDevice = useCallback(
    async (deviceId: string) => {
      try {
        connectToDeviceLogger('Starting connection');
        const newlyConnectedDevice = await manager.connectToDevice(
          deviceId,
          CONNECTION_OPTIONS
        );
        setScanner(ScannerStatus.CONNECTED);
        setConnectedDevice(newlyConnectedDevice);

        connectToDeviceLogger(
          `Device with id ${deviceId} successfully connected`
        );
        await workWithConnectedDevice(newlyConnectedDevice);
      } catch (error) {
        connectToDeviceLogger(
          'Error while trying device connection ' + error,
          LogLevel.Error
        );
      }
    },
    [manager]
  );

  // CONNECTED DEVICE LISTENER
  useEffect(() => {
    if (connectedDevice) {
      const disconnectSubscription: Subscription =
        connectedDevice.onDisconnected(
          (error: BleError | null, disconnectedDevice) => {
            if (error) {
              disconnectFromDeviceLogger(
                'Error on disconnect - ' + error.message,
                LogLevel.Error
              );
            }
            setConnectedDevice(null);
            setScanner(ScannerStatus.IDLE);
            removePressureDevice();

            disconnectFromDeviceLogger(
              `Device with id ${disconnectedDevice.id} has been disconnected`
            );
          }
        );

      return () => disconnectSubscription.remove();
    }
  }, [connectedDevice]);

  return { connectToDevice };
};

export default useDeviceConnection;
