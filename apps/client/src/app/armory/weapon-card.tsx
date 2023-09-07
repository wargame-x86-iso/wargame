import { styled } from '@mui/material/styles'
import { Typography, Chip, Paper, Stack } from '@mui/material'

import { LabeledStatBar } from './labeled-stat-bar'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}))

export interface WeaponCardProps {
  name: string
  description: string
  attributes: string[]
  damage: number
  maxDamage: number
  accuracy: number
  maxAccuracy: number
  ammo: number
  maxAmmo: number
  range: number
  maxRange: number
  rate: number
  maxRate: number
}

export function WeaponCard(props: WeaponCardProps) {
  return (
    <Item>
      <Stack spacing={1} padding={1}>
        <Typography variant='body1'>{props.name}</Typography>
        <Stack direction='row' spacing={1} height={20}>
          {props.attributes.map((attribute) => (
            <Typography key={`${props.name}-${attribute}`} variant='caption'>
              {attribute.toUpperCase()}
            </Typography>
          ))}
        </Stack>
        <Typography variant='body2' height={80}>
          {props.description}
        </Typography>
        <LabeledStatBar
          label='Damage'
          value={props.damage}
          max={props.maxDamage}
        />
        <LabeledStatBar
          label='Accuracy'
          value={props.accuracy}
          max={props.maxAccuracy}
        />
        <LabeledStatBar label='Ammo' value={props.ammo} max={props.maxAmmo} />
        <LabeledStatBar
          label='Range'
          value={props.range}
          max={props.maxRange}
        />
        <LabeledStatBar label='Rate' value={props.rate} max={props.maxRate} />
      </Stack>
    </Item>
  )
}
