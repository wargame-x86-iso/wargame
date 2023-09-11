import {
  CartesianCoordiate,
  AxialDirectionName,
  AxialDirectionNames,
  Orientation,
  AxialCoordinate,
  AxialDirections,
} from './model'

export function neighbor(
  [cQ, cR]: AxialCoordinate,
  direction: AxialDirectionName
): AxialCoordinate {
  const [dQ, dR] = AxialDirections[direction]
  return AxialCoordinate([cQ + dQ, cR + dR])
}

export function add(
  [q1, r1]: AxialCoordinate,
  [q2, r2]: AxialCoordinate
): AxialCoordinate {
  return AxialCoordinate([q1 + q2, r1 + r2])
}

export function scale(
  [q, r]: AxialCoordinate,
  factor: number
): AxialCoordinate {
  return AxialCoordinate([q * factor, r * factor])
}

export function invert([q, r]: AxialCoordinate) {
  return AxialCoordinate([-q, -r])
}

export function sCoordinate([q, r]: AxialCoordinate) {
  return -q - r
}

export function perimeter(
  center: AxialCoordinate,
  radius: number
): AxialCoordinate[] {
  const results: AxialCoordinate[] = []
  let current: AxialCoordinate = add(
    center,
    scale(AxialDirections['DOWNLEFT'], radius)
  )
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      const direction = AxialDirectionNames[i]
      results.push(current)
      current = neighbor(current, direction)
    }
  }
  return results
}

export function area(
  center: AxialCoordinate,
  radius: number
): AxialCoordinate[] {
  const results: AxialCoordinate[] = [center]
  for (let i = 1; i < radius; i++) {
    const ring = perimeter(center, i)
    results.push(...ring)
  }
  return results
}

export function makeCartesianConversion(
  orientation: Orientation,
  hexRadius: number,
  separationMultiplier: number,
  cartesianOrigin: CartesianCoordiate
): (v: AxialCoordinate) => CartesianCoordiate {
  const [oX, oY] = cartesianOrigin
  if (orientation.name === 'flat-top') {
    return ([q, r]) =>
      CartesianCoordiate([
        hexRadius * ((3 / 2) * q) * separationMultiplier + oX,
        hexRadius *
          ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r) *
          separationMultiplier +
          oY,
      ])
  } else if (orientation.name === 'pointy-top') {
    return ([q, r]) =>
      CartesianCoordiate([
        hexRadius *
          (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r) *
          separationMultiplier +
          oX,
        hexRadius * ((3 / 2) * r) * separationMultiplier + oY,
      ])
  } else {
    throw new Error('Invalid orientation')
  }
}

type Range = [number, number]
const Range = (range: Range) => range

function rangeDistance([max, min]: Range) {
  return max - min
}

export function boundingBox(
  coordinates: AxialCoordinate[],
  toCartesian: (v: AxialCoordinate) => CartesianCoordiate
): CartesianCoordiate {
  // Find the min and max values for q and r.  Convert those to rectangular coordinates.
  let maxRadius = 0
  coordinates.forEach((coordinate) => {
    const [q, r] = coordinate
    const s = sCoordinate(coordinate)
    if (Math.abs(q) > maxRadius) {
      maxRadius = q
    }
    if (Math.abs(r) > maxRadius) {
      maxRadius = r
    }
    if (Math.abs(s) > maxRadius) {
      maxRadius = s
    }
  })
  maxRadius++
  const cornerPoints = Object.values(AxialDirections).map((d) =>
    toCartesian(scale(d, maxRadius))
  )
  // Now that we know all the corners of the enclosing hexagon, we enclose that in a rectangle by finding the min and max for x and y
  let xRange = Range([0, 0])
  let yRange = Range([0, 0])
  cornerPoints.forEach(([x, y]) => {
    const [xMin, xMax] = xRange
    const [yMin, yMax] = yRange
    if (x < xMin) {
      xRange = Range([x, xMax])
    }
    if (x > xMax) {
      xRange = Range([xMin, x])
    }
    if (y < yMin) {
      yRange = Range([y, yMax])
    }
    if (y > yMax) {
      yRange = Range([yMin, y])
    }
  })

  const width = rangeDistance(xRange)
  const height = rangeDistance(yRange)
  return CartesianCoordiate([width, height])
}
