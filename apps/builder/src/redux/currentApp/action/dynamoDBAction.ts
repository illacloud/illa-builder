export type DynamoActionMethods =
  | "query"
  | "scan"
  | "putItem"
  | "getItem"
  | "updateItem"
  | "deleteItem"

export interface ScanStructParams {
  indexName: string
  projectionExpression: string
  filterExpression: string
  expressionAttributeNames: string
  expressionAttributeValues: string
  limit: string
  select: string
}

export const ScanStructParamsInitial: ScanStructParams = {
  indexName: "",
  projectionExpression: "",
  filterExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
  limit: "",
  select: "",
}

export interface QueryStructParams extends ScanStructParams {
  keyConditionExpression: string
}

export const QueryStructParamsInitial: QueryStructParams = {
  indexName: "",
  projectionExpression: "",
  filterExpression: "",
  keyConditionExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
  limit: "",
  select: "",
}

export interface GetItemStructParams {
  key: string
  projectionExpression: string
  expressionAttributeNames: string
}

export const GetItemStructParamsInitial: GetItemStructParams = {
  key: "",
  projectionExpression: "",
  expressionAttributeNames: "",
}

export interface PutItemStructParams {
  item: string
  conditionExpression: string
  expressionAttributeNames: string
  expressionAttributeValues: string
}

export const PutItemStructParamsInitial: PutItemStructParams = {
  item: "",
  conditionExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
}

export interface UpdateItemStructParams
  extends Omit<PutItemStructParams, "item"> {
  key: string
  updateExpression: string
}

export const UpdateItemStructParamsInitial: UpdateItemStructParams = {
  key: "",
  updateExpression: "",
  conditionExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
}

export interface DeleteItemStructParams
  extends Omit<UpdateItemStructParams, "updateExpression"> {}

export const DeleteItemStructParamsInitial: DeleteItemStructParams = {
  key: "",
  conditionExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
}

export type StructParams =
  | QueryStructParams
  | ScanStructParams
  | GetItemStructParams
  | PutItemStructParams
  | UpdateItemStructParams
  | DeleteItemStructParams

export interface DynamoDBAction<T extends StructParams> {
  method: DynamoActionMethods
  table: string
  useJson: boolean
  parameters: string
  structParams: T
}

export const DynamoDBActionInitial: DynamoDBAction<QueryStructParams> = {
  method: "query",
  table: "",
  parameters: "",
  useJson: false,
  structParams: QueryStructParamsInitial,
}

export const DynamoDBSelectOptions = [
  "query",
  "scan",
  "getItem",
  "putItem",
  "updateItem",
  "deleteItem",
]

export const DynamoDBInitialMap: Record<DynamoActionMethods, StructParams> = {
  query: QueryStructParamsInitial,
  scan: ScanStructParamsInitial,
  getItem: GetItemStructParamsInitial,
  putItem: PutItemStructParamsInitial,
  updateItem: UpdateItemStructParamsInitial,
  deleteItem: DeleteItemStructParamsInitial,
}

export const DynamoActionStructParamsDataTransferType: Record<
  string,
  object | number
> = {
  expressionAttributeNames: {},
  expressionAttributeValues: {},
  key: {},
  item: {},
  limit: 0,
}
