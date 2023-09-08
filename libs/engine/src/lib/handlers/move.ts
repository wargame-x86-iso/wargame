import * as A from 'effect/ReadonlyArray'
import * as T from 'effect/Effect'

import { Move, positionEq } from '../model'
import { pathIsConnected } from '../search'
import { Game } from '../game'

export const handleMove = (action: Move) =>
  T.gen(function* (_) {
    const game = yield* _(Game)

    const unitState = yield* _(game.lookupUnitState(action.unitId))

    if (!positionEq(unitState.position, A.headNonEmpty(action.path))) {
      yield* _(
        T.fail(new Error('Unit is not at the specified starting position'))
      )
    }
    if (!pathIsConnected(action.path)) {
      yield* _(T.fail(new Error('Path is not connected')))
    }
    const pathCost = yield* _(
      T.reduce(A.tailNonEmpty(action.path), 0, (acc, pos) =>
        T.map(game.lookupTerrainCost(pos), (cost) => acc + cost)
      )
    )
    const unit = yield* _(game.lookupUnit(action.unitId))
    // TODO: add safe division to round to 2 decimals
    const percentMoved = pathCost / unit.movementRange
    if (percentMoved > 1) {
      yield* _(T.fail(new Error(`Unit cannot move that far.`)))
    }
    const actionPointCost = percentMoved > 0.5 ? 2 : 1
    if (actionPointCost > unitState.actionPoints) {
      yield* _(T.fail(new Error(`Unit does not have enough action points.`)))
    }
    // TODO: calculate new position, there could be hidden obstacles along the way!
    const newPosition = A.lastNonEmpty(action.path)
    yield* _(game.updateUnitPosition(action.unitId, newPosition))
    yield* _(game.decrementUnitActionPoints(action.unitId, actionPointCost))
    yield* _(game.saveAction(action))
  })
