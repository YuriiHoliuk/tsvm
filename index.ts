import { debugRun } from './src';


const movMemRegProgram = [
  // MoveMemToReg
  0x01,
  // literal 0xffff
  0xff,
  0xff,
  // r1
  0x03, 
  // MoveMemToReg
  0x01, 
  // literal 0x0013
  0x00,
  0x13,
  // r2
  0x04,
];

debugRun(movMemRegProgram);
