import {
  GLUCOSE_CHARACTERISTICS,
  GLUCOSE_SERVICES,
} from '@/src/constants/bluetooth';
import { LogLevel } from '@/src/enums/logs';
import { GlucoseMeasurement } from '@/src/models/Glucose';
import { findActionById } from '@/src/utils/bluetooth';
import { processHexGlucoseMeasurement } from '@/src/utils/glucose';
import { realtimeMeasurementLogger } from '@/src/utils/logs';
import { useCallback, useState } from 'react';
import type {
  Characteristic,
  Device,
  Service,
  Subscription,
} from 'react-native-ble-plx';

export const useRealtimeMeasurement = () => {
  const [measurement, setMeasurement] = useState<GlucoseMeasurement | null>(
    null
  );
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const finishMeasure = useCallback(() => {
    if (subscription) {
      setSubscription(null);
      subscription.remove();
      realtimeMeasurementLogger('Measurement subscription removed.');
    }
  }, [subscription]);

  const listenMeasurement = useCallback(async (device: Device) => {
    try {
      realtimeMeasurementLogger('Starting realtime measurement...');
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      const glucoseService = findActionById(
        services,
        GLUCOSE_SERVICES.glucose
      ) as Service;

      // GET CHARACTERISTICS
      realtimeMeasurementLogger('Getting all characteristics');
      const characteristics = await glucoseService.characteristics();
      const glucoseMeasurementCharacteristic = findActionById(
        characteristics,
        GLUCOSE_CHARACTERISTICS.measurement
      ) as Characteristic;

      if (!glucoseMeasurementCharacteristic) {
        realtimeMeasurementLogger('Measurement characteristic not found.');
        setSubscription(null);

        return;
      }

      realtimeMeasurementLogger(
        'Measurement characteristic found. Listening measurements...'
      );

      // START LISTENING
      setSubscription(
        glucoseMeasurementCharacteristic.monitor(
          async (error, characteristic) => {
            if (error) {
              realtimeMeasurementLogger(
                'While reading characteristic: ' + error.message
              );

              return;
            }

            if (characteristic?.value) {
              const glucose = processHexGlucoseMeasurement(
                characteristic.value,
                device
              );

              realtimeMeasurementLogger('Measurement found: ' + glucose.value);
              setMeasurement(glucose);
            } else {
              realtimeMeasurementLogger(
                'Found empty characteristic. Skipping...'
              );
            }
          }
        )
      );
    } catch (error) {
      realtimeMeasurementLogger(
        'While monitoring glucose measurement: ' + error,
        LogLevel.Error
      );

      setSubscription(null);
    }
  }, []);

  return {
    listenMeasurement,
    finishMeasure,
    isMeasuring: !!subscription,
    measurement,
  };
};
