import {
  BluetoothLogger,
  connectToDeviceLogger,
  disconnectFromDeviceLogger,
  processPressureMeasurementLogger,
  realtimePressureMeasurementLogger,
  startDeviceScanLogger,
  stopDeviceScanLogger,
} from '@/src/utils/logs';

describe('The logs file', () => {
  const messageMock = 'Fake message';
  it('BluetoothLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    BluetoothLogger(messageMock);

    expect(loggerSpy.mock.calls[0][0]).toContain('[Bluetooth] - Fake message');
  });

  it('startDeviceScanLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    startDeviceScanLogger(messageMock);

    expect(loggerSpy.mock.calls[1][0]).toContain(
      '[StartDeviceScan] - Fake message'
    );
  });

  it('stopDeviceScanLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    stopDeviceScanLogger(messageMock);

    expect(loggerSpy.mock.calls[2][0]).toContain(
      '[StopDeviceScan] - Fake message'
    );
  });

  it('connectToDeviceLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    connectToDeviceLogger(messageMock);

    expect(loggerSpy.mock.calls[3][0]).toContain(
      '[ConnectToDevice] - Fake message'
    );
  });

  it('disconnectFromDeviceLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    disconnectFromDeviceLogger(messageMock);

    expect(loggerSpy.mock.calls[4][0]).toContain(
      '[DisconnectFromDevice] - Fake message'
    );
  });

  it('realtimePressureMeasurementLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    realtimePressureMeasurementLogger(messageMock);

    expect(loggerSpy.mock.calls[5][0]).toContain(
      '[RealtimePressureMeasurement] - Fake message'
    );
  });

  it('processPressureMeasurementLogger should log message successfully', () => {
    const loggerSpy = jest.spyOn(console, 'log');

    processPressureMeasurementLogger(messageMock);

    expect(loggerSpy.mock.calls[6][0]).toContain(
      '[ProcessPressureMeasurementLogger] - Fake message'
    );
  });
});
