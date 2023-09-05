import { Route, Routes, Link } from 'react-router-dom'
import { useWindowSize } from '@uidotdev/usehooks'

import { Editor } from './editor'

export function App() {
  const size = useWindowSize()
  return (
    <div
      style={{
        width: size.width || 'unset',
        height: size.height || 'unset',
        overflow: 'hidden',
      }}
    >
      <Routes>
        <Route
          path='/'
          element={
            <div>
              This is the generated root route. <Link to='/editor'>Editor</Link>
            </div>
          }
        />
        <Route
          path='/editor'
          element={
            <Editor
              renderBackButton={(button) => <Link to='/'>{button}</Link>}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
