export type ActionType = "select" | "configure" | "edit"

export type ResourceType = "DATABASE" | "API"

export type ApiType = "REST"

export type DatabaseType = "MySQL"

export interface FormContainerProps {
  actionType: ActionType
  visible: boolean
  resourceType?: ResourceType
  databaseType?: DatabaseType
  apiType?: ApiType
}
