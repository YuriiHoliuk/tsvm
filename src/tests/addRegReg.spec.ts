import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('addRegReg instruction', () => {
  testCPU('should add 2 registers and store result in the acc', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00,
      0x0a,
      registerCodesByNames.r1,

      instructionCodesByNames.MovLitReg,
      0x00,
      0x06,
      registerCodesByNames.r2,

      instructionCodesByNames.AddRegReg,
      registerCodesByNames.r1,
      registerCodesByNames.r2,

      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x0010,
    },
  });
});
