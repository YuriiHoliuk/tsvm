import { Memory } from './Memory';
import { RegisterCodes, registerNamesByCodes, Registers } from './registers';
import { AbstractCPU } from './AbstractCPU';
import { AbstractMemory } from './AbstractMemory';
import { registerNames } from './registers';
import { instructionCodesByNames } from './instructions';

export class CPU implements AbstractCPU {
  readonly registers: Registers;

  constructor(public readonly memory: AbstractMemory) {
    this.registers = registerNames.reduce<Registers>((acc, name) => {
      acc[name] = new Memory(2);

      return acc;
    }, {} as Registers);
  }

  step() {
    const nextInstructionAddress = this.registers.ip.getUint16(0);
    this.registers.ip.setUint16(0, nextInstructionAddress + 1);
    const instruction = this.memory.getUint8(nextInstructionAddress);

    switch (instruction) {
      case instructionCodesByNames.MovMemoryToReg: {
        const valueAddress = this.registers.ip.getUint16(0);
        this.registers.ip.setUint16(0, valueAddress + 2);
        const value = this.memory.getUint16(valueAddress);

        const registerAddress = this.registers.ip.getUint16(0);
        this.registers.ip.setUint16(0, registerAddress + 1);
        const registerCode = this.memory.getUint8(registerAddress) as RegisterCodes;
        const registerName = registerNamesByCodes[registerCode];
        const register = this.registers[registerName];

        register.setUint16(0, value);

        return;
      }

      case instructionCodesByNames.Halt: {
        return true;
      }

      default: {
        throw new Error(`Instruction ${instruction} not supported`);
      }
    }
  }

  run(onStep?: () => void) {
    let isDone;

    if (onStep) {
      onStep();
    }

    while (!isDone) {
      isDone = this.step();

      if (onStep) {
        onStep();
      }
    }
  }
}
