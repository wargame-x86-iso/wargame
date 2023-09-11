import { MapTiles } from '@wargame/roster'

import { Polygon } from '../components'

function chooseTileColor(type: MapTiles) {
  switch (type) {
    case 'empty':
      return '#c5c7a7'
    case 'forest':
      return '#4f6e23'
    case 'road':
      return '#adada5'
    case 'water':
      return '#4a8df7'
  }
}

export interface TileProps {
  type: MapTiles
  path: number[]
}

export function Tile(props: TileProps) {
  const color = chooseTileColor(props.type)
  return <Polygon path={props.path} fill={[color, 1]} line={[1, '#666', 0.2]} />
}
