import React from 'react'
import * as PIXI from 'pixi.js'
import { PixiComponent, useApp } from '@pixi/react'
import { Viewport as _Viewport } from 'pixi-viewport'

export interface PixiViewportProps {
  width: number
  height: number
  children?: React.ReactNode
}

interface PixiComponentViewportProps extends PixiViewportProps {
  app: PIXI.Application
}

const PixiComponentViewport = PixiComponent('Viewport', {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new _Viewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 2,
      worldHeight: props.height * 2,
      ticker: props.app.ticker,
      events: props.app.renderer.plugins.interaction,
    })
    viewport.drag().pinch().wheel().clampZoom({})

    return viewport
  },
})

export const PixiViewport = (props: PixiViewportProps) => {
  const app = useApp()
  return <PixiComponentViewport app={app} {...props} />
}
