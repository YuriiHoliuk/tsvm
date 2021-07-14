import { testCPU } from '../testUtils';

describe('MoveMemToReg instruction', () => {
  testCPU('should move data from memory to the register 1', {
    program: [
      // MoveMemToReg
      0x01,
      // literal
      0xff, 0xff,
      // r1
      0x03,
      // Halt
      0xff,
    ],
    registers: {
      r1: 0xffff,
    },
  });

  testCPU('should move data from memory to the register 2', {
    program: [
      // MoveMemToReg
      0x01,
      // literal
      0x00, 0x13,
      // r2
      0x04,
      // Halt
      0xff,
    ],
    registers: {
      r2: 0x0013,
    },
  });

  testCPU('should move data from memory to the register 3', {
    program: [
      // MoveMemToReg
      0x01,
      // literal
      0xab, 0xcd,
      // r3
      0x05,
      // Halt
      0xff,
    ],
    registers: {
      r3: 0xabcd,
    },
  });

  testCPU('should move data from memory to the register 4', {
    program: [
      // MoveMemToReg
      0x01,
      // literal
      0x10, 0x00,
      // r4
      0x06,
      // Halt
      0xff,
    ],
    registers: {
      r4: 0x1000,
    },
  });

  testCPU('should move data from memory to the register ip', {
    program: [
      // MoveMemToReg
      0x01,
      // literal
      0x00, 0x06,
      // ip
      0x01,
      // empty
      0x00, 0x00,
      // Halt
      0xff,
    ],
    registers: {
      ip: 0x0007,
    },
  });

  testCPU('should move data from memory to the register acc', {
    program: [
      // MoveMemToReg
      0x01,
      // literal
      0x11, 0x11,
      // r4
      0x02,
      // Halt
      0xff,
    ],
    registers: {
      acc: 0x1111,
    },
  });
});
