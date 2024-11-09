import { isEmpty } from '@/src/utils/array';

describe('The array file', () => {
  it('Should check if array is empty correctly', () => {
    const filledArrayMock = ['a', 'b', 'c'];
    const emptyArrayMock: any[] = [];

    expect(isEmpty(filledArrayMock)).toBeTruthy();
    expect(isEmpty(emptyArrayMock)).toBeFalsy();
  });
});
