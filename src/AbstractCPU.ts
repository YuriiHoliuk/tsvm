import { AbstractMemory } from './AbstractMemory';
import { Registers } from './registers';

export interface AbstractCPU {
  readonly memory: AbstractMemory;

  readonly registers: Registers;

  step(): boolean;

  run(onStep?: () => void): void;
}
