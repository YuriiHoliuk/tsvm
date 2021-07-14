import { InstructionCodes, instructionNamesByCodes } from './instructions';
import { registerNames } from './registers';
import { AbstractCPU } from './AbstractCPU';
import { Memory } from './Memory';
import { CPU } from './CPU';

const toHex = (size: 2 | 4) => (value?: number) => `0x${value?.toString(16).padStart(size, '0')}`;
const toHex8 = toHex(2);
const toHex16 = toHex(4);

export const makeDebug = (cpu: AbstractCPU) => (from = 0x0000, length = 32): void => {
  const instructionAddres = cpu.registers.ip.getUint16(0);
  const instructionCode = cpu.memory.getUint8(instructionAddres) as InstructionCodes;
  const instructionName = instructionNamesByCodes[instructionCode];
  const name = instructionName
    ? `Next instruction: ${instructionName}`
    : 'No instruction';

  console.log(`\n\n${name}(${toHex8(instructionCode)})`);

  console.log('\nRegisters:');

  registerNames.forEach((registerName) => {
    console.log(`${registerName}: ${toHex16(cpu.registers[registerName].getUint16(0))}`);
  });

  const memoryForRead = new DataView(cpu.memory.buffer);
  let lastRow: string[] = [];
  const memoryValue: string[][] = [lastRow];

  for (let i = from; i < length; i += 2) {
    if (lastRow.length === 4) {
      lastRow = [];
      memoryValue.push(lastRow);
    }

    const value = memoryForRead.getUint16(Math.floor(i / 2));

    lastRow.push(toHex16(value));
  }

  console.log(`\nMemory(from: ${toHex16(from)}, to: ${toHex16(from + length)}): `);
  console.log(memoryValue.map((row) => row.join(' ')).join('\n'));
};

export const debugRun = (program: number[]): void => {
  const memory = new Memory(0xffff + 1);
  const cpu = new CPU(memory);

  memory.load([...program, 0xff]);

  cpu.run(makeDebug(cpu));
};
