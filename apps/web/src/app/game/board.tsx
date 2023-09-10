import { Graphics as PixiGraphics } from 'pixi.js'
import { Stage, Graphics, Container } from '@pixi/react'
import { useCallback } from 'react'

interface HexProps {
  x: number
  y: number
  z: number
  radius: number
  sideLength: number
}

// https://stackoverflow.com/questions/2459402/hexagonal-grid-coordinates-to-pixel-coordinates
// y = 3/2 * s * b
// b = 2/3 * y / s
// x = sqrt(3) * s * ( b/2 + r)
// x = - sqrt(3) * s * ( b/2 + g )
// r = (sqrt(3)/3 * x - y/3 ) / s
// g = -(sqrt(3)/3 * x + y/3 ) / s

// r + b + g = 0

const TAU = 2 * Math.PI

const radius = 64
const sideLength = radius / 2
const sqrt3 = Math.sqrt(3)
const hexagonRadius = radius
const hexagonHeight = hexagonRadius * Math.sqrt(3)

// function hexToCartesian(
//   r: number,
//   g: number,
//   b: number,
//   s: number
// ): [number, number] {
//   const y = (3 / 2) * s * b
//   const x = Math.sqrt(3) * s * (b / 2 + r)
//   return [x, y]
// }
function hex_to_pixel(q: number, r: number): [number, number] {
  let x: number
  let y: number
  const orientation = { name: 'flat-top' }
  const hexRadius = hexagonRadius
  const separationMultiplier = 1
  const hexGridOrigin = { x: 0, y: 0 }
  if (orientation.name === 'flat-top') {
    x = hexRadius * ((3 / 2) * q)
    y = hexRadius * ((sqrt3 / 2) * q + sqrt3 * r)
  }
  // else if (orientation.name === "pointy-top") {
  else {
    x = hexRadius * (sqrt3 * q + (sqrt3 / 2) * r)
    y = hexRadius * ((3 / 2) * r)
  }
  return [
    x * separationMultiplier + hexGridOrigin.x,
    y * separationMultiplier + hexGridOrigin.y,
  ]
}

function Hex(props: HexProps) {
  const [x, y] = hex_to_pixel(props.x, props.y, )
  const cX = x
  const cY = y
  console.log([props.x, props.y, props.z, props.sideLength], [x, y], [cX, cY])
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.beginFill(0xff0000)
        .drawPolygon([
          -hexagonRadius,
          0,
          -hexagonRadius / 2,
          hexagonHeight / 2,
          hexagonRadius / 2,
          hexagonHeight / 2,
          hexagonRadius,
          0,
          hexagonRadius / 2,
          -hexagonHeight / 2,
          -hexagonRadius / 2,
          -hexagonHeight / 2,
        ])
        .endFill()
    },
    [cX, cY, props.radius]
  )
  return <Graphics draw={draw} />
}

export function GameBoard() {
  return (
    <Stage>
      <Container>
        <Hex x={-1} y={1} z={0} radius={radius} sideLength={sideLength} />
        <Hex x={0} y={1} z={-1} radius={radius} sideLength={sideLength} />
        <Hex x={1} y={0} z={-1} radius={radius} sideLength={sideLength} />
        <Hex x={1} y={-1} z={0} radius={radius} sideLength={sideLength} />
        <Hex x={0} y={-1} z={1} radius={radius} sideLength={sideLength} />
        <Hex x={-1} y={0} z={1} radius={radius} sideLength={sideLength} />
      </Container>
    </Stage>
  )
}
