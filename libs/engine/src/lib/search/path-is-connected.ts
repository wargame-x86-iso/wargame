import { Position, positionEq } from '../model'

import { getSuccessors } from './successor'

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
