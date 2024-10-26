import { useCallback } from 'react';
import type { Device } from 'react-native-ble-plx';
import { GLUCOSE_SERVICES } from '@/src/constants/bluetooth';
import { useGlucometerDevice } from '@/src/data/glucometer-device.store';
import { connectToDeviceLogger } from '@/src/utils/logs';

const useConnectedDevice = () => {
  const setGlucometerDevice = useGlucometerDevice((state) => state.setDevice);

  const workWithConnectedDevice = useCallback(
    async (connectedDevice: Device) => {
      await connectedDevice.discoverAllServicesAndCharacteristics();
      const services = await connectedDevice.services();

      services.forEach((service) => {
        if (service.uuid === GLUCOSE_SERVICES.glucose) {
          setGlucometerDevice(connectedDevice);
          connectToDeviceLogger('Glucometer device connected successfully');
        }
        // else if (service.uuid === FOO_SERVICES.foo){
        //   setFooDevice(connectedDevice);
        //   connectToDeviceLogger('Foo device connected successfully');
        // }
      });
    },
    [setGlucometerDevice]
  );

  return { workWithConnectedDevice };
};

export default useConnectedDevice;
