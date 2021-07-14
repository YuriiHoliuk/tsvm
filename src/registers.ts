import { AbstractMemory } from './AbstractMemory';
import { swap, Swap } from './utils';

export interface RegisterCodesByNames {
  ip: 0x01;
  acc: 0x02;
  r1: 0x03;
  r2: 0x04;
  r3: 0x05;
  r4: 0x06;
}

export const registerCodesByNames: RegisterCodesByNames = {
  ip: 0x01,
  acc: 0x02,
  r1: 0x03,
  r2: 0x04,
  r3: 0x05,
  r4: 0x06,
};

export type RegisterNamesByCodes = Swap<RegisterCodesByNames>;
export type RegisterNames = keyof RegisterCodesByNames;
export type RegisterCodes = keyof RegisterNamesByCodes;

export const registerNamesByCodes: RegisterNamesByCodes = swap(registerCodesByNames);
export const registerNames: RegisterNames[] = Object.keys(registerCodesByNames) as RegisterNames[];
export const registerCodes: RegisterCodes[] = Object.values(registerCodesByNames);

export type Registers = {
  [key in RegisterNames]: AbstractMemory;
};
