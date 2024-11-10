import { Platform } from 'react-native';
import { MessageTypes } from '../types/Bluetooth';

export const PRESSURE_CHARACTERISTICS = {
  bps: '00001810-0000-1000-8000-00805f9b34fb',
  bpm: '00002a35-0000-1000-8000-00805f9b34fb',
  icp: '00002a36-0000-1000-8000-00805f9b34fb',
};

export const CONNECTION_OPTIONS = {
  autoConnect: false,
  requestMTU: 96,
};

export const MESSAGES: Record<MessageTypes, string> = {
  power: 'El bluetooth está apagado.',
  permissions: 'No se aceptaron los permisos.',
};
