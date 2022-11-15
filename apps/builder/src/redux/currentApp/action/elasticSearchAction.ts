export const ElasticSearchActionList = [
  "search",
  "get a document",
  "insert a document",
  "update a document",
  "delete a document",
]

export type ElasticSearchActionType =
  | "search"
  | "get a document"
  | "insert a document"
  | "update a document"
  | "delete a document"

export interface ElasticSearchAction {
  operation: ElasticSearchActionType
  index: string
  query: string
  id: string
}

export const ElasticSearchActionInitial: ElasticSearchAction = {
  operation: "search",
  index: "",
  query: "",
  id: "",
}
