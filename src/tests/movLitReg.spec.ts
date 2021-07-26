import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('MoveLitReg instruction', () => {
  testCPU('should move data from memory to the register 1', {
    program: [
      instructionCodesByNames.MovLitReg,
      0xff, 0xff,
      registerCodesByNames.r1,
      instructionCodesByNames.Halt,
    ],
    registers: {
      r1: 0xffff,
    },
  });

  testCPU('should move data from memory to the register 2', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00, 0x13,
      registerCodesByNames.r2,
      instructionCodesByNames.Halt,
    ],
    registers: {
      r2: 0x0013,
    },
  });

  testCPU('should move data from memory to the register 3', {
    program: [
      instructionCodesByNames.MovLitReg,
      0xab, 0xcd,
      registerCodesByNames.r3,
      instructionCodesByNames.Halt,
    ],
    registers: {
      r3: 0xabcd,
    },
  });

  testCPU('should move data from memory to the register 4', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x10, 0x00,
      registerCodesByNames.r4,
      instructionCodesByNames.Halt,
    ],
    registers: {
      r4: 0x1000,
    },
  });

  testCPU('should move data from memory to the register ip', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00, 0x06,
      registerCodesByNames.ip,
      0x00, 0x00,
      instructionCodesByNames.Halt,
    ],
    registers: {
      ip: 0x0007,
    },
  });

  testCPU('should move data from memory to the register acc', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x11, 0x11,
      registerCodesByNames.acc,
      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x1111,
    },
  });
});
