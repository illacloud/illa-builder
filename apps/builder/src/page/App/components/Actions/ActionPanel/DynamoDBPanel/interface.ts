import { StructParams } from "@/redux/currentApp/action/dynamoDBAction"

export interface DynamoDBSubPanelProps {
  structParams: StructParams
  handleValueChange: (value: string, name: string) => void
}
