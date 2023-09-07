import { Position, positionEq } from '../model'

export const getSuccessors = ([x, y, z]: Position): Position[] => [
  Position([x - 1, y + 1, z]),
  Position([x, y + 1, z - 1]),
  Position([x + 1, y, z - 1]),
  Position([x + 1, y - 1, z]),
  Position([x, y - 1, z + 1]),
  Position([x - 1, y, z + 1]),
]

export function pathIsConnected(path: Position[]): boolean {
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i]
    const next = path[i + 1]
    const successors = getSuccessors(current)
    if (!successors.find((s) => positionEq(s, next))) {
      return false
    }
  }
  return true
}
