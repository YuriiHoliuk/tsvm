import { testCPU } from '../testUtils';

describe('Halt instruction', () => {
  testCPU('should stop on Halt', {
    program: [0xff],
    registers: {
      ip: 0x001,
    },
  });
});
