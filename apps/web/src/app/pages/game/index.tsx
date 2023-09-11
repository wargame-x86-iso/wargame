/* eslint-disable eqeqeq */
import { useElementSize } from 'usehooks-ts'

import { HexGridContextProvider } from '../../context'
import { usePreventZoom } from '../../hooks'

import { GameBoard } from './board'
import { GameLayout } from './layout'

export function Game() {
  const [squareRef, { width, height }] = useElementSize()
  usePreventZoom()
  return (
    <HexGridContextProvider hexSize={48} width={36} height={24}>
      <GameLayout
        mapContainerRef={squareRef}
        map={<GameBoard width={width} height={height} />}
        header={<div>Game</div>}
        controls={<div>Controls</div>}
      />
    </HexGridContextProvider>
  )
}
