import { isFlagPresent } from '@/src/utils/hex';

describe('The hex file', () => {
  it('should check if flag is present in flags correctly', () => {
    const flagsMock = 0x01;

    expect(isFlagPresent(flagsMock, 0x01)).toBeTruthy();
    expect(isFlagPresent(flagsMock, 0x02)).toBeFalsy();
  });
});
