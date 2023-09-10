import { AppBar, Box, Toolbar } from '@mui/material'

import { Scroll } from '../components'

export interface GameLayoutProps {
  map: React.ReactNode
  header: React.ReactNode
  controls: React.ReactNode
}

export function GameLayout(props: GameLayoutProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box height='80'>
        <AppBar position='relative'>
          <Toolbar>{props.header}</Toolbar>
        </AppBar>
      </Box>
      <Box display='flex' flexDirection='row' flex='1'>
        <Box flex='1' display='flex' sx={{ background: '#333' }}>
          {props.map}
        </Box>
        <Box width={500}>{props.controls}</Box>
      </Box>
    </Box>
  )
}
