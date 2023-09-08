import { UnitId, Path, PlayerId } from './brands'

export interface MoveAction {
  type: 'move'
  playerId: PlayerId
  unitId: UnitId
  path: Path
}

export interface EndTurnAction {
  type: 'endTurn'
  playerId: PlayerId
}

export type Action = MoveAction | EndTurnAction