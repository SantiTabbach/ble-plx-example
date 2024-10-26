import { useState } from 'react';
import { ScannerStatus } from '@/src/enums/ble';
import useDeviceScanner from './useDeviceScanner';

const useBleConnections = () => {
  const [scanner, setScanner] = useState<ScannerStatus>(ScannerStatus.IDLE);

  useDeviceScanner({
    scanner,
    setScanner,
  });

  return null;
};

export default useBleConnections;
