import {
  ApiType,
  DatabaseType,
} from "@/page/App/components/ActionEditor/interface"

export type ActionType = "select" | "configure" | "edit"

export interface ResourceFormProps {
  actionType: ActionType
  visible: boolean
  resourceId: string
  databaseType?: DatabaseType
  apiType?: ApiType
  withoutBack?: boolean
  onCancel?: () => void
}
