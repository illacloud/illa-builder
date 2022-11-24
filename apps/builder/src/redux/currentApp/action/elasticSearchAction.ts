export enum ElasticSearchActionType {
  SEARCH = "search",
  GET_ONE = "get a document",
  INSERT_ONE = "insert a document",
  UPDATE_ONE = "update a document",
  DELETE_ONE = "delete a document",
}

export enum ElasticSearchActionRequestType {
  SEARCH = "search",
  GET_ONE = "get",
  INSERT_ONE = "insert",
  UPDATE_ONE = "update",
  DELETE_ONE = "delete",
}

export const IDEditorType = [
  ElasticSearchActionRequestType.GET_ONE,
  ElasticSearchActionRequestType.UPDATE_ONE,
  ElasticSearchActionRequestType.DELETE_ONE,
]

export const BodyContentType = [
  ElasticSearchActionRequestType.INSERT_ONE,
  ElasticSearchActionRequestType.UPDATE_ONE,
]

export const QueryContentType = [ElasticSearchActionRequestType.SEARCH]

export const ElasticSearchActionList = [
  {
    label: ElasticSearchActionType.SEARCH,
    value: ElasticSearchActionRequestType.SEARCH,
  },
  {
    label: ElasticSearchActionType.GET_ONE,
    value: ElasticSearchActionRequestType.GET_ONE,
  },
  {
    label: ElasticSearchActionType.INSERT_ONE,
    value: ElasticSearchActionRequestType.INSERT_ONE,
  },
  {
    label: ElasticSearchActionType.UPDATE_ONE,
    value: ElasticSearchActionRequestType.UPDATE_ONE,
  },
  {
    label: ElasticSearchActionType.DELETE_ONE,
    value: ElasticSearchActionRequestType.DELETE_ONE,
  },
]

export interface ElasticSearchAction {
  operation: ElasticSearchActionRequestType
  index: string
  query?: string
  body?: string
  id?: string
}

export const ElasticSearchActionInitial: ElasticSearchAction = {
  operation: ElasticSearchActionRequestType.SEARCH,
  index: "",
  query: "",
}
