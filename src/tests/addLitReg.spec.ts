import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('addLitReg instruction', () => {
  testCPU('should add literal to register(r1) value and store result in acc register', {
    program: [
      instructionCodesByNames.MovLitReg,
      0x00,
      0x05,
      registerCodesByNames.r1,
      instructionCodesByNames.AddLitReg,
      0x00,
      0x02,
      registerCodesByNames.r1,
      instructionCodesByNames.Halt,
    ],
    registers: {
      acc: 0x0007,
    },
  });
});
