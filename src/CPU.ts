import { Memory } from './Memory';
import {
  RegisterCodes, registerNamesByCodes, Registers, registerNames, registerCodes,
} from './registers';
import { AbstractCPU } from './AbstractCPU';
import { AbstractMemory } from './AbstractMemory';

import { instructionCodesByNames } from './instructions';

export class CPU implements AbstractCPU {
  readonly registers: Registers;

  constructor(public readonly memory: AbstractMemory) {
    this.registers = registerNames.reduce<Registers>((acc, name) => {
      acc[name] = new Memory(2);

      return acc;
    }, {} as Registers);
  }

  step(): boolean {
    const instruction = this.fetch8();

    switch (instruction) {
      case instructionCodesByNames.MovLitReg: {
        const value = this.fetch16();
        const registerCode = this.fetch8() as RegisterCodes;

        this.setRegister(registerCode, value);

        return false;
      }

      case instructionCodesByNames.MovMemReg: {
        const address = this.fetch16();
        const registerCode = this.fetch8() as RegisterCodes;
        const value = this.memory.getUint16(address);

        this.setRegister(registerCode, value);

        return false;
      }

      case instructionCodesByNames.MovRegMem: {
        const registerCode = this.fetch8() as RegisterCodes;
        const address = this.fetch16();
        const value = this.getRegister(registerCode);

        this.memory.setUint16(address, value);

        return false;
      }

      case instructionCodesByNames.AddLitReg: {
        const a = this.fetch16();
        const registerCode = this.fetch8() as RegisterCodes;
        const b = this.getRegister(registerCode);
        const result = a + b;

        this.registers.acc.setUint16(0x0000, result);

        return false;
      }

      case instructionCodesByNames.AddRegReg: {
        const registerCodeA = this.fetch8() as RegisterCodes;
        const registerCodeB = this.fetch8() as RegisterCodes;
        const a = this.getRegister(registerCodeA);
        const b = this.getRegister(registerCodeB);
        const result = a + b;

        this.registers.acc.setUint16(0x0000, result);

        return false;
      }

      // TODO: deal with negative values
      case instructionCodesByNames.SubLitReg: {
        const a = this.fetch16();
        const registerCode = this.fetch8() as RegisterCodes;
        const b = this.getRegister(registerCode);
        const result = a - b;

        this.registers.acc.setUint16(0x0000, result);

        return false;
      }

      case instructionCodesByNames.SubRegReg: {
        const registerCodeA = this.fetch8() as RegisterCodes;
        const registerCodeB = this.fetch8() as RegisterCodes;
        const a = this.getRegister(registerCodeA);
        const b = this.getRegister(registerCodeB);
        const result = a - b;

        this.registers.acc.setUint16(0x0000, result);

        return false;
      }

      case instructionCodesByNames.IncRegInPlace: {
        const registerCode = this.fetchRegisterCode();
        const value = this.getRegister(registerCode);

        this.setRegister(registerCode, value + 1);

        return false;
      }

      case instructionCodesByNames.DecRegInPlace: {
        const registerCode = this.fetchRegisterCode();
        const value = this.getRegister(registerCode);

        this.setRegister(registerCode, value - 1);

        return false;
      }

      case instructionCodesByNames.Halt: {
        return true;
      }

      default: {
        throw new Error(`Instruction ${instruction} not supported`);
      }
    }
  }

  private getRegister(code: RegisterCodes): number {
    const registerName = registerNamesByCodes[code];

    return this.registers[registerName].getUint16(0x0000);
  }

  private setRegister(code: RegisterCodes, value: number): void {
    const registerName = registerNamesByCodes[code];

    this.registers[registerName].setUint16(0x0000, value);
  }

  private fetch8() {
    const address = this.registers.ip.getUint16(0);
    this.registers.ip.setUint16(0, address + 1);

    return this.memory.getUint8(address);
  }

  private static isRegisterCode(maybeRegisterCode: number): maybeRegisterCode is RegisterCodes {
    return registerCodes.includes(maybeRegisterCode as RegisterCodes);
  }

  private fetchRegisterCode() {
    const registerCode = this.fetch8();

    if (CPU.isRegisterCode(registerCode)) {
      return registerCode;
    }

    throw new Error(`Invalid register code ${registerCode}.`);
  }

  private fetch16() {
    const address = this.registers.ip.getUint16(0);
    this.registers.ip.setUint16(0, address + 2);

    return this.memory.getUint16(address);
  }

  run(onStep?: () => void): void {
    let isDone = false;

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
