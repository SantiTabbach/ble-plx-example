import { getDateValue, parseDateTime } from '@/src/utils/dates';

const mockDate = new Date('2024-11-08T13:51:53.000Z');

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
});

afterAll(() => {
  jest.useRealTimers();
});

describe('The dates file', () => {
  it('Should get date value correctly', () => {
    const dateMock = 8;

    expect(getDateValue(dateMock)).toEqual('08');
  });

  it('parseDateTime should return now if date or time is not provided', () => {
    expect(parseDateTime('', 'fakeDate')).toEqual(mockDate);
    expect(parseDateTime('fakeDate', '')).toEqual(mockDate);
  });

  it('parseDateTime should return parsed date correctly', () => {
    expect(parseDateTime('12/11/1997', '10:11:12')).toEqual(
      new Date('1997-11-12T10:11:12.000Z')
    );
  });
});
