import type { Device } from 'react-native-ble-plx';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface PressureDeviceState {
  // Properties
  device?: Device;
  modalStatus?: 'opened' | 'closed';

  // Methods
  resetState: () => void;
  setModalStatus: (status: 'opened' | 'closed') => void;
  setDevice: (device: Device) => void;
}

const storeApi: StateCreator<
  PressureDeviceState,
  [['zustand/immer', never]]
> = (set) => ({
  // Properties
  device: undefined,
  modalStatus: 'closed',

  // Methods
  resetState: () => {
    set((state) => {
      state.device = undefined;
    });
  },
  setModalStatus: (status) => {
    set((state) => {
      state.modalStatus = status;
    });
  },
  setDevice: (device) => {
    set((state) => {
      state.device = device;
    });
  },
});

export const usePressureDevice = create<PressureDeviceState>()(immer(storeApi));
