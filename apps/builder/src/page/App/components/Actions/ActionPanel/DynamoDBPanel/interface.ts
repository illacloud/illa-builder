import { DynamoStructParams } from "@illa-public/public-types"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface DynamoDBSubPanelProps {
  structParams: DynamoStructParams
  handleValueChange: (value: string, name: string) => void
}

export interface DynamoDBPanelItemsInfo {
  title: string
  name: string
  expectedType: VALIDATION_TYPES
}
