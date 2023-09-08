import { UnitId, Position, PlayerId } from './brands'

export interface UnitMoved {
  type: 'UnitMoved'
  unitId: UnitId
  from: Position
  to: Position
}

export interface TurnEnded {
  type: 'TurnEnded'
  playerId: PlayerId
}

export type Event = UnitMoved | TurnEnded