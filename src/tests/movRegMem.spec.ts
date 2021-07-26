import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('movRegMem instruction', () => {
  testCPU('should move r2 register value to correct memory address', {
    program: [
      instructionCodesByNames.MovLitReg,
      0xab,
      0xcd,
      registerCodesByNames.r2,
      instructionCodesByNames.MovRegMem,
      registerCodesByNames.r2,
      0x10,
      0x00,
      instructionCodesByNames.Halt,
    ],
    memory: {
      0x1000: 0xabcd,
    },
  });
});
