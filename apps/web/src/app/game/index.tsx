import { HexGridContextProvider } from '../hex-grid'

import { GameBoard } from './board'
import { GameLayout } from './layout'

export function Game() {
  return (
    <HexGridContextProvider hexSize={24} boardSize={10}>
      <GameLayout
        map={<GameBoard />}
        header={<div>Game</div>}
        controls={<div>Controls</div>}
      />
    </HexGridContextProvider>
  )
}
