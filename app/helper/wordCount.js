export function WordCount(s) {
  return s.replace(/-/g, " ").trim().split(/\s+/g).length;
}
