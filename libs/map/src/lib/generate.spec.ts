import { box } from '@wargame/hex'

import { gameOfLife, voronoiPartitions } from './generate'

describe('voronoiPartitions', () => {
  it('should work', () => {
    const map = box(3, 3)
    expect(voronoiPartitions(map)).toEqual({})
  })
})

describe('gameOfLife', () => {
  it('should work', () => {
    expect(
      gameOfLife({
        '-1,1': true,
        '-1,2': false,
        '-1,3': false,
        '0,0': false,
        '0,1': true,
        '0,2': true,
        '0,3': true,
        '1,0': false,
        '1,1': false,
        '1,2': true,
        '1,3': false,
        '2,0': false,
        '2,1': false,
      })
    ).toEqual({
      '-1,1': false,
      '-1,2': true,
      '-1,3': true,
      '0,0': true,
      '0,1': true,
      '0,2': true,
      '0,3': true,
      '1,0': false,
      '1,1': true,
      '1,2': true,
      '1,3': true,
      '2,0': false,
      '2,1': false,
    })
  })
})
