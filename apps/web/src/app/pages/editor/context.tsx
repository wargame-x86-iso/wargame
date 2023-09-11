import { createContext, useState } from 'react'
import { with2DRange } from '../../utils'

export const MapTiles = {
  empty: 0,
  water: 1,
  road: 2,
  forest: 3,
} as const

export type MapTiles = (typeof MapTiles)[keyof typeof MapTiles]

export interface MapState {
  [key: string]: MapTiles
}

export interface EditorContext {
  lookupTile: (x: number, y: number) => MapTiles
  setTiles: (x: number, y: number) => void
  brushSize: number
  setBrushSize: (size: number) => void
  width: number
  setWidth: (width: number) => void
  height: number
  setHeight: (height: number) => void
  selectedTileType: MapTiles
  setSelectedTileType: (tile: MapTiles) => void
}

export const EditorContext = createContext<EditorContext>({
  lookupTile: () => MapTiles.empty,
  setTiles: () => {
    return
  },
  brushSize: 1,
  setBrushSize: () => {
    return
  },
  width: 0,
  setWidth: () => {
    return
  },
  height: 0,
  setHeight: () => {
    return
  },
  selectedTileType: MapTiles.empty,
  setSelectedTileType: () => {
    return
  },
})

export interface EditorContextProviderProps {
  children: React.ReactNode
  initialWidth: number
  initialHeight: number
}

export function EditorContextProvider(props: EditorContextProviderProps) {
  const [map, setMap] = useState<MapState>({})
  const [width, setWidth] = useState(props.initialWidth)
  const [height, setHeight] = useState(props.initialHeight)
  const [brushSize, setBrushSize] = useState(1)
  const [selectedTileType, setSelectedTileType] = useState<MapTiles>(
    MapTiles.empty
  )
  const lookupTile = (x: number, y: number) =>
    map[`${x},${y}`] || MapTiles.empty
  const setTiles = (x: number, y: number) => {
    setMap(
      with2DRange(brushSize, brushSize, (dx, dy) => [dx, dy] as const).reduce(
        (acc, [dx, dy]) => ({
          ...acc,
          [`${x + dx},${y + dy}`]: selectedTileType,
        }),
        map
      )
    )
  }
  return (
    <EditorContext.Provider
      value={{
        lookupTile,
        setTiles,
        brushSize,
        setBrushSize,
        width,
        setWidth,
        height,
        setHeight,
        selectedTileType,
        setSelectedTileType,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  )
}
