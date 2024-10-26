export enum LogKeys {
  // BleLogKeys
  bluetooth = 'Bluetooth',
  startDeviceScan = 'StartDeviceScan',
  stopDeviceScan = 'StopDeviceScan',
  connectToDevice = 'ConnectToDevice',
  disconnectFromDevice = 'DisconnectFromDevice',
  getDeviceServices = 'GetDeviceServices',

  // Blood pressure
  realtimePressureMeasurement = 'RealtimePressureMeasurement',
  processPressureMeasurementLogger = 'ProcessPressureMeasurementLogger',
}

export enum LogLevel {
  Error = 'error',
  Log = 'log',
  Info = 'info',
  Warn = 'warn',
}
