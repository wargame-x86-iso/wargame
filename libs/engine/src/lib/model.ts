import * as R from 'effect/ReadonlyRecord'
import * as B from 'effect/Brand'
import * as OP from '@fp-ts/optic'

export type PlayerId = string & B.Brand<'playerId'>

export const PlayerId = B.nominal<PlayerId>()

export type UnitId = string & B.Brand<'unitId'>

export const UnitId = B.nominal<UnitId>()

export type Position = [number, number, number] & B.Brand<'position'>

export const Position = B.nominal<Position>()

export const positionToString = ([x, y, z]: Position) => `${x},${y},${z}`

export const positionEq = (a: Position, b: Position) =>
  positionToString(a) === positionToString(b)

export interface UnitState {
  id: UnitId
  position: Position
  playerId: PlayerId
  actionPoints: number
  movementRange: number
}

export interface Unit {
  id: UnitId
  playerId: PlayerId
  movementRange: number
}

export interface GameState {
  currentPlayer: PlayerId
  unitStates: R.ReadonlyRecord<UnitState>
}

export const unitStates = OP.lens(
  (game: GameState) => game.unitStates,
  (unitStates) => (game) => ({ ...game, unitStates })
)

export const unitPosition = OP.lens(
  (unitState: UnitState) => unitState.position,
  (position) => (unitState) => ({ ...unitState, position })
)

export const unitPositionOf = (unitId: UnitId) =>
  unitStates.at(unitId).compose(unitPosition)

export interface GameConstants {
  terrainCosts: R.ReadonlyRecord<number>
  units: R.ReadonlyRecord<Unit>
}

export const terrainCosts = OP.lens(
  (constants: GameConstants) => constants.terrainCosts,
  () => (game) => game
)

export const units = OP.lens(
  (constants: GameConstants) => constants.units,
  () => (game) => game
)
