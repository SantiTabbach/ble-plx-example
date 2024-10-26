import { useEffect } from 'react';
import { usePressureDevice } from '@/src/data/pressure-device.store';
import useRealtimePressureMeasurement from './useRealtimePressureMeasurement';

const usePressureMeasurement = () => {
  const device = usePressureDevice((state) => state.device);

  const { listenMeasurement, isMeasuring, finishMeasure, measurement } =
    useRealtimePressureMeasurement();

  useEffect(() => {
    if (!device) {
      // Show message to user

      return;
    }
    const startListening = async () => {
      await listenMeasurement(device);
    };

    !isMeasuring && startListening();

    return () => {
      finishMeasure();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, listenMeasurement, isMeasuring]);

  return { measurement, device };
};

export default usePressureMeasurement;
