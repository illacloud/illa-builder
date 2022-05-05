export type ActionType = "select" | "configure" | "edit"

export type ResourceType = "DATABASE" | "API"

export type ApiType = "REST API"

export type DatabaseType = "MySQL" | "Postgres" | "Redis"

export interface FormContainerProps {
  actionType: ActionType
  visible: boolean
  resourceType?: ResourceType
  databaseType?: DatabaseType
  apiType?: ApiType
  onCancel?: () => void
}
