export interface AnyObject {
  [key: string]: any;
}

export type Swap<T extends AnyObject> = {
  [K in keyof T as T[K]]: K;
};

export const swap = <T extends AnyObject>(obj: T): Swap<T> => {
  const swappedObj = {} as any;

  Object.entries(obj).forEach(([key, value]) => {
      swappedObj[value] = key;
  });

  return swappedObj as Swap<T>;
}