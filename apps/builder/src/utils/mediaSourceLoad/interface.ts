import { ReactNode } from "react"

export interface Inject {
  sourceLoadErrorHandler: (sourceURL: string | undefined) => void
}
export interface MediaSourceLoadProviderProps {
  children: ReactNode
}
