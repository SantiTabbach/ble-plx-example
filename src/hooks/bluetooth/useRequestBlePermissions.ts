import * as ExpoDevice from 'expo-device';
import { PermissionsAndroid, Platform } from 'react-native';

export const useRequestBlePermissions = () => {
	const requestAndroid31Permissions = async () => {
		const fineLocationPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);

		const bluetoothScanPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
		);

		const bluetoothConnectPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
		);

		return (
			bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
			bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
			fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
		);
	};

	const requestPermissions = async () => {
		if (Platform.OS === 'android') {
			if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} else {
				return await requestAndroid31Permissions();
			}
		} else {
			return true;
		}
	};

	return requestPermissions;
};
