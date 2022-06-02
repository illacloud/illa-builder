import { HTMLAttributes, ReactNode } from "react"

export interface ActionEditorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface ActionEditorLayoutProps
  extends HTMLAttributes<HTMLDivElement> {
  actionList: ReactNode
  actionEditorPanel: ReactNode
  updateEditorHeight?: (val: number) => void
}

export type ApiType = "REST API"

export type DatabaseType = "MySQL" | "Postgres" | "Redis"

export type ResourceType = DatabaseType | ApiType

export interface ActionEditorContextProps {
  activeActionItemId: string
  resourceId: string
  editorHeight: number
}
