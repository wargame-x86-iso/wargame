import { UnitId, Position, PlayerId } from './brands'

export interface UnitMoved {
  type: 'UnitMoved'
  key: number
  unitId: UnitId
  from: Position
  to: Position
}

export interface UnitsSeen {
  type: 'UnitsSeen'
  key: number
  unitIds: UnitId[]
  playerId: PlayerId
}

export interface UnitsHidden {
  type: 'UnitsHidden'
  key: number
  unitIds: UnitId[]
  playerId: PlayerId
}

export interface TurnEnded {
  type: 'TurnEnded'
  key: number
  playerId: PlayerId
}

export type Event = UnitMoved | UnitsSeen | UnitsHidden | TurnEnded
