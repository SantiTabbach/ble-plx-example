export const BYTES = {
  FLAGS: 0,
  SYSTOLIC: 1,
  DIASTOLIC: 3,
  MEAN_ARTERIAL: 5,
  YEAR: 7,
  MONTH: 9,
  DAY: 10,
  HOURS: 11,
  MINUTES: 12,
  SECONDS: 13,
  HEART_RATE: 14,
};

export const FLAGS = {
  UNIT: 0x01,
  TIMESTAMP: 0x02,
  HEART_RATE: 0x04,
};

export const UNIT = {
  MRECURY: 'mm/Hg',
  KILOPASCAL: 'kPa',
};

export const KPA_CONVERSION_FACTOR = 7.50062;
export const BYTE_OFFSET = 7;
