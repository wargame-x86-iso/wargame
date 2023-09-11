import { Stage, Container } from '@pixi/react'
import { useCallback, useContext, useEffect } from 'react'

import { CartesianCoordiate } from '@wargame/hex'

import { HexGridContext } from '../../context'
import { Viewport, Tile } from '../../components'

import { EditorContext } from './context'

export interface EditorBoardProps {
  width: number
  height: number
}

const subscribers = new Set<(x: number, y: number) => void>()

function Hub() {
  const subscribe = (fn: (x: number, y: number) => void): (() => void) => {
    subscribers.add(fn)
    return () => subscribers.delete(fn)
  }
  const publish = (x: number, y: number) => {
    subscribers.forEach((fn) => fn(x, y))
  }
  return { subscribe, publish }
}

export function EditorBoard(props: EditorBoardProps) {
  const editor = useContext(EditorContext)
  const hex = useContext(HexGridContext)
  const hub = Hub()
  useEffect(() => {
    const unsubscribe = hub.subscribe((x, y) => {
      const tile = hex.convertToAxial(CartesianCoordiate([x, y]))
      editor.brush.onDrag(tile)
    })
    return unsubscribe
  }, [hub, hex, editor.brush])
  return (
    <Stage
      width={props.width}
      height={props.height}
      options={{ backgroundColor: 0x666666 }}
    >
      <Viewport
        width={props.width}
        height={props.height}
        worldWidth={hex.width}
        worldHeight={hex.height}
        onClick={hub.publish}
        zoom={{
          min: 0.125,
          max: 0.5,
        }}
      >
        <Container>
          {Object.keys(hex.grid).map((key) => (
            <Tile
              key={key}
              path={hex.grid[key].polygonPath.flat()}
              type={editor.map.tiles[key]}
            />
          ))}
        </Container>
      </Viewport>
    </Stage>
  )
}
