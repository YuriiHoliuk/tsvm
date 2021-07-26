import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('incRegInPlace operation', () => {
  testCPU('should increment r1 in place', {
    program: [
      instructionCodesByNames.IncRegInPlace,
      registerCodesByNames.r1,
      instructionCodesByNames.Halt,
    ],
    registers: {
      r1: 0x0001,
    },
  });

  testCPU('should increment acc multiple times', {
    program: [
      instructionCodesByNames.IncRegInPlace,
      registerCodesByNames.acc,

      instructionCodesByNames.IncRegInPlace,
      registerCodesByNames.acc,

      instructionCodesByNames.IncRegInPlace,
      registerCodesByNames.acc,

      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x0003,
    },
  });
});
