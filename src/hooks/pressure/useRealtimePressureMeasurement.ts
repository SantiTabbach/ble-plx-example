import { PRESSURE_CHARACTERISTICS } from '@/src/constants/bluetooth';
import { LogLevel } from '@/src/enums/logs';
import { BloodPressureMeasurement } from '@/src/models/BloodPressure';
import { findActionById } from '@/src/utils/bluetooth';
import { realtimePressureMeasurementLogger } from '@/src/utils/logs';
import { processHexPressureMeasurement } from '@/src/utils/pressure';
import { useCallback, useState } from 'react';
import type {
  Characteristic,
  Device,
  Service,
  Subscription,
} from 'react-native-ble-plx';

const useRealtimePressureMeasurement = () => {
  const [measurement, setMeasurement] =
    useState<BloodPressureMeasurement | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const finishMeasure = useCallback(() => {
    if (subscription) {
      setSubscription(null);
      subscription.remove();

      realtimePressureMeasurementLogger('Measurement subscription removed.');
    }
  }, [subscription]);

  const listenMeasurement = useCallback(async (device: Device) => {
    try {
      realtimePressureMeasurementLogger('Starting realtime measurement...');

      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      const bpsService = findActionById(
        services,
        PRESSURE_CHARACTERISTICS.bps
      ) as Service;

      // GET CHARACTERISTICS
      realtimePressureMeasurementLogger('Getting all characteristics');
      const characteristics = await device.characteristicsForService(
        bpsService.uuid
      );

      const bloodPressureCharacteristic = findActionById(
        characteristics,
        PRESSURE_CHARACTERISTICS.bpm
      ) as Characteristic;

      if (!bloodPressureCharacteristic) {
        console.error(
          `Characteristic with UUID ${PRESSURE_CHARACTERISTICS.bpm} not found`
        );
        return;
      }

      realtimePressureMeasurementLogger(
        'Measurement characteristic found. Listening measurements...'
      );

      // START LISTENING

      if (
        bloodPressureCharacteristic.isNotifiable ||
        bloodPressureCharacteristic.isIndicatable
      ) {
        setSubscription(
          bloodPressureCharacteristic.monitor((error, characteristic) => {
            if (error) {
              console.error('Monitor error:', error);
              return;
            }

            if (characteristic?.value) {
              const bloodPressure = processHexPressureMeasurement(
                characteristic.value,
                device
              );

              setMeasurement(bloodPressure);

              realtimePressureMeasurementLogger(
                'Measurement found: ' + bloodPressure.rawHex
              );

              if (bloodPressureCharacteristic.isIndicatable) {
                device.writeCharacteristicWithoutResponseForService(
                  bpsService.uuid,
                  bloodPressureCharacteristic.uuid,
                  Buffer.from([0x01]).toString('base64')
                );
              }
            }
          })
        );
      } else {
        console.error(
          `Characteristic with UUID ${PRESSURE_CHARACTERISTICS.bpm} is not notifiable or indicatable`
        );
      }
    } catch (error) {
      setSubscription(null);

      realtimePressureMeasurementLogger(
        'While monitoring pressure measurement: ' + error,
        LogLevel.Error
      );
    }
  }, []);

  return {
    listenMeasurement,
    isMeasuring: !!subscription,
    finishMeasure,
    measurement,
  };
};

export default useRealtimePressureMeasurement;
