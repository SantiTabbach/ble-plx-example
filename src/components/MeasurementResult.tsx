import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BloodPressureMeasurement } from '../models/BloodPressure';
import { EMPTY_DATA } from '../constants/common';

interface Props {
  measurement: BloodPressureMeasurement | null;
}

interface DataComponentProps {
  value?: number;
  label: string;
}

const DataComponent = ({ value, label }: DataComponentProps) => {
  const color = value ? '#4da75c' : '#A3A3A3';

  return (
    <View style={styles.dataRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value ?? EMPTY_DATA}</Text>
    </View>
  );
};

const MeasurementResult = ({ measurement }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last measurement result:</Text>
      <DataComponent value={measurement?.diastolic} label="Diastolic" />
      <DataComponent value={measurement?.systolic} label="Sistolic" />
      <DataComponent value={measurement?.heartRate} label="Heart rate" />
    </View>
  );
};

export default MeasurementResult;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    backgroundColor: '#c2c2c23c',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '80%',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#7d7d7d',
    fontFamily: 'GigaSans_400Regular',
  },
  label: {
    fontSize: 16,
    fontFamily: 'GigaSans_600SemiBold',
  },
  value: {
    fontSize: 16,
    fontFamily: 'GigaSans_500Medium',
  },
});
