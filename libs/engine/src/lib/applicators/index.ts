import * as T from 'effect/Effect'

import { Action } from '../model'
import { Game } from '../game'

import { applyEndTurnAction } from './apply-end-turn'
import { applyMoveAction } from './apply-move'

export const applyAction = (action: Action) =>
  T.gen(function* (_) {
    const game = yield* _(Game)
    const currentPlayer = yield* _(game.lookupCurrentPlayer())
    if (action.playerId !== currentPlayer) {
      yield* _(T.fail(new Error('Not your turn')))
    }
    switch (action.type) {
      case 'move':
        yield* _(applyMoveAction(action))
        break
      case 'endTurn':
        yield* _(applyEndTurnAction(action))
        break
      default:
        yield* _(T.fail(new Error('Unknown action type')))
    }
  })
