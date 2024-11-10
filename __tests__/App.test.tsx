import App from '@/App';
import { BluetoothConnectionProvider } from '@/src/contexts/bluetooth-manager.context';
import { useBle } from '@/src/data/ble.store';
import { useRequestPermissions } from '@/src/hooks/bluetooth/useRequestPermissions';
import { useLoadFonts } from '@/src/hooks/useLoadFonts';
import { BluetoothLogger } from '@/src/utils/logs';

import { render, waitFor } from '@testing-library/react-native';

jest.mock('@/src/hooks/bluetooth/useRequestPermissions');
jest.mock('@/src/hooks/useLoadFonts');
jest.mock('@/src/utils/logs');
jest.mock('react-native-ble-plx', () => {
  return {
    LogLevel: { Verbose: 'Verbose' },
    State: {
      PoweredOff: 'PoweredOff',
    },
    BleManager: jest.fn().mockImplementation(() => ({
      setLogLevel: jest.fn(),
      onStateChange: jest.fn(),
    })),
  };
});
jest.mock('@/src/data/ble.store', () => ({
  useBle: (passedFunction: any) => {
    const data = {
      bleState: 'PoweredOn',
      blePermissionsState: null,
      resetState: jest.fn(),
      setBleState: jest.fn(),
      setBlePermissionsState: jest.fn(),
    };

    return passedFunction(data);
  },
}));

describe('<App />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Home and StatusBar components within BluetoothConnectionProvider', async () => {
    jest.mocked(useLoadFonts).mockReturnValue({ fontsLoaded: true });
    jest
      .mocked(useRequestPermissions)
      .mockReturnValue(() => Promise.resolve(true));

    const { getByText } = render(<App />);

    expect(getByText('Scanning devices...')).toBeTruthy();
  });
});
