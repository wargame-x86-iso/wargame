/* eslint-disable eqeqeq */
import { useElementSize } from 'usehooks-ts'

import { box } from '@wargame/hex'

import { HexGridContextProvider } from '../../context'
import { usePreventZoom } from '../../hooks'

import { GameBoard } from './board'
import { GameLayout } from './layout'

export function Game() {
  const [squareRef, { width, height }] = useElementSize()
  usePreventZoom()
  const hexes = box(36, 24)
  return (
    <HexGridContextProvider hexSize={48} hexes={hexes}>
      <GameLayout
        mapContainerRef={squareRef}
        map={<GameBoard width={width} height={height} />}
        header={<div>Game</div>}
        controls={<div>Controls</div>}
      />
    </HexGridContextProvider>
  )
}
