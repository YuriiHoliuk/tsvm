import { Memory, CPU, makeDebug } from './src';

const memory = new Memory(0xffff + 1);
const cpu = new CPU(memory);

const writableMemory = new Uint8Array(memory.buffer);

let i = 0;

// MoveMemToReg
writableMemory[i++] = 0x00;
writableMemory[i++] = 0x01;

// literal 0xffff
writableMemory[i++] = 0xff;
writableMemory[i++] = 0xff;

// r1
writableMemory[i++] = 0x00;
writableMemory[i++] = 0x03;

// MoveMemToReg
writableMemory[i++] = 0x00;
writableMemory[i++] = 0x01;

// literal 0x0013
writableMemory[i++] = 0x00;
writableMemory[i++] = 0x13;

// r2
writableMemory[i++] = 0x00;
writableMemory[i++] = 0x04;

const debug = makeDebug(cpu);

debug();

cpu.step();
debug();

cpu.step();
debug();
