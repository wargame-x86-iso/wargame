import * as R from 'effect/ReadonlyRecord'
import * as OP from '@fp-ts/optic'

import { UnitId, PlayerId, PlayerOrder, Position } from './brands'
import { Command } from './commands'

export interface UnitState {
  id: UnitId
  position: Position
  playerId: PlayerId
  actionPoints: number
  movementRange: number
}

export interface TurnState {
  number: number
  playerId: PlayerId
  actions: Command[]
}

export interface GameState {
  unitStates: R.ReadonlyRecord<UnitState>
  pastTurns: TurnState[]
  currentTurn: TurnState
}

export const unitStates = OP.lens(
  (game: GameState) => game.unitStates,
  (unitStates) => (game) => ({ ...game, unitStates })
)

export const unitPosition = OP.lens(
  (unitState: UnitState) => unitState.position,
  (position) => (unitState) => ({ ...unitState, position })
)

export const unitActionPoints = OP.lens(
  (unitState: UnitState) => unitState.actionPoints,
  (actionPoints) => (unitState) => ({ ...unitState, actionPoints })
)

export const unitPositionOf = (unitId: UnitId) =>
  unitStates.at(unitId).compose(unitPosition)

export const unitActionPointsOf = (unitId: UnitId) =>
  unitStates.at(unitId).compose(unitActionPoints)

export const currentTurn = OP.lens(
  (state: GameState) => state.currentTurn,
  (currentTurn) => (state) => ({ ...state, currentTurn })
)

export const turnPlayer = OP.lens(
  (state: TurnState) => state.playerId,
  () => (state) => state
)

export const currentPlayer = currentTurn.compose(turnPlayer)

export const turnActions = OP.lens(
  (turnState: TurnState) => turnState.actions,
  (actions) => (turnState) => ({ ...turnState, actions })
)

export const currentTurnActions = currentTurn.compose(turnActions)

export const pastTurns = OP.lens(
  (state: GameState) => state.pastTurns,
  (pastTurns) => (state) => ({ ...state, pastTurns })
)
