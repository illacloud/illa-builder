import { ReactNode } from "react"

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export interface ErrorBoundaryState {
  hasError: boolean
}
