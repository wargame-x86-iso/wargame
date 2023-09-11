import { useElementSize } from 'usehooks-ts'

import { HexGridContextProvider } from '../hex-grid'

import { GameBoard } from './board'
import { GameLayout } from './layout'

export function Game() {
  const [squareRef, { width, height }] = useElementSize()
  return (
    <HexGridContextProvider hexSize={24} boardSize={10}>
      <GameLayout
        mapContainerRef={squareRef}
        map={<GameBoard width={width} height={height} />}
        header={<div>Game</div>}
        controls={<div>Controls</div>}
      />
    </HexGridContextProvider>
  )
}
