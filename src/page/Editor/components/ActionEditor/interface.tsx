import { HTMLAttributes, ReactNode } from "react"

export interface ActionEditorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface ActionEditorLayoutProps extends HTMLAttributes<HTMLDivElement> {
  queryList: ReactNode,
  actionEditorPanel: ReactNode
}
