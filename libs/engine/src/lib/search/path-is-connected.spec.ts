import { Path, Position } from '../model'

import { pathIsConnected } from './path-is-connected'

describe('pathIsConnected', () => {
  it('returns true if path is connected', () => {
    expect(
      pathIsConnected(
        Path([
          Position([-1, 1, 0]),
          Position([0, 1, -1]),
          Position([1, 0, -1]),
          Position([1, -1, 0]),
          Position([0, -1, 1]),
          Position([-1, 0, 1]),
        ])
      )
    ).toEqual(true)
    expect(
      pathIsConnected(
        Path([
          Position([-1, 2, -1]),
          Position([-1, 1, 0]),
          Position([-1, 0, 1]),
          Position([0, 0, 0]),
          Position([1, 0, -1]),
          Position([2, -1, -1]),
        ])
      )
    ).toEqual(true)
  })
  it('returns false if path is not connected', () => {
    expect(
      pathIsConnected(
        Path([
          Position([-1, 1, 0]),
          Position([0, 1, -1]),
          Position([1, 0, -1]),
          Position([0, -1, 1]),
          Position([-1, 0, 1]),
        ])
      )
    ).toEqual(false)
    expect(
      pathIsConnected(
        Path([
          Position([-1, 1, 0]),
          Position([1, 0, -1]),
          Position([1, -1, 0]),
          Position([0, -1, 1]),
          Position([-1, 0, 1]),
        ])
      )
    ).toEqual(false)
  })
})
