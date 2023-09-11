import { Route, Routes, Link } from 'react-router-dom'
import { useWindowSize } from 'usehooks-ts'

import { Armory, Editor, Game } from './pages'

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
              <Link to='/armory'>Armory</Link>
              <br />
              <Link to='/editor'>Map Editor</Link>
              <br />
              <Link to='/game'>Game</Link>
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
        <Route path='/armory' element={<Armory />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </div>
  )
}

export default App
