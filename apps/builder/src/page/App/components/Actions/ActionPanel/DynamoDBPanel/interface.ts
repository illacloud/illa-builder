import { StructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface DynamoDBSubPanelProps {
  structParams: StructParams
  handleValueChange: (value: string, name: string) => void
}

export interface DynamoDBPanelItemsInfo {
  title: string
  name: string
  expectedType: VALIDATION_TYPES
}
