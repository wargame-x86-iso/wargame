import { Scroll } from '../components'

import { EditorContextProvider } from './context'
import { EditorControls } from './controls'
import { EditorLayout } from './layout'
import { EditorMap } from './map'

export interface EditorProps {
  renderBackButton: (button: React.ReactNode) => React.ReactNode
}

export function Editor(props: EditorProps) {
  return (
    <EditorContextProvider initialHeight={29} initialWidth={49}>
      <EditorLayout
        header={props.renderBackButton(<p>Back</p>)}
        controls={<EditorControls />}
        map={
          <Scroll.Wrapper>
            <Scroll.Inner>
              <EditorMap />
            </Scroll.Inner>
          </Scroll.Wrapper>
        }
      />
    </EditorContextProvider>
  )
}
