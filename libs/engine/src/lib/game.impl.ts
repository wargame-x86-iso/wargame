import * as T from 'effect/Effect'
import * as A from 'effect/ReadonlyArray'
import * as L from 'effect/Layer'
import * as Ref from 'effect/Ref'
import * as OP from '@fp-ts/optic'
import { pipe } from 'effect/Function'
import { subtract } from 'effect/Number'

import {
  GameState,
  GameConstants,
  UnitId,
  Position,
  positionToString,
  unitStates,
  units,
  unitPositionOf,
  unitActionPointsOf,
  terrainCosts,
  currentTurn,
  currentPlayer,
  currentTurnActions,
  Action,
  TurnState,
  pastTurns,
} from './model'

import { Game } from './game'

class InmemoryGameImpl implements Game {
  constructor(
    private readonly constants: GameConstants,
    private readonly ref: Ref.Ref<GameState>
  ) {}
  lookupCurrentPlayer() {
    return pipe(this.ref, Ref.get, T.map(OP.get(currentPlayer)))
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
  decrementUnitActionPoints(unitId: UnitId, n: number) {
    return pipe(
      this.ref,
      Ref.update(pipe(subtract(n), OP.modify(unitActionPointsOf(unitId))))
    )
  }
  saveAction(action: Action) {
    return pipe(
      this.ref,
      Ref.update(pipe(A.append(action), OP.modify(currentTurnActions)))
    )
  }
  lookupNextPlayer() {
    return pipe(
      this.ref,
      Ref.get,
      T.map((state) => {
        const { order } = this.constants
        const { playerId } = state.currentTurn
        const index = order.indexOf(playerId)
        return order[(index + 1) % order.length]
      })
    )
  }
  lookupCurrentTurn() {
    return pipe(this.ref, Ref.get, T.map(OP.get(currentTurn)))
  }
  savePastTurn(turn: TurnState) {
    return pipe(
      this.ref,
      Ref.update(pipe(A.prepend(turn), OP.modify(pastTurns)))
    )
  }
  replaceCurrentTurn(turn: TurnState) {
    return pipe(this.ref, Ref.update(pipe(turn, OP.replace(currentTurn))))
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
