import * as B from 'effect/Brand'

export const PointyTopOrientation = {
  name: 'pointy-top',
  cornerAngles: [30, 90, 150, 210, 270, 330],
} as const

export const FlatTopOrientation = {
  name: 'flat-top',
  cornerAngles: [0, 60, 120, 180, 240, 300],
} as const

export type Orientation =
  | typeof PointyTopOrientation
  | typeof FlatTopOrientation

// X Y Coordinate
export type CartesianCoordiate = [number, number] &
  B.Brand<'CartesianCoordiate'>
export const CartesianCoordiate = B.nominal<CartesianCoordiate>()

export const cartesianToString = ([x, y]: CartesianCoordiate) => `${x},${y}`
export const stringToCartesian = (s: string) =>
  AxialCoordinate(s.split(',').map(Number) as [number, number])

// Q R Coordinate
export type AxialCoordinate = [number, number] & B.Brand<'AxialCoordinate'>
export const AxialCoordinate = B.nominal<AxialCoordinate>()

export const axialToString = ([q, r]: AxialCoordinate) => `${q},${r}`
export const stringToAxial = (s: string) =>
  AxialCoordinate(s.split(',').map(Number) as [number, number])

export const AxialDirections = {
  UP: AxialCoordinate([1, 0]),
  DOWN: AxialCoordinate([1, -1]),
  UPLEFT: AxialCoordinate([0, -1]),
  UPRIGHT: AxialCoordinate([-1, 0]),
  DOWNLEFT: AxialCoordinate([-1, 1]),
  DOWNRIGHT: AxialCoordinate([0, 1]),
} as const

export type AxialDirectionName = keyof typeof AxialDirections

export const AxialDirectionNames = [
  'UP',
  'DOWN',
  'UPLEFT',
  'UPRIGHT',
  'DOWNLEFT',
  'DOWNRIGHT',
] as const

export type Range = [number, number] & B.Brand<'Range'>
export const Range = B.nominal<Range>()
