import { ScannerStatus } from '@/src/enums/ble';
import { useState } from 'react';
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
