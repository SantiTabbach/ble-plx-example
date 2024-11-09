import { isEmpty } from '@/src/utils/array';

describe('The array file', () => {
  it('Should check if array is empty correctly', () => {
    const filledArrayMock = ['a', 'b', 'c'];
    const emptyArrayMock: any[] = [];

    expect(isEmpty(emptyArrayMock)).toBeTruthy();
    expect(isEmpty(filledArrayMock)).toBeFalsy();
  });
});
