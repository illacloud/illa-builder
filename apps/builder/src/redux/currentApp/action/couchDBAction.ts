export type CouchDBActionMethods =
  | "listRecords"
  | "retrieveRecord"
  | "createRecord"
  | "updateRecord"
  | "deleteRecord"
  | "find"
  | "getView"

export interface ListRecords {
  includeDocs: boolean
  descendingOrder: boolean
  limit: string
  skip: string
}

export const ListRecordsInitial: ListRecords = {
  includeDocs: false,
  descendingOrder: true,
  limit: "{{1000}}",
  skip: "{{0}}",
}

export interface RetrieveRecord {
  _id: string
}

export const RetrieveRecordInitial: RetrieveRecord = {
  _id: "",
}

export interface CreateRecord {
  record: string
}

export const CreateRecordInitial: CreateRecord = {
  record: "",
}

export interface UpdateRecord {
  _id: string
  _rev: string
  record: string
}

export const UpdateRecordInitial: UpdateRecord = {
  _id: "",
  _rev: "",
  record: "",
}

export interface DeleteRecord {
  _id: string
  _rev: string
}

export const DeleteRecordInitial: DeleteRecord = {
  _id: "",
  _rev: "",
}

export interface FindRecord {
  mangoQuery: string
}

export const FindRecordInitial: FindRecord = {
  mangoQuery: "",
}

export interface GetView {
  viewurl: string
  startkey: string
  endkey: string
  skip: string
  limit: string
  includeDocs: boolean
}

export const GetViewInitial: GetView = {
  viewurl: "",
  startkey: "",
  endkey: "",
  skip: "{{0}}",
  limit: "{{1000}}",
  includeDocs: false,
}

export type CouchDBOptionsType =
  | GetView
  | FindRecord
  | DeleteRecord
  | UpdateRecord
  | CreateRecord
  | RetrieveRecord
  | ListRecords

export interface CouchDBAction<T extends CouchDBOptionsType> {
  method: CouchDBActionMethods
  database: string
  opts: T
}

export const CouchDBActionInitial: CouchDBAction<CouchDBOptionsType> = {
  method: "listRecords",
  database: "",
  opts: ListRecordsInitial,
}

export const CouchDBActionStructParamsDataTransferType: Record<
  string,
  object | number
> = {
  record: {},
  mangoQuery: {},
  limit: 1000,
  skip: 0,
}
