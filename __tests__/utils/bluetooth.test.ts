import { DeviceMock } from '@/__mocks__/device.mock';
import { findActionById, isYuwellDevice } from '@/src/utils/bluetooth';
import { Device, Service } from 'react-native-ble-plx';

describe('The bluetooth file', () => {
  it('Should check if device brand is Yuwell correctly', () => {
    const deviceMockWithoutName = {
      ...DeviceMock,
      name: null,
      localName: 'Fake device brand',
    } as Device;

    const deviceMockWithoutLocalName = {
      ...DeviceMock,
      name: null,
      localName: null,
    } as Device;

    const deviceMockWithFakeName = {
      ...DeviceMock,
      name: 'Fake device brand',
    } as Device;

    expect(isYuwellDevice(DeviceMock)).toBeTruthy();
    expect(isYuwellDevice(deviceMockWithFakeName)).toBeFalsy();
    expect(isYuwellDevice(deviceMockWithoutName)).toBeFalsy();
    expect(isYuwellDevice(deviceMockWithoutLocalName)).toBeFalsy();
  });

  it('Should find action by ID correctly', () => {
    const payloadMock = [{ uuid: '123' }] as Service[];

    expect(findActionById(payloadMock, '123')).toBeTruthy();
    expect(findActionById(payloadMock, '321')).toBeFalsy();
  });
});
