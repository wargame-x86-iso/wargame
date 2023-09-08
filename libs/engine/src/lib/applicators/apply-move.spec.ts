import * as T from 'effect/Effect'
import * as EX from 'effect/Exit'
import { pipe } from '@effect/data/Function'

import { Path, PlayerId, PlayerOrder, Position, UnitId } from '../model'
import { InmemoryGame } from '../game.impl'

import { applyMoveAction } from './apply-move'

describe('applyMoveAction', () => {
  it('should fail if the unit is not at the specified starting position', async () => {
    const result = await pipe(
      applyMoveAction({
        type: 'move',
        unitId: UnitId('unit-1'),
        path: Path([Position([-1, 0, 1]), Position([0, 0, 0])]),
        playerId: PlayerId('player-1'),
      }),
      T.provideLayer(
        InmemoryGame(
          {
            terrainCosts: {},
            order: PlayerOrder([PlayerId('player-1'), PlayerId('player-2')]),
            units: {
              'unit-1': {
                id: UnitId('unit-1'),
                playerId: PlayerId('player-1'),
                movementRange: 5,
              },
            },
          },
          {
            currentTurn: {
              number: 0,
              playerId: PlayerId('player-1'),
              actions: [],
            },
            pastTurns: [],
            unitStates: {
              'unit-1': {
                id: UnitId('unit-1'),
                position: Position([1, 1, 1]),
                playerId: PlayerId('player-1'),
                actionPoints: 2,
                movementRange: 5,
              },
            },
          }
        )
      ),
      T.runPromiseExit
    )
    expect(result).toEqual(
      EX.fail(new Error('Unit is not at the specified starting position'))
    )
  })
  it('should fail if path is not connected', async () => {
    const result = await pipe(
      applyMoveAction({
        type: 'move',
        unitId: UnitId('unit-1'),
        path: Path([Position([-1, 0, 1]), Position([1, 1, 1])]),
        playerId: PlayerId('player-1'),
      }),
      T.provideLayer(
        InmemoryGame(
          {
            terrainCosts: {},
            order: PlayerOrder([PlayerId('player-1'), PlayerId('player-2')]),
            units: {
              'unit-1': {
                id: UnitId('unit-1'),
                playerId: PlayerId('player-1'),
                movementRange: 5,
              },
            },
          },
          {
            currentTurn: {
              number: 0,
              playerId: PlayerId('player-1'),
              actions: [],
            },
            pastTurns: [],
            unitStates: {
              'unit-1': {
                id: UnitId('unit-1'),
                position: Position([-1, 0, 1]),
                playerId: PlayerId('player-1'),
                actionPoints: 2,
                movementRange: 5,
              },
            },
          }
        )
      ),
      T.runPromiseExit
    )
    expect(result).toEqual(EX.fail(new Error('Path is not connected')))
  })
})
