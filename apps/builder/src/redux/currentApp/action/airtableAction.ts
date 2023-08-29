export type AirtableActionMethodsType =
  | "list"
  | "get"
  | "create"
  | "update"
  | "bulkUpdate"
  | "bulkDelete"
  | "delete"

export const AirtableMethodList = [
  {
    label: "List Records",
    value: "list",
  },
  {
    label: "Get Record",
    value: "get",
  },
  {
    label: "Create Records",
    value: "create",
  },
  {
    label: "Update Record",
    value: "update",
  },
  {
    label: "Update Multiple Records",
    value: "bulkUpdate",
  },
  {
    label: "Delete Record",
    value: "delete",
  },
  {
    label: "Delete Multiple Records",
    value: "bulkDelete",
  },
]

export type AirtableActionConfigType =
  | AirtableListRecord
  | AirtableGetRecord
  | AirtableCreateRecord
  | AirtableUpdateMultipleRecords
  | AirtableUpdateRecord
  | AirtableDeleteMultipleRecords
  | AirtableDeleteRecord

export interface AirtableBaseConfig {
  baseId: string
  tableName: string
}

export const AirtableBaseConfigInitial: AirtableBaseConfig = {
  baseId: "",
  tableName: "",
}

export interface AirtableListSort {
  field: string
  direction: string
}

export interface AirtableListRecord {
  fields: string //string[]
  filterByFormula: string
  maxRecords: string // number
  pageSize: string // number
  sort: string // object[]
  view: string
  cellFormat: string
  timeZone: string
  userLocale: string
  offset: string
}

export const AirtableListRecordInitial: AirtableListRecord = {
  cellFormat: "",
  fields: "",
  filterByFormula: "",
  maxRecords: "",
  offset: "",
  pageSize: "",
  sort: "",
  timeZone: "",
  userLocale: "",
  view: "",
}

export interface AirtableGetRecord {
  recordID: string
}

export const AirtableGetRecordInitial: AirtableGetRecord = {
  recordID: "",
}

export interface AirtableCreateRecord {
  records: string //object[]
}

export const AirtableCreateRecordInitial: AirtableCreateRecord = {
  records: "", //object[],
}

export interface AirtableUpdateMultipleRecords {
  records: "" //object[]
}

export const AirtableUpdateMultipleRecordInitial: AirtableUpdateMultipleRecords =
  {
    records: "",
  }

export interface AirtableUpdateRecord {
  recordID: string
  record: string
}

export const AirtableUpdateRecordInitial: AirtableUpdateRecord = {
  recordID: "",
  record: "",
}

export interface AirtableDeleteMultipleRecords {
  recordIDs: string //string[]
}

export const AirtableDeleteMultipleRecordInitial: AirtableDeleteMultipleRecords =
  {
    recordIDs: "",
  }

export interface AirtableDeleteRecord {
  recordID: string
}

export const AirtableDeleteRecordInitial: AirtableDeleteRecord = {
  recordID: "",
}

export interface AirtableAction<T extends AirtableActionConfigType> {
  method: AirtableActionMethodsType
  baseConfig: AirtableBaseConfig
  config: T
}

export const AirtableActionConfigInitial: AirtableAction<AirtableActionConfigType> =
  {
    baseConfig: AirtableBaseConfigInitial,
    config: AirtableListRecordInitial,
    method: "list",
  }
