export type DynamoActionMethods =
  | "query"
  | "scan"
  | "putItem"
  | "getItem"
  | "updateItem"
  | "deleteItem"

export interface DynamoDBAction {
  method: DynamoActionMethods
  table: string
  parameters: string
}

export const DynamoDBActionInitial: DynamoDBAction = {
  method: "query",
  table: "",
  parameters: "",
}

export const DynamoDBSelectOptions = [
  "query",
  "scan",
  "getItem",
  "putItem",
  "updateItem",
  "deleteItem",
]
