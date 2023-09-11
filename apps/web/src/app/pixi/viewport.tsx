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
  zoom: {
    max: number
    min: number
  }
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

    viewport.mouseEdges({
      allowButtons: true,
    })
    viewport.drag({})
    viewport.wheel({})
    viewport.clampZoom({
      maxScale: props.zoom.max,
      minScale: props.zoom.min,
    })

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

export const Viewport = (props: PixiViewportProps) => {
  const app = useApp()
  return <PixiComponentViewport app={app} {...props} />
}
