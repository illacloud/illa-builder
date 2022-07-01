import { HTMLAttributes, ReactNode } from "react"
import { ACTION_TYPE } from "./constant"

export interface ActionEditorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface ActionEditorLayoutProps
  extends HTMLAttributes<HTMLDivElement> {
  actionList: ReactNode
  actionEditorPanel: ReactNode
  updateEditorHeight?: (val: number) => void
}

export type ApiType = ACTION_TYPE.REST_API

export type DatabaseType =
  | ACTION_TYPE.MYSQL
  | ACTION_TYPE.MONGO_DB
  | ACTION_TYPE.POSTGRES
  | ACTION_TYPE.REDIS

export type ResourceType = DatabaseType | ApiType | string

export interface ActionEditorContextProps {
  editorHeight: number
  setIsActionDirty?: (isDirty: boolean) => void
  setActionListLoading?: (loading: boolean) => void
  baseActionApi: string
}

export interface ActionDisplayNameValidateResult {
  error: boolean
  errorMsg?: string
}
