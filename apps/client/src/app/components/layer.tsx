export function Layer(props: { children: React.ReactNode; zIndex: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: props.zIndex }}>
      {props.children}
    </div>
  )
}
