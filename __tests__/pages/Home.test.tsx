import React from 'react';
import { render } from '@testing-library/react-native';

import usePressureMeasurement from '@/src/hooks/pressure/usePressureMeasurement';
import Home from '@/src/pages/Home';

const scanAnimation = require('@/animations/scan-animation.json') as string;
const measureAnimation =
  require('@/animations/measure-animation.json') as string;

jest.mock('@/src/hooks/bluetooth/useBleConnections');
jest.mock('@/src/hooks/pressure/usePressureMeasurement');
jest.mock('@/src/components/Animation', () => 'Animation');
jest.mock('@/src/components/MeasurementResult', () => 'MeasurementResult');

describe('<Home />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays "Scanning devices..." when no device is connected', () => {
    (usePressureMeasurement as jest.Mock).mockReturnValue({
      device: null,
      measurement: null,
    });

    const { getByText, getByTestId } = render(<Home />);

    expect(getByText('Scanning devices...')).toBeTruthy();

    expect(getByTestId('Animation').props).toStrictEqual({
      testID: 'Animation',
      animation: scanAnimation,
    });
  });

  it('displays "Measuring..." and measure animation when a device is connected', () => {
    (usePressureMeasurement as jest.Mock).mockReturnValue({
      device: { id: '123' },
      measurement: { value: 120 },
    });

    const { getByText, getByTestId } = render(<Home />);

    expect(getByText('Measuring...')).toBeTruthy();

    expect(getByTestId('Animation').props).toStrictEqual({
      testID: 'Animation',
      animation: measureAnimation,
    });
  });
});
