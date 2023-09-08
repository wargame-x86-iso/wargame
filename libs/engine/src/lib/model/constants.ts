import * as R from 'effect/ReadonlyRecord'
import * as OP from '@fp-ts/optic'

import { PlayerOrder, PlayerId, UnitId } from './brands'

export interface Unit {
  id: UnitId
  playerId: PlayerId
  movementRange: number
}

export interface GameConstants {
  order: PlayerOrder
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
