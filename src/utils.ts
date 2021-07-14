export interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type Swap<T extends AnyObject> = {
  [K in keyof T as T[K]]: K;
};

export const swap = <T extends AnyObject>(obj: T): Swap<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swappedObj = {} as any;

  Object.entries(obj).forEach(([key, value]) => {
    swappedObj[value] = key;
  });

  return swappedObj as Swap<T>;
};
