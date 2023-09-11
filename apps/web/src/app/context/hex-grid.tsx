import * as R from 'effect/ReadonlyRecord'
import React, { createContext } from 'react'

import {
  AxialCoordinate,
  CartesianCoordiate,
  PointyTopOrientation,
  axialToString,
  makeCartesianConversion,
  makeAxialConversion,
  boundingBox,
  makePolygonConverter,
  box,
} from '@wargame/hex'

export interface HexGridContext {
  grid: {
    [key: string]: {
      center: CartesianCoordiate
      polygonPath: CartesianCoordiate[]
    }
  }
  width: number
  height: number
  convertToAxial: (c: CartesianCoordiate) => AxialCoordinate
}

export const HexGridContext = createContext<HexGridContext>({
  grid: {},
  width: 0,
  height: 0,
  convertToAxial: () => AxialCoordinate([0, 0]),
})

export interface HexGridContextProviderProps {
  children: React.ReactNode
  hexSize: number
  width: number
  height: number
}

const orientation = PointyTopOrientation

export function HexGridContextProvider(props: HexGridContextProviderProps) {
  const convertToCartesian = makeCartesianConversion(
    orientation,
    props.hexSize,
    1.04,
    CartesianCoordiate([props.hexSize * 3, props.hexSize * 2])
  )
  const convertToAxial = makeAxialConversion(
    orientation,
    props.hexSize,
    1.04,
    CartesianCoordiate([props.hexSize * 3, props.hexSize * 2])
  )
  const getPolygonPath = makePolygonConverter(orientation)
  const hexes = box(props.width, props.height)
  const makeHexGridTable = R.fromIterable((hex: AxialCoordinate) => {
    const key = axialToString(hex)
    const center = convertToCartesian(hex)
    const polygonPath = getPolygonPath(center, props.hexSize)
    return [key, { center, polygonPath }]
  })
  const [width, height] = boundingBox(hexes, convertToCartesian)
  return (
    <HexGridContext.Provider
      value={{
        grid: makeHexGridTable(hexes),
        width: width + 3 * props.hexSize,
        height: height + 2 * props.hexSize,
        convertToAxial,
      }}
    >
      {props.children}
    </HexGridContext.Provider>
  )
}
