import React from 'react'
import * as PIXI from 'pixi.js'
import { PixiComponent, useApp } from '@pixi/react'
import { Viewport as _Viewport } from 'pixi-viewport'

export interface PixiViewportProps {
  width: number
  height: number
  worldWidth: number
  worldHeight: number
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
      worldWidth: props.worldWidth,
      worldHeight: props.worldHeight,
      ticker: props.app.ticker,
      events,
    })

    viewport
      .drag({
        clampWheel: false,
      })
      .wheel({
        percent: 0.1,
        trackpadPinch: true,
      })
      .decelerate()
      .clampZoom({
        minScale: 0.25,
        maxScale: 5,
      })

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
