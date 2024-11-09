import {
  HexMock,
  HexMockNoH,
  HexMockNoT,
  HexMockNoU,
} from '@/__mocks__/pressure.mock';
import { processHexPressureMeasurement } from '@/src/utils/pressure';
import { DeviceMock } from '@/__mocks__/device.mock';

const mockDate = new Date('2024-11-08T13:51:53.000Z');

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
});

afterAll(() => {
  jest.useRealTimers();
});

describe('The Pressure related functions', () => {
  it('Should process Hex Pressure Measurement value in kPa correctly', () => {
    expect(processHexPressureMeasurement(HexMock, DeviceMock)).toEqual({
      systolic: 1042.58618,
      diastolic: 532.5440199999999,
      meanArterial: 697.5576599999999,
      heartRate: 66,
      deviceDate: '2024-11-08T09:34:10.000Z',
      deviceId: '44:28:A3:65:EE:5C',
      rawHex: '078b0047005d00e8070b0809220a4200000000',
      unit: 'kPa',
    });
  });

  it('Should process Hex Pressure Measurement value in mm/Hg correctly', () => {
    expect(processHexPressureMeasurement(HexMockNoU, DeviceMock)).toEqual({
      systolic: 139,
      diastolic: 71,
      meanArterial: 93,
      heartRate: 66,
      deviceDate: '2024-11-08T09:34:10.000Z',
      deviceId: '44:28:A3:65:EE:5C',
      rawHex: '068b0047005d00e8070b0809220a4200000000',
      unit: 'mm/Hg',
    });
  });

  it('Should process Hex Pressure Measurement value without heart rate correctly', () => {
    expect(processHexPressureMeasurement(HexMockNoH, DeviceMock)).toEqual({
      systolic: 1042.58618,
      diastolic: 532.5440199999999,
      meanArterial: 697.5576599999999,
      heartRate: -1,
      deviceDate: '2024-11-08T09:34:10.000Z',
      deviceId: '44:28:A3:65:EE:5C',
      rawHex: '038b0047005d00e8070b0809220a4200000000',
      unit: 'kPa',
    });
  });

  it('Should process Hex Pressure Measurement value without timestamp flag correctly', () => {
    expect(processHexPressureMeasurement(HexMockNoT, DeviceMock)).toEqual({
      systolic: 1042.58618,
      diastolic: 532.5440199999999,
      meanArterial: 697.5576599999999,
      heartRate: 506,
      deviceDate: '2024-11-08T10:51:53.000Z',
      deviceId: '44:28:A3:65:EE:5C',
      rawHex: '058b0047005d00e8070b0809220a4200000000',
      unit: 'kPa',
    });
  });
});
