import { Box } from '@mui/material'

export interface GameLayoutProps {
  map: React.ReactNode
  header: React.ReactNode
  controls: React.ReactNode
  mapContainerRef: (node: HTMLDivElement | null) => void
}

export function GameLayout(props: GameLayoutProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box display='flex' flexDirection='row' flex='1'>
        <Box
          flex='1'
          display='flex'
          sx={{ background: '#333' }}
          ref={props.mapContainerRef}
        >
          {props.map}
        </Box>
      </Box>
      <Box height={200} sx={{ background: '#333' }}>
        {props.controls}
      </Box>
    </Box>
  )
}
