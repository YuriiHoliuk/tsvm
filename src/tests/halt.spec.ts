import { instructionCodesByNames } from '../instructions';
import { testCPU } from '../testUtils';

describe('Halt instruction', () => {
  testCPU('should stop on Halt', {
    program: [instructionCodesByNames.Halt],
    registers: {
      ip: 0x001,
    },
  });
});
