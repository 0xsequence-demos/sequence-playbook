export function slugify(str: string) {
  return str.split(" ").join("-").toLowerCase();
}
