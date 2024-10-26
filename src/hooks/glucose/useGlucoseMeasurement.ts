import { useEffect } from 'react';
import { useGlucometerDevice } from '@/src/data/glucometer-device.store';
import { useRealtimeMeasurement } from './useRealtimeMeasurement';

const useGlucoseMeasurement = () => {
  const device = useGlucometerDevice((state) => state.device);
  const { listenMeasurement, isMeasuring, finishMeasure, measurement } =
    useRealtimeMeasurement();

  useEffect(() => {
    if (!device) {
      console.log('device disconnected'); // Show message to user
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

  return { measurement };
};

export default useGlucoseMeasurement;
