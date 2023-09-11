import React from 'react'
import * as PIXI from 'pixi.js'
import { PixiComponent, useApp } from '@pixi/react'
import { Viewport as _Viewport } from 'pixi-viewport'

export interface PixiViewportProps {
  width: number
  height: number
  worldWidth: number
  worldHeight: number
  onClick?: (x: number, y: number) => void
  children?: React.ReactNode
}

interface PixiComponentViewportProps extends PixiViewportProps {
  app: PIXI.Application
}

const PixiComponentViewport = PixiComponent('Viewport', {
  create: (props: PixiComponentViewportProps) => {
    const events = new PIXI.EventSystem(props.app.renderer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events.domElement = props.app.renderer.view as any

    const viewport = new _Viewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.worldWidth * 2,
      worldHeight: props.worldHeight * 2,
      ticker: props.app.ticker,
      events,
    })

    viewport.on('clicked', (e) => {
      if (typeof props.onClick === 'function') {
        props.onClick(e.world.x, e.world.y)
      }
    })

    viewport
      .mouseEdges({
        allowButtons: true,
      })
      .drag({
        // direction: 'all',                // (x, y, or all) direction to drag
        // pressDrag: true,                 // whether click to drag is active
        // wheel: true,                     // use wheel to scroll in direction (unless wheel plugin is active)
        // wheelScroll: 1,                  // number of pixels to scroll with each wheel spin
        // reverse: false,                  // reverse the direction of the wheel scroll
        // clampWheel: false,               // clamp wheel (to avoid weird bounce with mouse wheel)
        // underflow: 'center',             // (top-left, top-center, etc.) where to place world if too small for screen
        // factor: 1,                       // factor to multiply drag to increase the speed of movement
        // mouseButtons: 'all',             // changes which mouse buttons trigger drag, use: 'all', 'left', right' 'middle', or some combination, like, 'middle-right'; you may want to set viewport.options.disableOnContextMenu if you want to use right-click dragging
        // keyToPress: ['ShiftLeft', 'ShiftRight'], // array containing https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code codes of keys that can be pressed for the drag to be triggered, e.g.: ['ShiftLeft', 'ShiftRight'}
        // ignoreKeyToPressOnTouch: false,  // ignore keyToPress for touch events
        // lineHeight: 20,                  // scaling factor for non-DOM_DELTA_PIXEL scrolling events (used for firefox mouse scrolling)
      })
      .decelerate({
        // friction: 0.95,              // percent to decelerate after movement
        // bounce: 0.8,                 // percent to decelerate when past boundaries (only applicable when viewport.bounce() is active)
        // minSpeed: 0.01,              // minimum velocity before stopping/reversing acceleration
      })
      // .pinch({
      //   // noDrag: false,               // disable two-finger dragging
      //   // percent: 1,                  // percent to modify pinch speed
      //   // factor: 1,                   // factor to multiply two-finger drag to increase the speed of movement
      //   // center: null,                // place this point at center during zoom instead of center of two fingers
      //   // axis: 'all',                 // axis to zoom
      // })
      .wheel({
        // percent: 0.1,                // smooth the zooming by providing the number of frames to zoom between wheel spins
        // interrupt: true,             // stop smoothing with any user input on the viewport
        // reverse: false,              // reverse the direction of the scroll
        // center: null,                // place this point at center during zoom instead of current mouse position
        // lineHeight: 20,	            // scaling factor for non-DOM_DELTA_PIXEL scrolling events
        // axis: 'all',                 // axis to zoom
      })
      .clampZoom({
        maxScale: 1,
        minScale: 0.25,
      })

    // .clamp()

    viewport.bounce({})

    // fit and center the world into the panel
    viewport.fit()
    viewport.moveCorner(0, 0)

    return viewport
  },
  willUnmount: (viewport: _Viewport) => {
    viewport.options.noTicker = true
    viewport.destroy({ children: true, texture: true, baseTexture: true })
  },
})

export const PixiViewport = (props: PixiViewportProps) => {
  const app = useApp()
  return <PixiComponentViewport app={app} {...props} />
}
