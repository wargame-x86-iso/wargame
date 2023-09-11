import { CartesianCoordiate, Orientation } from './model'

function calcTheta(angle: number) {
  return (angle * Math.PI) / 180
}

export const makePolygonConverter =
  (orientation: Orientation) =>
  ([cX, cY]: CartesianCoordiate, radius: number): CartesianCoordiate[] =>
    orientation.cornerAngles.map((angle) => {
      const theta = calcTheta(angle)
      const x = Math.floor(cX + radius * Math.cos(theta))
      const y = Math.floor(cY + radius * Math.sin(theta))
      return CartesianCoordiate([x, y])
    })
