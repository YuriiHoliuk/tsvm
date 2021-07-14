import { AbstractMemory } from './AbstractMemory';

export class Memory implements AbstractMemory {
  readonly buffer: ArrayBuffer;

  private readonly view: DataView;

  constructor(public readonly byteLength: number) {
    this.buffer = new ArrayBuffer(this.byteLength);
    this.view = new DataView(this.buffer);
  }

  getUint8(byteOffset: number): number {
    return this.view.getUint8(byteOffset);
  }

  setUint8(byteOffset: number, value: number): void {
    this.view.setUint8(byteOffset, value);
  }

  getUint16(byteOffset: number): number {
    return this.view.getUint16(byteOffset);
  }

  setUint16(byteOffset: number, value: number): void {
    this.view.setUint16(byteOffset, value);
  }

  load(data: number[], from = 0x0000): void {
    let nextAddress = from;

    for (const byte of data) {
      this.setUint8(nextAddress, byte);

      nextAddress++;
    }
  }
}
