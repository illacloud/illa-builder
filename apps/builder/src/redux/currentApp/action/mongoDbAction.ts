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

export interface AggregateContent {
  aggregation: string
  options: string
}

export interface BulkWriteContent {
  operations: string
  options: string
}

export interface CountContent {
  query: string
}

export interface DeleteManyContent {
  filter: string
}

export interface DeleteOneContent {
  filter: string
}

export interface DistinctContent {
  query: string
  field: string
  options: string
}

export interface FindContent {
  query: string
  projection: string
  sortBy: string
  limit: string
  skip: string
}

export interface FindOneContent {
  query: string
  projection: string
  skip: string
}

export interface FindOneAndUpdateContent {
  filter: string
  update: string
  options: string
}

export interface InsertOneContent {
  document: string
}

export interface InsertManyContent {
  document: string
}

export interface ListCollectionsContent {
  query: string
}

export interface UpdateManyContent {
  filter: string
  update: string
  options: string
}

export interface UpdateOneContent {
  filter: string
  update: string
  options: string
}

export interface CommandContent {
  document: string
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

export interface MongoDbAction extends Events {
  actionType: string
  collection: string
  typeContent: MongoDbActionTypeContent
}

export const MongoDbActionInitial: MongoDbAction = {
  actionType: "aggregate",
  collection: "",
  typeContent: {} as AggregateContent,
}
