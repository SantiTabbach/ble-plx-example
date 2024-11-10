import { act, renderHook } from '@testing-library/react-hooks';
import useInitApp from '@/src/hooks/useInitApp';
import { useLoadFonts } from '@/src/hooks/useLoadFonts';
import { useRequestPermissions } from '@/src/hooks/bluetooth/useRequestPermissions';

jest.mock('@/src/hooks/useLoadFonts');
jest.mock('@/src/hooks/bluetooth/useRequestPermissions');
jest.mock('@/src/utils/logs');

const mockSetBlePermissionsState = jest.fn();

jest.mock('@/src/data/ble.store', () => ({
  useBle: (passedFunction: any) => {
    const data = {
      bleState: 'PoweredOn',
      blePermissionsState: null,
      resetState: jest.fn(),
      setBleState: jest.fn(),
      setBlePermissionsState: mockSetBlePermissionsState,
    };

    return passedFunction(data);
  },
}));

describe('useInitApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return appReady as true when fonts are loaded', async () => {
    useLoadFonts.mockReturnValue({ fontsLoaded: true });
    useRequestPermissions.mockReturnValue(() => Promise.resolve(true));

    const { result } = renderHook(() => useInitApp());

    await act(async () => {
      result.current.appReady;
    });

    expect(result.current.appReady).toBe(true);
    expect(mockSetBlePermissionsState).toHaveBeenCalledWith('granted');
  });

  it('should los permissions not granted', async () => {
    useLoadFonts.mockReturnValue({ fontsLoaded: true });
    useRequestPermissions.mockReturnValue(() => Promise.resolve(false));

    const { result } = renderHook(() => useInitApp());

    await act(async () => {
      result.current.appReady;
    });

    expect(result.current.appReady).toBe(true);
    expect(mockSetBlePermissionsState).not.toHaveBeenCalled();
  });
});
