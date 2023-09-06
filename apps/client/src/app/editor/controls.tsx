import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useContext } from 'react'

import { EditorContext, MapTiles } from './context'

const MapTileKeys = Object.keys(MapTiles) as (keyof typeof MapTiles)[]

export function EditorControls() {
  const ctx = useContext(EditorContext)
  return (
    <Stack spacing={2} padding={2}>
      <FormControl fullWidth>
        <InputLabel>Brush Type</InputLabel>
        <Select
          value={ctx.selectedTileType}
          label='Brush Type'
          onChange={(ev) =>
            ctx.setSelectedTileType(Number(ev.target.value) as MapTiles)
          }
        >
          {MapTileKeys.map((key) => (
            <MenuItem key={key} value={MapTiles[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Brush Size</InputLabel>
        <Select
          value={ctx.brushSize}
          label='Brush Size'
          onChange={(ev) => ctx.setBrushSize(Number(ev.target.value))}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <MenuItem key={i} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Map Width</InputLabel>
        <Select
          value={ctx.width}
          label='Map Width'
          onChange={(ev) => ctx.setWidth(Number(ev.target.value))}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItem key={i} value={(i + 5) * 10 - 1}>
              {(i + 5) * 10 - 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Map Height</InputLabel>
        <Select
          value={ctx.height}
          label='Map Height'
          onChange={(ev) => ctx.setHeight(Number(ev.target.value))}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItem key={i} value={(i + 3) * 10 - 1}>
              {(i + 3) * 10 - 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
