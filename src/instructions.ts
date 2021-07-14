import { swap, Swap } from './utils';

export interface InstructionCodesByNames {
  MovMemoryToReg: 0x01;
  Halt: 0xff;
};

export const instructionCodesByNames: InstructionCodesByNames = {
  MovMemoryToReg: 0x01,
  Halt: 0xff,
};

export type InstructionNamesByCodes = Swap<InstructionCodesByNames>;
export type InstructionNames = keyof InstructionCodesByNames;
export type InstructionCodes = keyof InstructionNamesByCodes;

export const instructionNamesByCodes: InstructionNamesByCodes = swap(instructionCodesByNames);
export const instructionNames: InstructionNames[] = Object.keys(instructionCodesByNames) as InstructionNames[];
export const instructionCodes: InstructionCodes[] = Object.values(instructionCodesByNames);
