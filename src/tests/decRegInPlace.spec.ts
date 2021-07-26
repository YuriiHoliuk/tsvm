import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('decRegInPlace operation', () => {
  testCPU('should decrement r1 in place', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00,
      0x02,
      registerCodesByNames.r1,
      instructionCodesByNames.DecRegInPlace,
      registerCodesByNames.r1,
      instructionCodesByNames.Halt,
    ],
    registers: {
      r1: 0x0001,
    },
  });

  testCPU('should decrement acc multiple times', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00,
      0x06,
      registerCodesByNames.acc,
      instructionCodesByNames.DecRegInPlace,
      registerCodesByNames.acc,

      instructionCodesByNames.DecRegInPlace,
      registerCodesByNames.acc,

      instructionCodesByNames.DecRegInPlace,
      registerCodesByNames.acc,

      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x0003,
    },
  });
});
