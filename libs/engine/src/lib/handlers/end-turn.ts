import * as T from 'effect/Effect'

import { EndTurn, TurnState } from '../model'
import { Game } from '../game'

export const handleEndTurn = (action: EndTurn) =>
  T.gen(function* (_) {
    const game = yield* _(Game)
    const nextPlayer = yield* _(game.lookupNextPlayer())
    yield* _(game.saveAction(action))
    const currentTurn = yield* _(game.lookupCurrentTurn())
    const nextTurn: TurnState = {
      number: currentTurn.number + 1,
      playerId: nextPlayer,
      actions: [],
    }
    yield* _(game.savePastTurn(currentTurn))
    yield* _(game.replaceCurrentTurn(nextTurn))
  })
