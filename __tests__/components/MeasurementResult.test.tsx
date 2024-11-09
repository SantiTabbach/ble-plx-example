import React from 'react';
import { render } from '@testing-library/react-native';
import MeasurementResult from '@/src/components/MeasurementResult';
import { pressureMeasurementMock } from '@/__mocks__/pressure.mock';

describe('<MeasurementResult />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays measurement result correctly', () => {
    const { getByText } = render(
      <MeasurementResult measurement={pressureMeasurementMock} />
    );

    expect(getByText('Last measurement result:')).toBeTruthy();

    expect(getByText('Diastolic')).toBeTruthy();
    expect(getByText(String(pressureMeasurementMock.diastolic))).toBeTruthy();

    expect(getByText('Systolic')).toBeTruthy();
    expect(getByText(String(pressureMeasurementMock.systolic))).toBeTruthy();

    expect(getByText('Heart rate')).toBeTruthy();
    expect(getByText(String(pressureMeasurementMock.heartRate))).toBeTruthy();
  });

  it('displays measurement result without values correctly', () => {
    const { getByText } = render(<MeasurementResult measurement={null} />);

    expect(getByText('Last measurement result:')).toBeTruthy();

    expect(getByText('Diastolic')).toBeTruthy();
    expect(getByText(String(pressureMeasurementMock.diastolic))).toBeFalsy();

    expect(getByText('Systolic')).toBeTruthy();
    expect(getByText(String(pressureMeasurementMock.systolic))).toBeFalsy();

    expect(getByText('Heart rate')).toBeTruthy();
    expect(getByText(String(pressureMeasurementMock.heartRate))).toBeFalsy();
  });
});
