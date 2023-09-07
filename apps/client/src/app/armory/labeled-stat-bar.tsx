import {
  Box,
  LinearProgress as LinearProgress_,
  LinearProgressProps as LinearProgressProps_,
  Typography,
} from '@mui/material'
import { FC } from 'react'
import { styled } from '@mui/material/styles'

const WideLinearProgress = styled(LinearProgress_)(() => ({
  height: 6,
}))

export interface LabeledStatBarProps extends LinearProgressProps_ {
  value: number
  max: number
  label: string
}

const toPercentage = (val: number, max: number) =>
  Math.min(100, Math.max(0, (val / max) * 100))

export const LabeledStatBar: FC<LabeledStatBarProps> = (props) => (
  <Box sx={{ width: '100%' }}>
    <Box mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant='caption' sx={{ flexGrow: 1 }}>
        {props.label}
      </Typography>
      <Typography variant='caption'>{`${props.value} / ${props.max}`}</Typography>
    </Box>
    <WideLinearProgress
      variant='determinate'
      {...{ props, value: toPercentage(props.value, props.max) }}
    />
  </Box>
)
