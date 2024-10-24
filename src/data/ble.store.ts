import { State } from 'react-native-ble-plx';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface BleState {
	// Properties
	bleState: State;
	blePermissionsState: 'granted' | null;
	// Methods
	resetState: () => void;
	setBleState: (state: State) => void;
	setBlePermissionsState: (state: 'granted' | null) => void;
}

const storeApi: StateCreator<BleState, [['zustand/immer', never]]> = (set) => ({
	// Properties
	bleState: State.PoweredOff,
	blePermissionsState: null,

	// Methods
	setBleState: (bleState) => {
		set((state) => {
			state.bleState = bleState;
		});
	},
	setBlePermissionsState: (blePermissionsState) => {
		set((state) => {
			state.blePermissionsState = blePermissionsState;
		});
	},
	resetState: () => {
		set((state) => {
			state.bleState = State.PoweredOff;
			state.blePermissionsState = null;
		});
	},
});

export const useBle = create<BleState>()(immer(storeApi));
