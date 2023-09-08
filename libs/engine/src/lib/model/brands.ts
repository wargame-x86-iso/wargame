import * as B from 'effect/Brand'

export type PlayerId = string & B.Brand<'playerId'>

export const PlayerId = B.nominal<PlayerId>()

export type PlayerOrder = [PlayerId, PlayerId, ...Array<PlayerId>] &
  B.Brand<'playerOrder'>

export const PlayerOrder = B.nominal<PlayerOrder>()

export type UnitId = string & B.Brand<'unitId'>

export const UnitId = B.nominal<UnitId>()

export type Position = [number, number, number] & B.Brand<'position'>

export const Position = B.nominal<Position>()

export type Path = [Position, Position, ...Array<Position>] & B.Brand<'path'>

export const Path = B.nominal<Path>()

export const positionToString = ([x, y, z]: Position) => `${x},${y},${z}`

export const positionEq = (a: Position, b: Position) =>
  positionToString(a) === positionToString(b)
