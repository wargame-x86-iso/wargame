import * as R from 'effect/ReadonlyRecord'
import { createNoise2D } from 'simplex-noise'

import {
  AxialCoordinate,
  axialToString,
  stringToAxial,
  CartesianCoordiate,
  makeCartesianConversion,
  PointyTopOrientation,
  neighbors,
} from '@wargame/hex'
import { MapTiles } from './map'

export function makeNoiseMap(seedFn: () => number = Math.random) {
  const convertToCartesian = makeCartesianConversion(
    PointyTopOrientation,
    2000,
    1,
    CartesianCoordiate([0, 0])
  )
  
  const noise = createNoise2D(seedFn)
  const makeNoiseMap = R.fromIterable((hex: AxialCoordinate) => {
    const [x, y] = convertToCartesian(hex)
    const value = Math.round(noise(x, y) * 100) / 100
    return [axialToString(hex), value]
  })
  return makeNoiseMap
}

export function noisyElevationMap(
  hexes: AxialCoordinate[],
  treeGenerations = 2,
  seedFn: () => number = Math.random
) {
  const mapNoise = makeNoiseMap(seedFn)
  const noise = mapNoise(hexes)
  let trees = R.map(noise, (value) =>
    value > 0.25 && value < 0.4 ? true : false
  )
  for (let i = 0; i < treeGenerations; i++) {
    trees = gameOfLife(trees)
  }
  return R.map(noise, (value, key) => {
    if (trees[key]) {
      return MapTiles.forest
    } else {
      if (value < -0.3) {
        return MapTiles.water
      } else {
        if (value > 0.6) return MapTiles.mountain
      }
      return MapTiles.empty
    }
  })
}

export function gameOfLife(state: R.ReadonlyRecord<boolean>) {
  return R.map(state, (_, key) => {
    const n = neighbors(stringToAxial(key))
      .map((neighbor) => (state[axialToString(neighbor)] ? 1 : 0))
      .reduce((a: number, b) => a + b, 0)
    return n > 3 || n < 2 ? false : true
  })
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const voronoi = require('voronoi-diagram')

export function voronoiPartitions(hexes: AxialCoordinate[]) {
  const convertToCartesian = makeCartesianConversion(
    PointyTopOrientation,
    10,
    1,
    CartesianCoordiate([0, 0])
  )
  
  const points = hexes.map((hex) => convertToCartesian(hex))
  console.log(points)
  const voronoiDiagram = voronoi([])
  return voronoiDiagram
  // return R.fromIterable((hex: AxialCoordinate) => {
  //   const [x, y] = convertToCartesian(hex)
  //   const value = Math.round(noise(x, y) * 100) / 100
  //   return [axialToString(hex), value]
  // })
}
