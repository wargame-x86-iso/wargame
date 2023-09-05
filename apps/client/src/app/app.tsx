import { Route, Routes, Link } from 'react-router-dom'

import { Editor } from './editor'

export function App() {
  return (
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
          <Editor renderBackButton={(button) => <Link to='/'>{button}</Link>} />
        }
      />
    </Routes>
  )
}

export default App
