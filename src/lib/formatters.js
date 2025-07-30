export function catTitle(str) {
  if (!str) return "";
  return str
    .replace(/-/g, " ")
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
}