import { Box, SxProps, Theme } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener/dist'

export interface ScrollWrapperProps {
  height?: number | string
  width?: number | string
  onScrollBottom?: () => void
  sx?: SxProps<Theme>
}

const Wrapper: FC<PropsWithChildren<ScrollWrapperProps>> = (props) => {
  const handleScrollBottom =
    props.onScrollBottom ||
    (() => {
      return
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref: any = useBottomScrollListener(handleScrollBottom)
  return (
    <Box
      height={props.height}
      sx={(theme) => ({
        position: 'relative',
        flex: props.height ? undefined : 1,
        'div::-webkit-scrollbar': {
          width: theme.spacing(1.25),
          height: theme.spacing(1.25),
        },
        'div::-webkit-scrollbar-track': {
          background: theme.palette.divider,
        },
        'div::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.text.disabled,
          borderRadius: theme.spacing(10),
        },
      })}
    >
      <Box
        ref={ref}
        sx={{
          inset: 0,
          position: 'absolute',
          overflow: 'auto',
          display: 'flex',
          ...(props.sx || {}),
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export interface ScrollInnerProps {
  display?: 'flex'
  sx?: SxProps<Theme>
}

const Inner: FC<PropsWithChildren<ScrollInnerProps>> = (props) => (
  <Box sx={{ width: '100%', ...(props.sx || {}) }} display={props.display}>
    {props.children}
  </Box>
)

export const Scroll = { Wrapper, Inner }
