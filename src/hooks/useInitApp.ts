import { useEffect } from 'react';
import { useLoadFonts } from './useLoadFonts';
import { useBle } from '../data/ble.store';
import { useRequestPermissions } from './bluetooth/useRequestPermissions';
import { BluetoothLogger } from '../utils/logs';

const useInitApp = () => {
  const { fontsLoaded } = useLoadFonts();
  const setBlePermissionsState = useBle(
    (state) => state.setBlePermissionsState
  );
  const requestPermission = useRequestPermissions();

  useEffect(() => {
    const checkPermissions = async () => {
      const grantedPermissions = await requestPermission();

      if (!grantedPermissions) {
        BluetoothLogger('permission not granted'); // Show a message or something to the user
      } else {
        setBlePermissionsState('granted');
      }

      return grantedPermissions;
    };

    checkPermissions();
  }, []);

  return { appReady: fontsLoaded };
};

export default useInitApp;
