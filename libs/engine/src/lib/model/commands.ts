import { UnitId, Path, PlayerId } from './brands'

export interface Move {
  type: 'move'
  playerId: PlayerId
  unitId: UnitId
  path: Path
}

export interface EndTurn {
  type: 'endTurn'
  playerId: PlayerId
}

export type Command = Move | EndTurn