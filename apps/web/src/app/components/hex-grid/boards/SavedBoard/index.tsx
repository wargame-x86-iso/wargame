import { useState } from 'react'

import { canvasGlobals, gameGlobals } from '../../helpers/hexDefinitions'
import ErrorBoundary from '../../components/ErrorBoundary'
import GameBoard from '../../components/HexBoardSVG'

import { hexOrientations } from '../../helpers/hexMath'
import CanvasControl from '../../forms/CanvasControl'
import BoardControl from '../../forms/BoardControl'
import { clickMessage } from '../../helpers/hexFunctions'

const fileData = {
  gameGlobals: {
    orientation: {
      name: 'flat-top',
      cornerAngles: [0, 60, 120, 180, 240, 300],
    },
    hexRadius: 200,
    separationMultiplier: 1.1,
    textSize: 12,
    drawBackBoard: false,
  },
  hexRoster: [
    { q: 0, r: 0, cssClasses: 'hover-space bg-white' },
    { q: 1, r: 0, cssClasses: 'hover-space bg-blue' },
    { q: 2, r: 0, cssClasses: 'hover-space bg-blue' },
    { q: -1, r: 0, cssClasses: 'hover-space bg-blue' },
    { q: 3, r: 0, cssClasses: 'hover-space bg-blue' },
    { q: 4, r: 0, cssClasses: 'hover-space bg-blue' },
    { q: 4, r: 1, cssClasses: 'hover-space bg-blue' },
    { q: 4, r: -1, cssClasses: 'hover-space bg-blue' },
    { q: 4, r: -2, cssClasses: 'hover-space bg-blue' },
    { q: 3, r: -1, cssClasses: 'hover-space bg-blue' },
    { q: 5, r: -3, cssClasses: 'hover-space bg-blue' },
    { q: 6, r: -4, cssClasses: 'hover-space bg-blue' },
    { q: 1, r: 1, cssClasses: 'hover-space bg-blue' },
    { q: 1, r: 2, cssClasses: 'hover-space bg-blue' },
    { q: 0, r: 3, cssClasses: 'hover-space bg-blue' },
    { q: -1, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: -2, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: -3, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: 0, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: 1, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: -5, r: 4, cssClasses: 'hover-space bg-blue' },
    { q: -5, r: 5, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 5, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 6, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 7, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 3, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 2, cssClasses: 'hover-space bg-blue' },
    { q: -3, r: 1, cssClasses: 'hover-space bg-blue' },
    { q: -3, r: 2, cssClasses: 'hover-space bg-blue' },
    { q: -5, r: 2, cssClasses: 'hover-space bg-blue' },
    { q: -2, r: 2, cssClasses: 'hover-space bg-blue' },
    { q: -2, r: 1, cssClasses: 'hover-space bg-blue' },
    { q: -2, r: 3, cssClasses: 'hover-space bg-blue' },
    { q: -5, r: 6, cssClasses: 'hover-space bg-blue' },
    { q: -5, r: 7, cssClasses: 'hover-space bg-blue' },
    { q: -6, r: 8, cssClasses: 'hover-space bg-green' },
    { q: -6, r: 9, cssClasses: 'hover-space bg-green' },
    { q: -5, r: 8, cssClasses: 'hover-space bg-blue' },
    { q: -7, r: 8, cssClasses: 'hover-space bg-blue' },
    { q: -7, r: 7, cssClasses: 'hover-space bg-green' },
    { q: -7, r: 9, cssClasses: 'hover-space bg-blue' },
    { q: -5, r: 9, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 9, cssClasses: 'hover-space bg-blue' },
    { q: -8, r: 9, cssClasses: 'hover-space bg-blue' },
    { q: -6, r: 7, cssClasses: 'hover-space bg-blue' },
    { q: -6, r: 10, cssClasses: 'hover-space bg-blue' },
    { q: -7, r: 10, cssClasses: 'hover-space bg-blue' },
    { q: -7, r: 11, cssClasses: 'hover-space bg-blue' },
    { q: -4, r: 8, cssClasses: 'hover-space bg-blue' },
    { q: -3, r: 7, cssClasses: 'hover-space bg-blue' },
  ],
}

export default function SavedBoard(props: any) {
  // <> States that control canvas parameters
  const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
  const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
  const [hexRadius, SEThexRadius] = useState(200)
  const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
  const [hexGridOrigin, SEThexGridOrigin] = useState({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  })
  const [orientation, SETorientation] = useState(hexOrientations['flat-top'])
  function toggleOrientation(): void {
    if (orientation === hexOrientations['flat-top']) {
      SETorientation(hexOrientations['pointy-top'])
    } else {
      SETorientation(hexOrientations['flat-top'])
    }
  }

  const hexRoster = fileData.hexRoster
  // const canvasGlobals = fileData.canvasGlobals;

  const gameGlobals: gameGlobals = {
    // Hexagons
    orientation: orientation,
    hexRadius: hexRadius,
    separationMultiplier: separationMultiplier,
    textSize: 12,
    drawBackBoard: true,
    onClick: clickMessage,
  }

  const canvasGlobals: canvasGlobals = {
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    hexGridOrigin: hexGridOrigin,
    canvasBackgroundColor: '#000',
  }

  return (
    <div className='row' id='savedBoardContainer'>
      <div id='displayBoard' className='col-md-10'>
        <ErrorBoundary>
          <GameBoard
            hexRoster={hexRoster}
            gameGlobals={gameGlobals}
            canvasGlobals={canvasGlobals}
            //   logo={logo}
          />
        </ErrorBoundary>
      </div>
      {/* <div id="rosterDisplay" className="">
				<RosterDisplay hexRoster={hexRoster} />
			</div> */}
      <div id='sideBar' className='col-md-2'>
        <BoardControl
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier}
        />
        <CanvasControl
          canvasWidth={canvasWidth}
          SETcanvasWidth={SETcanvasWidth}
          canvasHeight={canvasHeight}
          SETcanvasHeight={SETcanvasHeight}
          hexGridOrigin={hexGridOrigin}
          SEThexGridOrigin={SEThexGridOrigin}
        />
      </div>
    </div>
  )
}
