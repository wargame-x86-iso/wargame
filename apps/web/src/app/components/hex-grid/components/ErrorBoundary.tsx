/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default class ErrorBoundary extends React.Component<any> {
  state: any
  constructor(props: any) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>{this.state.error.toString()}</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </p>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}
