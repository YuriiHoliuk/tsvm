import { swap, Swap } from './utils';

export interface InstructionCodesByNames {
  MovLitReg: 0x01;
  MovMemReg: 0x02;
  MovRegMem: 0x03;
  AddLitReg: 0x04;
  AddRegReg: 0x05;
  SubLitReg: 0x06;
  SubRegReg: 0x07;
  IncRegInPlace: 0x08;
  DecRegInPlace: 0x09;
  LogNotReg: 0x0a;
  LogAndLitReg: 0x0b;
  LogOrLitReg: 0x0c;
  LogXorLitReg: 0x0d;
  LogAndRegReg: 0x0e;
  LogOrRegReg: 0x0f;
  LogXorRegReg: 0x10;
  LShiftLitReg: 0x11;
  LShiftRegReg: 0x11;
  RShiftLitReg: 0x12;
  RShiftRegReg: 0x13;
  Halt: 0xff;
}

export const instructionCodesByNames: InstructionCodesByNames = {
  MovLitReg: 0x01,
  MovMemReg: 0x02,
  MovRegMem: 0x03,
  AddLitReg: 0x04,
  AddRegReg: 0x05,
  SubLitReg: 0x06,
  SubRegReg: 0x07,
  IncRegInPlace: 0x08,
  DecRegInPlace: 0x09,
  LogNotReg: 0x0a,
  LogAndLitReg: 0x0b,
  LogOrLitReg: 0x0c,
  LogXorLitReg: 0x0d,
  LogAndRegReg: 0x0e,
  LogOrRegReg: 0x0f,
  LogXorRegReg: 0x10,
  LShiftLitReg: 0x11,
  LShiftRegReg: 0x11,
  RShiftLitReg: 0x12,
  RShiftRegReg: 0x13,
  Halt: 0xff,
};

export type InstructionNamesByCodes = Swap<InstructionCodesByNames>;
export type InstructionNames = keyof InstructionCodesByNames;
export type InstructionCodes = keyof InstructionNamesByCodes;

export const instructionNamesByCodes: InstructionNamesByCodes = swap(instructionCodesByNames);
export const instructionNames: InstructionNames[] = Object
  .keys(instructionCodesByNames) as InstructionNames[];
export const instructionCodes: InstructionCodes[] = Object.values(instructionCodesByNames);
