import { createContext, useContext, useMemo } from 'react';
import { BleManager, LogLevel } from 'react-native-ble-plx';

type BluetoothConnectionContextProps = {
	manager: BleManager;
};

const BluetoothConnectionContext =
	createContext<BluetoothConnectionContextProps | null>(null);

export const BluetoothConnectionProvider: React.FC<{
	children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
	const manager = useMemo(() => new BleManager(), []);
	manager.setLogLevel(LogLevel.Verbose);

	return (
		<BluetoothConnectionContext.Provider value={{ manager }}>
			{children}
		</BluetoothConnectionContext.Provider>
	);
};

export const useBluetoothConnection = () => {
	const context = useContext(BluetoothConnectionContext);

	if (!context) {
		throw new Error(
			'useBluetoothConnection must be used with BluetoothConnectionProvider'
		);
	}

	return context;
};
