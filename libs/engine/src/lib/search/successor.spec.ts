import { Position } from '../model'
import { getSuccessors } from './successor'

describe('getSuccessors', () => {
  it('returns adjacent positions', () => {
    expect(getSuccessors(Position([0, 0, 0]))).toEqual([
      [-1, 1, 0],
      [0, 1, -1],
      [1, 0, -1],
      [1, -1, 0],
      [0, -1, 1],
      [-1, 0, 1],
    ])
  })
})
