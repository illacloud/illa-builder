import { ActionType, ApiType, DatabaseType } from "../FormContainer/interface"

export interface ConfigureResourceFormProps {
  actionType: ActionType
  databaseType?: DatabaseType
  apiType?: ApiType
  onCancel?: () => void
  back?: () => void
}
