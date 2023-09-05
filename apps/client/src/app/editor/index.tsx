import { useCallback, useState } from 'react'

import { Scroll, Layer, HexGrid } from '../components'

import { EditorControls } from './controls'
import { EditorLayout } from './layout'

export interface EditorProps {
  renderBackButton: (button: React.ReactNode) => React.ReactNode
}

export function Editor(props: EditorProps) {
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const fillSelected = useCallback(
    (x: number, y: number) => {
      if (!selected) return 'transparent'
      const [selectedX, selectedY] = selected
      if (x === selectedX && y === selectedY) return '#99333344'
      return 'transparent'
    },
    [selected]
  )
  return (
    <EditorLayout
      header={props.renderBackButton(<p>Back</p>)}
      controls={<EditorControls />}
      map={
        <Scroll.Wrapper>
          <Scroll.Inner>
            <Layer zIndex={1}>
              <HexGrid
                width={59}
                height={39}
                strokeWeight={1}
                background='black'
                render={{
                  fill: () => '#73a465',
                  stroke: () => '#034405',
                }}
              />
            </Layer>
            <Layer zIndex={2}>
              <HexGrid
                width={59}
                height={39}
                onClick={(x, y) => setSelected([x, y])}
                strokeWeight={1}
                background='black'
                render={{
                  fill: fillSelected,
                }}
              />
            </Layer>
          </Scroll.Inner>
        </Scroll.Wrapper>
      }
    />
  )
}
