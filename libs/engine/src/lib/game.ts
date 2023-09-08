import * as T from 'effect/Effect'
import * as C from 'effect/Context'

import {
  Action,
  PlayerId,
  UnitId,
  Position,
  UnitState,
  Unit,
  TurnState,
} from './model'

export interface Game {
  lookupCurrentPlayer: () => T.Effect<never, never, PlayerId>
  lookupTerrainCost: (position: Position) => T.Effect<never, never, number>
  lookupUnitState: (unitId: UnitId) => T.Effect<never, never, UnitState>
  lookupUnit: (unitId: UnitId) => T.Effect<never, never, Unit>
  lookupNextPlayer: () => T.Effect<never, never, PlayerId>
  updateUnitPosition: (
    unitId: UnitId,
    position: Position
  ) => T.Effect<never, never, void>
  decrementUnitActionPoints: (
    unitId: UnitId,
    n: number
  ) => T.Effect<never, never, void>
  saveAction: (action: Action) => T.Effect<never, never, void>
  lookupCurrentTurn: () => T.Effect<never, never, TurnState>
  savePastTurn: (turn: TurnState) => T.Effect<never, never, void>
  replaceCurrentTurn: (turn: TurnState) => T.Effect<never, never, void>
}

export const Game = C.Tag<Game>()
