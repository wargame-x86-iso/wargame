import * as R from 'effect/ReadonlyRecord'
import React, { createContext } from 'react'

import {
  AxialCoordinate,
  CartesianCoordiate,
  PointyTopOrientation,
  axialToString,
  makeCartesianConversion,
  area,
  makePolygonConverter,
} from '@wargame/hex'

export interface HexGridContext {
  grid: {
    [key: string]: {
      center: CartesianCoordiate
      polygonPath: CartesianCoordiate[]
    }
  }
}

export const HexGridContext = createContext<HexGridContext>({
  grid: {},
})

export interface HexGridContextProviderProps {
  children: React.ReactNode
  hexSize: number
  boardSize: number
}

const orientation = PointyTopOrientation

export function HexGridContextProvider(props: HexGridContextProviderProps) {
  const convertToCartesian = makeCartesianConversion(
    orientation,
    props.hexSize,
    1.1,
    CartesianCoordiate([200, 200])
  )
  const getPolygonPath = makePolygonConverter(orientation)
  const hexes = area(AxialCoordinate([0, 0]), props.boardSize)
  const makeHexGridTable = R.fromIterable((hex: AxialCoordinate) => {
    const key = axialToString(hex)
    const center = convertToCartesian(hex)
    const polygonPath = getPolygonPath(center, props.hexSize)
    return [key, { center, polygonPath }]
  })
  return (
    <HexGridContext.Provider value={{ grid: makeHexGridTable(hexes) }}>
      {props.children}
    </HexGridContext.Provider>
  )
}
