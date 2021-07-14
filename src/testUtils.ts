import { CPU } from './CPU';
import { makeDebug } from './debug';
import { Memory } from './Memory';
import { RegisterNames } from './registers';

export interface ExpectedState {
  registers?: Partial<{ [key in RegisterNames]: number }>;
  memory?: Record<number, number>;
}

export interface Params extends ExpectedState {
  program: number[];
  isDebugMode?: boolean;
}

const commonTest = (testFn: typeof it, title: string, params: Params) => testFn(title, () => {
  const {
    program,
    registers,
    memory,
    isDebugMode,
  } = params;

  if (!registers && !memory) {
    throw new Error('You should provide at least 1 field from the ExpectedState');
  }

  const mem = new Memory(0xffff + 1);
  const cpu = new CPU(mem);

  mem.load(program);

  cpu.run(isDebugMode ? makeDebug(cpu) : undefined);

  if (registers) {
    for (const [name, value] of Object.entries(registers) as [RegisterNames, number][]) {
      expect(cpu.registers[name].getUint16(0)).toBe(value);
    }
  }

  if (memory) {
    for (const [offset, value] of Object.entries(memory)) {
      expect(mem.getUint16(Number(offset))).toBe(value);
    }
  }
});

export const testCPU = (title: string, params: Params) => commonTest(it, title, params);

testCPU.only = (title: string, params: Params) => commonTest(it.only, title, params);
testCPU.debug = (title: string, params: Params) => commonTest(it.only, title, { ...params, isDebugMode: true });