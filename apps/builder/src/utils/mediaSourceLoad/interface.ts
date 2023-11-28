import { ReactNode } from "react"

export interface Inject {
  sourceLoadErrorHandler: (
    sourceURL: string | undefined,
    widgetType: string,
  ) => void
}
export interface MediaSourceLoadProviderProps {
  children: ReactNode
}
