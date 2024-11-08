import { HexMock } from '@/__mocks__/pressure.mock';
import { processHexPressureMeasurement } from '@/src/utils/pressure';
import { DeviceMock } from '@/__mocks__/device.mock';

describe('The Pressure related functions', () => {
  it('Should process Hex Pressure Measurement value correctly', () => {
    expect(processHexPressureMeasurement(HexMock, DeviceMock)).toEqual({
      systolic: 139,
      diastolic: 71,
      meanArterial: 93,
      heartRate: 66,
      deviceDate: '2024-11-08T12:34:10.000Z',
      deviceId: '44:28:A3:65:EE:5C',
      rawHex: '1e8b0047005d00e8070b0809220a4200000000',
      unit: 'mm/Hg',
    });
  });
});
