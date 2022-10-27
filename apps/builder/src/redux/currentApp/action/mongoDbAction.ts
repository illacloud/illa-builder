import { Events } from "@/redux/currentApp/action/actionState"

export const MongoDbActionList = [
  "aggregate",
  "bulkWrite",
  "count",
  "deleteMany",
  "deleteOne",
  "distinct",
  "find",
  "findOne",
  "findOneAndUpdate",
  "insertOne",
  "insertMany",
  "listCollections",
  "updateMany",
  "updateOne",
  "command",
]

export type MongoDbActionType =
  | "aggregate"
  | "bulkWrite"
  | "count"
  | "deleteMany"
  | "deleteOne"
  | "distinct"
  | "find"
  | "findOne"
  | "findOneAndUpdate"
  | "insertOne"
  | "insertMany"
  | "listCollections"
  | "updateMany"
  | "updateOne"
  | "command"

export interface AggregateContent {
  aggregation: string
  options: string
}

export const AggregateContentInitial: AggregateContent = {
  aggregation: "",
  options: "",
}

export interface BulkWriteContent {
  operations: string
  options: string
}

export const BulkWriteContentInitial: BulkWriteContent = {
  operations: "",
  options: "",
}

export interface CountContent {
  query: string
}

export const CountContentInitial: CountContent = {
  query: "",
}

export interface DeleteManyContent {
  filter: string
}

export const DeleteManyContentInitial: DeleteManyContent = {
  filter: "",
}

export interface DeleteOneContent {
  filter: string
}

export const DeleteOneContentInitial: DeleteOneContent = {
  filter: "",
}

export interface DistinctContent {
  query: string
  field: string
  options: string
}

export const DistinctContentInitial: DistinctContent = {
  query: "",
  field: "",
  options: "",
}

export interface FindContent {
  query: string
  projection: string
  sortBy: string
  limit: string
  skip: string
}

export const FindContentInitial: FindContent = {
  query: "",
  projection: "",
  sortBy: "",
  limit: "",
  skip: "",
}

export interface FindOneContent {
  query: string
  projection: string
  skip: string
}

export const FindOneContentInitial: FindOneContent = {
  query: "",
  projection: "",
  skip: "",
}

export interface FindOneAndUpdateContent {
  filter: string
  update: string
  options: string
}

export const FindOneAndUpdateContentInitial: FindOneAndUpdateContent = {
  filter: "",
  update: "",
  options: "",
}

export interface InsertOneContent {
  document: string
}

export const InsertOneContentInitial: InsertOneContent = {
  document: "",
}

export interface InsertManyContent {
  document: string
}

export const InsertManyContentInitial: InsertManyContent = {
  document: "",
}

export interface ListCollectionsContent {
  query: string
}

export const ListCollectionsContentInitial: ListCollectionsContent = {
  query: "",
}

export interface UpdateManyContent {
  filter: string
  update: string
  options: string
}

export const UpdateManyContentInitial: UpdateManyContent = {
  filter: "",
  update: "",
  options: "",
}

export interface UpdateOneContent {
  filter: string
  update: string
  options: string
}

export const UpdateOneContentInitial: UpdateOneContent = {
  filter: "",
  update: "",
  options: "",
}

export interface CommandContent {
  document: string
}

export const CommandContentInitial: CommandContent = {
  document: "",
}

export type MongoDbActionTypeContent =
  | AggregateContent
  | BulkWriteContent
  | CountContent
  | DeleteManyContent
  | DeleteOneContent
  | DistinctContent
  | FindContent
  | FindOneContent
  | FindOneAndUpdateContent
  | InsertOneContent
  | InsertManyContent
  | ListCollectionsContent
  | UpdateManyContent
  | UpdateOneContent
  | CommandContent

export interface MongoDbAction<T extends MongoDbActionTypeContent>
  extends Events {
  actionType: MongoDbActionType
  collection: string
  typeContent: T
}

export const MongoDbActionInitial: MongoDbAction<MongoDbActionTypeContent> = {
  actionType: "aggregate",
  collection: "",
  typeContent: AggregateContentInitial,
}
