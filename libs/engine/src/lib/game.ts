import * as T from 'effect/Effect'
import * as C from 'effect/Context'

import {
  PlayerId,
  UnitId,
  Position,
  UnitState,
  Unit,
} from './model'

export interface Game {
  lookupCurrentPlayer: () => T.Effect<unknown, never, PlayerId>
  lookupTerrainCost: (position: Position) => T.Effect<unknown, never, number>
  lookupUnitState: (unitId: UnitId) => T.Effect<unknown, never, UnitState>
  lookupUnit: (unitId: UnitId) => T.Effect<unknown, never, Unit>
  updateUnitPosition: (
    unitId: UnitId,
    position: Position
  ) => T.Effect<unknown, never, void>
}

export const Game = C.Tag<Game>()
