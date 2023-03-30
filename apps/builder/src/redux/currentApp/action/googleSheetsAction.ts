import { Params } from "@/redux/resource/restapiResource"

export type GoogleSheetsActionType =
  | "read"
  | "append"
  | "update"
  | "bulkUpdate"
  | "delete"
  | "create"
  | "copy"
  | "list"
  | "get"

export interface GoogleSheetsActionGetOpts {
  spreadsheet: string
  fx: boolean
}

export const GoogleSheetsActionGetOptsInitial: GoogleSheetsActionGetOpts = {
  spreadsheet: "",
  fx: false,
}

export interface GoogleSheetsActionCopyOpts {
  spreadsheet: string
  sheetName: string
  toSpreadsheet: string
  toSheet: string
  fx: boolean
  toFx: boolean
}

export const GoogleSheetsActionCopyOptsInitial: GoogleSheetsActionCopyOpts = {
  spreadsheet: "",
  sheetName: "",
  toSpreadsheet: "",
  toSheet: "",
  fx: false,
  toFx: false,
}

export interface GoogleSheetsActionCreateOpts {
  title: string
}

export const GoogleSheetsActionCreateOptsInitial: GoogleSheetsActionCreateOpts =
  {
    title: "",
  }

export interface GoogleSheetsActionDeleteOpts {
  spreadsheet: string
  sheetName: string
  rowIndex: string
  fx: boolean
}

export const GoogleSheetsActionDeleteOptsInitial: GoogleSheetsActionDeleteOpts =
  {
    spreadsheet: "",
    sheetName: "",
    rowIndex: "",
    fx: false,
  }

export interface GoogleSheetsActionListOpts {}

export const GoogleSheetsActionListOptsInitial: GoogleSheetsActionListOpts = {}

export interface GoogleSheetsActionBulkOpts {
  spreadsheet: string
  sheetName: string
  primaryKey: string
  rowsArray: string
  fx: boolean
}

export const GoogleSheetsActionBulkOptsInitial: GoogleSheetsActionBulkOpts = {
  spreadsheet: "",
  sheetName: "",
  primaryKey: "",
  rowsArray: "",
  fx: false,
}

export interface GoogleSheetsActionAppendOpts {
  spreadsheet: string
  sheetName: string
  values: string
  fx: boolean
}

export const GoogleSheetsActionAppendOptsInitial: GoogleSheetsActionAppendOpts =
  {
    spreadsheet: "",
    sheetName: "",
    values: "",
    fx: false,
  }

export type GoogleSheetsActionUpdateType = "a1" | "filter"

export interface GoogleSheetsActionUpdateOpts {
  spreadsheet: string
  sheetName: string
  filterType: GoogleSheetsActionUpdateType
  filters: Params[]
  a1Notation: string
  values: string
  fx: boolean
}

export const GoogleSheetsActionUpdateOptsInitial: GoogleSheetsActionUpdateOpts =
  {
    spreadsheet: "",
    sheetName: "",
    filterType: "filter",
    filters: [
      {
        key: "",
        value: "",
        operator: "=",
      },
    ],
    a1Notation: "",
    values: "",
    fx: false,
  }

export type DataRangeType = "a1" | "limit"

export interface GoogleSheetsActionReadOpts {
  spreadsheet: string
  sheetName: string
  rangeType: DataRangeType
  limit: string
  offset: string
  a1Notation: string
  fx: boolean
}

export const GoogleSheetsActionReadOptsInitial: GoogleSheetsActionReadOpts = {
  spreadsheet: "",
  sheetName: "",
  rangeType: "limit",
  limit: "",
  offset: "",
  a1Notation: "",
  fx: false,
}

export type GoogleSheetsActionOpts =
  | GoogleSheetsActionGetOpts
  | GoogleSheetsActionCopyOpts
  | GoogleSheetsActionCreateOpts
  | GoogleSheetsActionDeleteOpts
  | GoogleSheetsActionListOpts
  | GoogleSheetsActionBulkOpts
  | GoogleSheetsActionAppendOpts
  | GoogleSheetsActionUpdateOpts
  | GoogleSheetsActionReadOpts

export interface GoogleSheetsAction<T extends GoogleSheetsActionOpts> {
  method: GoogleSheetsActionType
  opts: T
}

export const GoogleSheetsActionInitial: GoogleSheetsAction<GoogleSheetsActionOpts> =
  {
    method: "read",
    opts: GoogleSheetsActionReadOptsInitial,
  }

export const GoogleSheetsActionInitialMaps: Record<
  GoogleSheetsActionType,
  GoogleSheetsActionOpts
> = {
  list: GoogleSheetsActionListOptsInitial,
  read: GoogleSheetsActionReadOptsInitial,
  update: GoogleSheetsActionUpdateOptsInitial,
  append: GoogleSheetsActionAppendOptsInitial,
  bulkUpdate: GoogleSheetsActionBulkOptsInitial,
  delete: GoogleSheetsActionDeleteOptsInitial,
  create: GoogleSheetsActionCreateOptsInitial,
  copy: GoogleSheetsActionCopyOptsInitial,
  get: GoogleSheetsActionGetOptsInitial,
}

export const GoogleSheetDataTypeTransform = {
  limit: 0,
  offset: 0,
  rowIndex: 0,
  rowsArray: [{}],
  values: [{}],
}
