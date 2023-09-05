export function with2DRange<T>(
  width: number,
  height: number,
  fn: (x: number, y: number) => T
) {
  return Array.from({ length: width })
    .map((_, i) => Array.from({ length: height }).map((_, j) => fn(i, j)))
    .flat()
}
