import { ColorSource, Graphics as PixiGraphics, TextStyle } from 'pixi.js'
import { Stage, Sprite, Graphics, Container, Text } from '@pixi/react'
import { useCallback, useContext, useState } from 'react'

import {
  AxialCoordinate,
  CartesianCoordiate,
  axialToString,
} from '@wargame/hex'

import { HexGridContext } from '../../context'
import { PixiViewport } from '../../components'

export interface PolygonProps {
  path: number[]
  fill: [ColorSource | undefined, number | undefined]
  line: [number, ColorSource | undefined, number | undefined]
}

export function Polygon(props: PolygonProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear()
        .beginFill(...props.fill)
        .lineStyle(...props.line)
        .drawPolygon(props.path)
        .endFill()
    },
    [props.path, props.fill, props.line]
  )
  return <Graphics draw={draw} />
}

export interface GameBoardProps {
  width: number
  height: number
}

export function GameBoard(props: GameBoardProps) {
  const ctx = useContext(HexGridContext)
  const [selected, setSelected] = useState<AxialCoordinate | null>(null)
  const onMapClick = useCallback(
    (x: number, y: number) => {
      setSelected(ctx.convertToAxial(CartesianCoordiate([x, y])))
    },
    [ctx, setSelected]
  )
  const hexes = Object.keys(ctx.grid).map((key) => (
    <Polygon
      key={key}
      path={ctx.grid[key].polygonPath.flat()}
      fill={['#af0', 1]}
      line={[1, '#666', 0.2]}
    />
  ))
  const labels = Object.keys(ctx.grid).map((key) => {
    const [x, y] = ctx.grid[key].center
    return (
      <Text
        key={key}
        text={`Hex: ${key}\nXY: ${x},${y}`}
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
      options={{ backgroundColor: 0xaaeeff }}
    >
      <PixiViewport
        width={props.width}
        height={props.height}
        worldWidth={ctx.width}
        worldHeight={ctx.height}
        onClick={onMapClick}
      >
        <Container>
          {hexes}
          {labels}
          {selected && (
            <Polygon
              path={ctx.grid[axialToString(selected)].polygonPath.flat()}
              fill={['#f00', 0.1]}
              line={[1, '#f00', 0.2]}
            />
          )}
        </Container>
      </PixiViewport>
    </Stage>
  )
}
