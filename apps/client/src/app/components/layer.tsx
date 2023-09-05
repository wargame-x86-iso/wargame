export interface LayerProps {
  children: React.ReactNode
  zIndex?: number
}

export function Layer(props: LayerProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: props.zIndex }}>
      {props.children}
    </div>
  )
}
