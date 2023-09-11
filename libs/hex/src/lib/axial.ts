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

export function box(width: number, height: number): AxialCoordinate[] {
  const results: AxialCoordinate[] = []
  let offset = 0
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      results.push(AxialCoordinate([w - offset, h]))
      results.push(AxialCoordinate([w - offset, h + 1]))
    }
    if (h % 2 === 0) {
      offset++
    }
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
        Math.round(hexRadius * ((3 / 2) * q) * separationMultiplier + oX),
        Math.round(
          hexRadius *
            ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r) *
            separationMultiplier +
            oY
        ),
      ])
  } else if (orientation.name === 'pointy-top') {
    return ([q, r]) =>
      CartesianCoordiate([
        Math.round(
          hexRadius *
            (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r) *
            separationMultiplier +
            oX
        ),
        Math.round(hexRadius * ((3 / 2) * r) * separationMultiplier + oY),
      ])
  } else {
    throw new Error('Invalid orientation')
  }
}

export function makeAxialConversion(
  orientation: Orientation,
  hexRadius: number,
  separationMultiplier: number,
  cartesianOrigin: CartesianCoordiate
): (c: CartesianCoordiate) => AxialCoordinate {
  const [oX, oY] = cartesianOrigin
  if (orientation.name === 'flat-top') {
    return ([x, y]) =>
      AxialCoordinate([
        Math.round(((2 / 3) * (x - oX)) / (hexRadius * separationMultiplier)),
        Math.round(
          (-1 / 3) * (x - oX) +
            ((Math.sqrt(3) / 3) * (y - oY)) / (hexRadius * separationMultiplier)
        ),
      ])
  } else if (orientation.name === 'pointy-top') {
    return ([x, y]) =>
      AxialCoordinate([
        Math.round(
          ((Math.sqrt(3) / 3) * (x - oX)) / (hexRadius * separationMultiplier) -
            ((1 / 3) * (y - oY)) / (hexRadius * separationMultiplier)
        ),
        Math.round(((2 / 3) * (y - oY)) / (hexRadius * separationMultiplier)),
      ])
  } else {
    throw new Error('Invalid orientation')
  }
}

export function boundingBox(
  coordinates: AxialCoordinate[],
  toCartesian: (v: AxialCoordinate) => CartesianCoordiate
): CartesianCoordiate {
  return coordinates.reduce(
    ([xMax, yMax]: CartesianCoordiate, coordinate: AxialCoordinate) => {
      const [x, y] = toCartesian(coordinate)
      return CartesianCoordiate([Math.max(x, xMax), Math.max(y, yMax)])
    },
    CartesianCoordiate([0, 0])
  )
}
