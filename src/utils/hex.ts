/* eslint-disable no-bitwise */

export const readFromBuffer = (
  buffer: Buffer,
  byte: number,
  type: 'readUint16LE' | 'readUInt8'
) => {
  return buffer[type](byte);
};

export const isFlagPresent = (flags: number, flag: number) =>
  (flags & flag) === flag;
