export function distinct<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export const not = <T>(v: T) => !v;
