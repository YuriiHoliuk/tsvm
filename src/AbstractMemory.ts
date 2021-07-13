export type AbstractMemory = Pick<
  DataView,
  'getUint8' | 'getUint16' | 'setUint8' | 'setUint16' | 'byteLength' | 'buffer'
>;
