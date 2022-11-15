export enum ElasticSearchActionType {
  SEARCH = "search",
  GET_ONE = "get a document",
  INSERT_ONE = "insert a document",
  UPDATE_ONE = "update a document",
  DELETE_ONE = "delete a document",
}

export const ElasticSearchActionList = [
  ElasticSearchActionType.SEARCH,
  ElasticSearchActionType.GET_ONE,
  ElasticSearchActionType.INSERT_ONE,
  ElasticSearchActionType.UPDATE_ONE,
  ElasticSearchActionType.DELETE_ONE,
]

export const IDEditorType = [
  ElasticSearchActionType.GET_ONE,
  ElasticSearchActionType.UPDATE_ONE,
  ElasticSearchActionType.DELETE_ONE,
]

export interface ElasticSearchAction {
  operation: ElasticSearchActionType
  index: string
  query: string
  id: string
}

export const ElasticSearchActionInitial: ElasticSearchAction = {
  operation: ElasticSearchActionType.SEARCH,
  index: "",
  query: "",
  id: "",
}
