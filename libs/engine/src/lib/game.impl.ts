import * as T from 'effect/Effect'
import * as L from 'effect/Layer'
import * as Ref from 'effect/Ref'
import * as OP from '@fp-ts/optic'
import { pipe } from 'effect/Function'

import {
  GameState,
  GameConstants,
  UnitId,
  Position,
  positionToString,
  unitStates,
  units,
  unitPositionOf,
  terrainCosts,
} from './model'

import { Game } from './game'

class InmemoryGameImpl implements Game {
  constructor(
    private readonly constants: GameConstants,
    private readonly ref: Ref.Ref<GameState>
  ) {}
  lookupCurrentPlayer() {
    return pipe(
      this.ref,
      Ref.get,
      T.map((state) => state.currentPlayer)
    )
  }
  lookupTerrainCost(position: Position) {
    return pipe(
      this.constants,
      OP.get(terrainCosts.at(positionToString(position))),
      T.succeed
    )
  }
  lookupUnit(unitId: UnitId) {
    return pipe(this.constants, OP.get(units.at(unitId)), T.succeed)
  }
  lookupUnitState(unitId: UnitId) {
    return pipe(this.ref, Ref.get, T.map(OP.get(unitStates.at(unitId))))
  }
  updateUnitPosition(unitId: UnitId, position: Position) {
    return pipe(
      this.ref,
      Ref.update(pipe(position, OP.replace(unitPositionOf(unitId))))
    )
  }
}

export const InmemoryGame = (
  constants: GameConstants,
  initialState: GameState
) =>
  pipe(
    Ref.make<GameState>(initialState),
    T.map((ref) => new InmemoryGameImpl(constants, ref)),
    L.effect(Game)
  )
