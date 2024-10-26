import { useCallback } from 'react';
import type { Device } from 'react-native-ble-plx';
import { PRESSURE_CHARACTERISTICS } from '@/src/constants/bluetooth';
import { usePressureDevice } from '@/src/data/pressure-device.store';
import { connectToDeviceLogger } from '@/src/utils/logs';

const useConnectedDevice = () => {
  const setPressureDevice = usePressureDevice((state) => state.setDevice);

  const workWithConnectedDevice = useCallback(
    async (connectedDevice: Device) => {
      await connectedDevice.discoverAllServicesAndCharacteristics();
      const services = await connectedDevice.services();

      services.forEach((service) => {
        if (service.uuid === PRESSURE_CHARACTERISTICS.bps) {
          setPressureDevice(connectedDevice);
          connectToDeviceLogger('Blood pressure device connected successfully');
        }
        // else if (service.uuid === FOO_SERVICES.foo){
        //   setFooDevice(connectedDevice);
        //   connectToDeviceLogger('Foo device connected successfully');
        // }
      });
    },
    [setPressureDevice]
  );

  return { workWithConnectedDevice };
};

export default useConnectedDevice;
