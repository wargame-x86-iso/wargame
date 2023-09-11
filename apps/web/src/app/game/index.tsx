/* eslint-disable eqeqeq */
import { useEffect } from 'react'
import { useElementSize } from 'usehooks-ts'

import { HexGridContextProvider } from '../hex-grid'

import { GameBoard } from './board'
import { GameLayout } from './layout'

function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
  useEffect(() => {
    const handleKeydown = (e: any) => {
      if (
        keyboardCheck &&
        e.ctrlKey &&
        (e.keyCode == '61' ||
          e.keyCode == '107' ||
          e.keyCode == '173' ||
          e.keyCode == '109' ||
          e.keyCode == '187' ||
          e.keyCode == '189')
      ) {
        e.preventDefault()
      }
    }

    const handleWheel = (e: any) => {
      if (scrollCheck && e.ctrlKey) {
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('wheel', handleWheel)
    }
  }, [scrollCheck, keyboardCheck])
}

export function Game() {
  const [squareRef, { width, height }] = useElementSize()
  usePreventZoom()
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
