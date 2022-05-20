import { ActionType, ResourceType } from "../FormContainer/interface"

export interface ConfigureResourceFormProps {
  actionType: ActionType
  resouceType: ResourceType
  back?: () => void
}
