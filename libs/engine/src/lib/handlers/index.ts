import * as T from 'effect/Effect'

import { Command } from '../model'
import { Game } from '../game'

import { handleEndTurn } from './end-turn'
import { handleMove } from './move'

export const handleCommand = (command: Command) =>
  T.gen(function* (_) {
    const game = yield* _(Game)
    const currentPlayer = yield* _(game.lookupCurrentPlayer())
    if (command.playerId !== currentPlayer) {
      yield* _(T.fail(new Error('Not your turn')))
    }
    switch (command.type) {
      case 'move':
        yield* _(handleMove(command))
        break
      case 'endTurn':
        yield* _(handleEndTurn(command))
        break
      default:
        yield* _(T.fail(new Error('Unknown command type')))
    }
  })
