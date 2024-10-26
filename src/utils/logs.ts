import { LogKeys, LogLevel } from '@/src/enums/logs';

export const logger = (logsKey: LogKeys, message: string, level: LogLevel) => {
  console[level](`[${logsKey}] - ${message}`);
};

export const startDeviceScanLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.startDeviceScan, message, level);

export const stopDeviceScanLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.stopDeviceScan, message, level);

export const connectToDeviceLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.connectToDevice, message, level);

export const disconnectFromDeviceLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.disconnectFromDevice, message, level);

export const getDeviceServicesLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.getDeviceServices, message, level);

export const realtimePressureMeasurementLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.realtimePressureMeasurement, message, level);

export const processPressureMeasurementLogger = (
  message: string,
  level: LogLevel = LogLevel.Log
) => logger(LogKeys.processPressureMeasurementLogger, message, level);
