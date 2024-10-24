import { Platform } from 'react-native';
import { MessageTypes } from '../types/Bluetooth';

export const GLUCOSE_SERVICES = {
  genericAccess: '00001800-0000-1000-8000-00805f9b34fb',
  genericAttribute: '00001801-0000-1000-8000-00805f9b34fb',
  glucose: '00001808-0000-1000-8000-00805f9b34fb',
  battery: '0000180f-0000-1000-8000-00805f9b34fb',
  currentTime: '00001805-0000-1000-8000-00805f9b34fb',
  deviceInfo: '0000180a-0000-1000-8000-00805f9b34fb',
  xxxx: '0000fe60-0000-1000-8000-00805f9b34fb', // --> No info - Not in use
  yyyy: '0000f200-0000-1000-8000-00805f9b34fb', // --> No info - Not in use
  zzzz: '02f00000-0000-0000-0000-00000000fe00', // --> No info - Not in use
};

export const GLUCOSE_CHARACTERISTICS = {
  measurement: '00002a18-0000-1000-8000-00805f9b34fb',
  measurementContext: '00002a34-0000-1000-8000-00805f9b34fb',
  glucoseFeature: '00002a51-0000-1000-8000-00805f9b34fb',
  recordAccessControlPoint: '00002a52-0000-1000-8000-00805f9b34fb',
};

export const CONNECTION_OPTIONS = {
  autoConnect: false,
  requestMTU: 96,
  timeout: Platform.OS === 'android' ? undefined : 45000,
};

export const MESSAGES: Record<MessageTypes, string> = {
  power: 'El bluetooth está apagado.',
  permissions: 'No se aceptaron los permisos.',
};
