import { GameBoard } from './board'
import { GameLayout } from './layout'

export function Game() {
  return (
    <GameLayout
      map={<GameBoard />}
      header={<div>Game</div>}
      controls={<div>Controls</div>}
    />
  )
}
