export function arrayify<T>(item: T | T[]): T[] {
  if (!item) return [];
  if (item instanceof Array) {
    return item;
  } else if (typeof item === "undefined") {
    return [];
  } else {
    return [item];
  }
}
