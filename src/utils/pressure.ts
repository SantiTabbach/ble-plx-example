import type { Device } from 'react-native-ble-plx';
import { isFlagPresent, readFromBuffer } from './hex';
import { BloodPressureMeasurement } from '../models/BloodPressure';
import { getDateValue, parseDateTime } from './dates';
import {
  BYTE_OFFSET,
  BYTES,
  FLAGS,
  KPA_CONVERSION_FACTOR,
  UNIT,
} from '../constants/pressure';

export const calculateLocalIdFromPressureRawHex = (
  deviceDate: string,
  deviceId: string,
  heartRate: number
): string => {
  return `${deviceId} - ${heartRate} - ${deviceDate}`;
};

const convertValue = (value: number, flags: number) => {
  return isFlagPresent(flags, FLAGS.UNIT)
    ? value * KPA_CONVERSION_FACTOR
    : value;
};

export const getBloodPressureMeasurement = (
  buffer: Buffer,
  flags: number
): {
  systolic: number;
  diastolic: number;
  meanArterial: number;
  heartRate: number;
} => {
  const readFromBuffer16 = (byte: number) =>
    readFromBuffer(buffer, byte, 'readUint16LE');

  const systolic = readFromBuffer16(BYTES.SYSTOLIC);
  const diastolic = readFromBuffer16(BYTES.DIASTOLIC);
  const meanArterial = readFromBuffer16(BYTES.MEAN_ARTERIAL);

  let heartRate: number | null = null;

  if (isFlagPresent(flags, FLAGS.HEART_RATE)) {
    let offset = BYTE_OFFSET;
    if (isFlagPresent(flags, FLAGS.TIMESTAMP)) {
      offset -= BYTE_OFFSET;
    }
    heartRate = readFromBuffer16(BYTES.HEART_RATE - offset);
  }

  if (heartRate) {
    if (heartRate > 220) {
      console.log('Heart Rate value is too high, adjusting...');
      heartRate = Math.round(heartRate / 4);
    }
  }

  return {
    systolic: convertValue(systolic, flags),
    diastolic: convertValue(diastolic, flags),
    meanArterial: convertValue(meanArterial, flags),
    heartRate: heartRate ?? -1,
  };
};

const getMeasurementDate = (buffer: Buffer, flags: number) => {
  const readFromBuffer8 = (byte: number) =>
    readFromBuffer(buffer, byte, 'readUInt8');
  const readFromBuffer16 = (byte: number) =>
    readFromBuffer(buffer, byte, 'readUint16LE');

  if (!isFlagPresent(flags, FLAGS.TIMESTAMP)) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const formattedDate = `${getDateValue(day)}/${getDateValue(month)}/${year}`;
    const formattedTime = `${getDateValue(hours)}:${getDateValue(
      minutes
    )}:${getDateValue(seconds)}`;

    return parseDateTime(formattedDate, formattedTime);
  }

  const year = readFromBuffer16(BYTES.YEAR);
  const month = readFromBuffer8(BYTES.MONTH);
  const day = readFromBuffer8(BYTES.DAY);
  const hours = readFromBuffer8(BYTES.HOURS);
  const minutes = readFromBuffer8(BYTES.MINUTES);
  const seconds = readFromBuffer8(BYTES.SECONDS);

  const formattedDate = `${getDateValue(day)}/${getDateValue(month)}/${year}`;
  const formattedTime = `${hours}:${getDateValue(minutes)}:${getDateValue(
    seconds
  )}`;

  return parseDateTime(formattedDate, formattedTime);
};

export const processHexPressureMeasurement = (
  hexValue: string,
  device: Device
): BloodPressureMeasurement => {
  const buffer = Buffer.from(hexValue, 'base64');

  const flags = readFromBuffer(buffer, BYTES.FLAGS, 'readUInt8');
  const hexString = buffer.toString('hex');

  const pressureValues = getBloodPressureMeasurement(buffer, flags);
  const measurementDate = getMeasurementDate(buffer, flags);

  return {
    ...pressureValues,
    deviceDate: measurementDate.toISOString(),
    deviceId: device.id,
    rawHex: hexString,
    unit: isFlagPresent(flags, FLAGS.UNIT) ? UNIT.KILOPASCAL : UNIT.MRECURY,
  };
};
