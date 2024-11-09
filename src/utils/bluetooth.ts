import type { Characteristic, Device, Service } from 'react-native-ble-plx';
import { EMPTY_STRING } from '@/src/constants/common';
import { externalDeviceBrand } from '@/src/constants/device';

export const isYuwellDevice = (device: Device): boolean => {
  const name = (device.name ?? device.localName ?? EMPTY_STRING).toLowerCase();
  return name.includes(externalDeviceBrand.toLowerCase());
};

export const findActionById = (
  payload: Service[] | Characteristic[],
  id: string
) => {
  const result = payload.find((service) => service.uuid === id);

  return result;
};
