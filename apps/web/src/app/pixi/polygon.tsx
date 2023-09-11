import { ColorSource, Graphics as PixiGraphics } from 'pixi.js'
import { Graphics } from '@pixi/react'
import { useCallback } from 'react'

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
