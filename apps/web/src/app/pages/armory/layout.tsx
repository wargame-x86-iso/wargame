import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import { Scroll } from '../../components'

export interface ArmoryLayoutProps {
  smallArms: React.ReactNode
  heavyWeapons: React.ReactNode
  header: React.ReactNode
}

export function ArmoryLayout(props: ArmoryLayoutProps) {
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
        <Scroll.Wrapper>
          <Scroll.Inner>
            <Box paddingX={2} paddingY={2}>
              <Typography variant='h6'>Small Arms</Typography>
              {props.smallArms}
              <Typography variant='h6'>Heavy Weapons</Typography>
              {props.heavyWeapons}
            </Box>
          </Scroll.Inner>
        </Scroll.Wrapper>
      </Box>
    </Box>
  )
}
