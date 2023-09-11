import { useElementSize } from 'usehooks-ts'

import { usePreventZoom } from '../../hooks'

import { EditorContextProvider } from './context'
import { EditorControls } from './controls'
import { EditorLayout } from './layout'
import { EditorBoard } from './board'

export interface EditorProps {
  renderBackButton: (button: React.ReactNode) => React.ReactNode
}

export function Editor(props: EditorProps) {
  const [squareRef, { width, height }] = useElementSize()
  usePreventZoom()
  return (
    <EditorContextProvider initialHeight={19} initialWidth={29}>
      <EditorLayout
        mapContainerRef={squareRef}
        header={props.renderBackButton(<p>Back</p>)}
        controls={<EditorControls />}
        map={<EditorBoard width={width} height={height} />}
      />
    </EditorContextProvider>
  )
}
