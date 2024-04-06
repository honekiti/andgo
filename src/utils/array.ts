export function uniq<T>(array: T[]) {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}
