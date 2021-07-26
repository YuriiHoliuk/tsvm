import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('subRegReg instruction', () => {
  testCPU('should sub 2 registers and store result in the acc', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00,
      0x0a,
      registerCodesByNames.r1,

      instructionCodesByNames.MovLitReg,
      0x00,
      0x06,
      registerCodesByNames.r2,

      instructionCodesByNames.SubRegReg,
      registerCodesByNames.r1,
      registerCodesByNames.r2,

      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x0004,
    },
  });
});
