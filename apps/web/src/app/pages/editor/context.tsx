import * as R from 'effect/ReadonlyRecord'
import { createContext, useCallback, useState } from 'react'

import { AxialCoordinate, area, axialToString, box } from '@wargame/hex'
import { MapTiles } from '@wargame/map'

import { HexGridContextProvider } from '../../context'

export interface MapState {
  [key: string]: MapTiles
}

export interface EditorContext {
  brush: {
    size: number
    tile: MapTiles
    onTileChange: (v: MapTiles) => void
    onSizeChange: (v: number) => void
    onDrag: (v: AxialCoordinate) => void
  }
  map: {
    width: number
    height: number
    tiles: MapState
    onWidthChange: (v: number) => void
    onHeightChange: (v: number) => void
  }
}

export const EditorContext = createContext<EditorContext>({
  brush: {
    size: 1,
    tile: MapTiles.empty,
    onTileChange: () => {
      return
    },
    onSizeChange: () => {
      return
    },
    onDrag: () => {
      return
    },
  },
  map: {
    width: 0,
    height: 0,
    tiles: {},
    onWidthChange: () => {
      return
    },
    onHeightChange: () => {
      return
    },
  },
})

export interface EditorContextProviderProps {
  children: React.ReactNode
  initialWidth: number
  initialHeight: number
}

const makeMap = (hexes: AxialCoordinate[], tile: MapTiles) =>
  R.fromIterable((hex: AxialCoordinate) => {
    const key = axialToString(hex)
    return [key, tile]
  })(hexes)

export function EditorContextProvider(props: EditorContextProviderProps) {
  const [width, setWidth] = useState(props.initialWidth)
  const [height, setHeight] = useState(props.initialHeight)
  const hexes = box(width, height)
  const initialMap = makeMap(hexes, MapTiles.empty)
  const [map, setMap] = useState<MapState>(initialMap)
  const [brushSize, setBrushSize] = useState(3)
  const [selectedTileType, setSelectedTileType] = useState<MapTiles>(
    MapTiles.forest
  )
  const onBrushDrag = useCallback(
    (v: AxialCoordinate) => {
      const hexes = area(v, brushSize)
      const update = makeMap(hexes, selectedTileType)
      setMap((map) => ({
        ...map,
        ...update,
      }))
    },
    [brushSize, selectedTileType]
  )
  return (
    <EditorContext.Provider
      value={{
        brush: {
          size: brushSize,
          tile: selectedTileType,
          onTileChange: setSelectedTileType,
          onSizeChange: setBrushSize,
          onDrag: onBrushDrag,
        },
        map: {
          width,
          onWidthChange: setWidth,
          onHeightChange: setHeight,
          height,
          tiles: map,
        },
      }}
    >
      <HexGridContextProvider hexSize={24} hexes={hexes}>
        {props.children}
      </HexGridContextProvider>
    </EditorContext.Provider>
  )
}
