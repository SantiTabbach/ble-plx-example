export interface BloodPressureMeasurement {
  deviceDate: string;
  rawHex: string;
  deviceId: string;
  unit: string;
  systolic: number;
  diastolic: number;
  meanArterial?: number;
  heartRate: number;
}
