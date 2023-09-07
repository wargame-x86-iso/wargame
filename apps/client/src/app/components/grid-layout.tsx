import { Grid } from '@mui/material'

export interface GridLayoutProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyOf: (item: T) => string | number
}

export function GridLayout<T>(props: GridLayoutProps<T>) {
  return (
    <Grid container spacing={2}>
      {props.items.map((item, i) => (
        <Grid key={props.keyOf(item)} item xs={3} sm={3} md={3} lg={3}>
          {props.renderItem(item)}
        </Grid>
      ))}
    </Grid>
  )
}
