import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useContext } from 'react'

import { MapTiles } from '@wargame/roster'

import { EditorContext } from './context'

const MapTileKeys = Object.keys(MapTiles) as (keyof typeof MapTiles)[]

export function EditorControls() {
  const editor = useContext(EditorContext)
  return (
    <Stack spacing={2} padding={2}>
      <FormControl fullWidth>
        <InputLabel>Brush Type</InputLabel>
        <Select
          value={editor.brush.tile}
          label='Brush Type'
          onChange={(ev) =>
            editor.brush.onTileChange(String(ev.target.value) as MapTiles)
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
          value={editor.brush.size}
          label='Brush Size'
          onChange={(ev) => editor.brush.onSizeChange(Number(ev.target.value))}
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
          value={editor.map.width}
          label='Map Width'
          onChange={(ev) => editor.map.onWidthChange(Number(ev.target.value))}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItem key={i} value={(i + 3) * 10 - 1}>
              {(i + 3) * 10 - 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Map Height</InputLabel>
        <Select
          value={editor.map.height}
          label='Map Height'
          onChange={(ev) => editor.map.onHeightChange(Number(ev.target.value))}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItem key={i} value={(i + 2) * 10 - 1}>
              {(i + 2) * 10 - 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
