import { useContext } from 'react'

import { Layer, HexGrid } from '../components'

import { EditorContext, MapTiles } from './context'

function chooseTileColor(tile: MapTiles) {
  switch (tile) {
    case MapTiles.empty:
      return '#c5c7a7'
    case MapTiles.water:
      return '#4a8df7'
    case MapTiles.road:
      return '#adada5'
    case MapTiles.forest:
      return '#4f6e23'
  }
}

export function EditorMap() {
  const ctx = useContext(EditorContext)
  return (
    <Layer zIndex={1}>
      <HexGrid
        width={ctx.width}
        height={ctx.height}
        strokeWeight={1}
        background='black'
        onClick={ctx.setTiles}
        render={{
          fill: (x, y) => chooseTileColor(ctx.lookupTile(x, y)),
          stroke: (x, y) => chooseTileColor(ctx.lookupTile(x, y)),
        }}
      />
    </Layer>
  )
}
