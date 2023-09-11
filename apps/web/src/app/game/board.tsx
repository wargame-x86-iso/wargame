import { Graphics as PixiGraphics, TextStyle } from 'pixi.js'
import { Stage, Graphics, Container, Text } from '@pixi/react'
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

export interface GameBoardProps {
  width: number
  height: number
}

export function GameBoard(props: GameBoardProps) {
  const ctx = useContext(HexGridContext)
  const hexes = Object.values(ctx.grid).map((hex) => (
    <Polygon path={hex.polygonPath.flat()} />
  ))
  const labels = Object.keys(ctx.grid).map((key) => {
    const [x, y] = ctx.grid[key].center
    return (
      <Text
        text={key}
        x={x}
        y={y}
        style={
          new TextStyle({
            align: 'center',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 12,
          })
        }
      />
    )
  })
  return (
    <Stage
      width={props.width}
      height={props.height}
      options={{ backgroundColor: 0x1099bb }}
    >
      <PixiViewport
        width={props.width}
        height={props.height}
        worldHeight={1000}
        worldWidth={1000}
      >
        <Container>
          {hexes}
          {labels}
        </Container>
      </PixiViewport>
    </Stage>
  )
}
