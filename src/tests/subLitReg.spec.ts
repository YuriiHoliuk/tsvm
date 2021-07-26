import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('subLitReg instruction', () => {
  testCPU('should sub literal to register(r1) value and store result in acc register', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00,
      0x02,
      registerCodesByNames.r1,
      instructionCodesByNames.SubLitReg,
      0x00,
      0x05,
      registerCodesByNames.r1,
      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x0003,
    },
  });
});
