import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import * as d3Hexbin from 'd3-hexbin'

import { with2DRange } from '../utils'

export interface RenderHexProps {
  fill?: (x: number, y: number) => string
  stroke?: (x: number, y: number) => string
}

export interface HexGridProps {
  width: number
  height: number
  strokeWeight?: number
  background?: string
  render?: RenderHexProps
  onClick?: (x: number, y: number) => void
  onHover?: (x: number, y: number) => void
}

export const HexGrid = (props: HexGridProps) => {
  const svgRef = useRef(null)
  const radius = 16
  useEffect(() => {
    if (!svgRef.current) return

    const width = (props.width + 3) * radius
    const height = (props.height + 3) * radius

    const pairs = with2DRange(
      props.width,
      props.height,
      (x, y) => [x, y] as [number, number]
    )

    const svg = d3.select(svgRef.current)

    const hexbin = d3Hexbin
      .hexbin<[number, number]>()
      .radius(radius)
      .extent([
        [0, 0],
        [width, height],
      ])
      .x(([x]) => (x + 2) * radius)
      .y(([_, y]) => (y + 2) * radius)

    const bins = hexbin(pairs)

    svg.attr('width', width).attr('height', height)

    const { onClick, onHover, background, render, strokeWeight } = props

    const hexBg = svg
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height)

    if (background) {
      hexBg.attr('background', background).style('background', background)
    }

    const hexes = svg
      .append('g')
      .attr('clip-path', 'url(#clip)')
      .selectAll('path')
      .data(bins)
      .enter()
      .append('path')
      .attr('d', hexbin.hexagon())
      .attr('transform', (d) => `translate(${d.x},${d.y})`)

    if (render) {
      const { fill, stroke } = render
      if (fill) hexes.attr('fill', ([[x, y]]) => fill(x, y))
      if (stroke) hexes.attr('stroke', ([[x, y]]) => stroke(x, y))
      if (strokeWeight) hexes.attr('stroke-width', strokeWeight)
    }

    if (onClick) {
      hexes.on('click', (_, [[x, y]]) => onClick(x, y))
    }

    if (onHover) {
      hexes.on('mouseover', (_, [[x, y]]) => onHover(x, y))
    }

    return () => {
      svg.selectAll('*').remove()
    }
  })

  return <svg ref={svgRef} style={{ cursor: 'pointer' }} />
}
