export type ActionType = "select" | "configure" | "edit"

export type ApiType = "REST API"

export type DatabaseType = "MySQL" | "Postgres" | "Redis"

export type ResourceType = DatabaseType | ApiType

export interface FormContainerProps {
  actionType: ActionType
  visible: boolean
  databaseType?: DatabaseType
  apiType?: ApiType
  onCancel?: () => void
}
