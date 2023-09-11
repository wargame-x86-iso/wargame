import { Graphics as PixiGraphics } from 'pixi.js'
import { Stage, Graphics, Container } from '@pixi/react'
import { useCallback, useContext } from 'react'

import { HexGridContext } from '../hex-grid'
import { PixiViewport } from '../components'

export interface PolygonProps {
  path: number[]
}

export function Polygon(props: PolygonProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.beginFill('#ae5').drawPolygon(props.path).endFill()
    },
    [props.path]
  )
  return <Graphics draw={draw} />
}

export function GameBoard() {
  const ctx = useContext(HexGridContext)
  const hexes = Object.values(ctx.grid).map((hex) => (
    <Polygon path={hex.polygonPath.flat()} />
  ))
  return (
    <Stage
      width={1000}
      height={1000}
      options={{ backgroundColor: 0x1099bb }}
    >
      <PixiViewport width={1000} height={1000}>
        <Container>{hexes}</Container>
      </PixiViewport>
    </Stage>
  )
}
