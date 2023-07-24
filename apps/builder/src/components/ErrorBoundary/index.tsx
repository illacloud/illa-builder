import { Component } from "react"
import { WidgetErrorBoundary } from "./fallback/widget"
import { ErrorBoundaryProps, ErrorBoundaryState } from "./interface"

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static defaultProps = {
    fallback: <WidgetErrorBoundary />,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(): void {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default ErrorBoundary
