import { instructionCodesByNames } from '../instructions';
import { registerCodesByNames } from '../registers';
import { testCPU } from '../testUtils';

describe('movMemReg instruction', () => {
  testCPU('sould move to r1', {
    program: [
      instructionCodesByNames.MovMemReg,
      0x00,
      0x09,
      registerCodesByNames.r1,
      instructionCodesByNames.Halt,
      0x00,
      0x00,
      0x00,
      0x00,
      0xff,
      0x11,
    ],
    registers: {
      r1: 0xff11,
    },
  });
});
