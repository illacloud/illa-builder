import { Params } from "@/redux/resource/restapiResource"

export type GoogleSheetsActionType =
  | "read"
  | "update"
  | "append"
  | "bulk"
  | "delete"
  | "create"
  | "copy"
  | "list"
  | "get"

export interface GoogleSheetsActionGetOpts {
  spreadsheet: string
  sheetName: string
}

export const GoogleSheetsActionGetOptsInitial: GoogleSheetsActionGetOpts = {
  spreadsheet: "",
  sheetName: "",
}

export interface GoogleSheetsActionCopyOpts {
  spreadsheet: string
  sheetName: string
  copyId: string
  copyTo: string
  sheetNameTo: string
}

export const GoogleSheetsActionCopyOptsInitial: GoogleSheetsActionCopyOpts = {
  spreadsheet: "",
  sheetName: "",
  copyId: "",
  copyTo: "",
  sheetNameTo: "",
}

export interface GoogleSheetsActionCreateOpts {
  spreadsheetTitle: string
}

export const GoogleSheetsActionCreateOptsInitial: GoogleSheetsActionCreateOpts =
  {
    spreadsheetTitle: "",
  }

export interface GoogleSheetsActionDeleteOpts {
  spreadsheet: string
  sheetName: string
  filters: Params[]
  compare: boolean
  consider: boolean
}

export const GoogleSheetsActionDeleteOptsInitial: GoogleSheetsActionDeleteOpts =
  {
    spreadsheet: "",
    sheetName: "",
    filters: [
      {
        key: "",
        value: "",
      },
    ],
    compare: false,
    consider: false,
  }

export interface GoogleSheetsActionListOpts {}

export const GoogleSheetsActionListOptsInitial: GoogleSheetsActionListOpts = {}

export interface GoogleSheetsActionBulkOpts {
  spreadsheet: string
  sheetName: string
  primaryKey: string
  arrayUpdate: string
}

export const GoogleSheetsActionBulkOptsInitial: GoogleSheetsActionBulkOpts = {
  spreadsheet: "",
  sheetName: "",
  primaryKey: "",
  arrayUpdate: "",
}

export interface GoogleSheetsActionAppendOpts {
  spreadsheet: string
  sheetName: string
  appendValues: string
}

export const GoogleSheetsActionAppendOptsInitial: GoogleSheetsActionAppendOpts =
  {
    spreadsheet: "",
    sheetName: "",
    appendValues: "",
  }

export type GoogleSheetsActionUpdateType = "notation" | "filters"

export interface GoogleSheetsActionUpdateOpts {
  spreadsheet: string
  sheetName: string
  filterBy: {
    type: GoogleSheetsActionUpdateType
    value: string | Params[]
  }
  updateValue: string
}

export const GoogleSheetsActionUpdateOptsInitial: GoogleSheetsActionUpdateOpts =
  {
    spreadsheet: "",
    sheetName: "",
    filterBy: {
      type: "filters",
      value: [
        {
          key: "",
          value: "",
          operator: "in",
        },
      ],
    },
    updateValue: "",
  }

export type DataRangeType = "notation" | "limitAndOffset"

export interface GoogleSheetsActionReadOpts {
  spreadsheet: string
  sheetName: string
  dataRange: DataRangeType
  limit: string
  offset: string
  notation: string
}

export const GoogleSheetsActionReadOptsInitial: GoogleSheetsActionReadOpts = {
  spreadsheet: "",
  sheetName: "",
  dataRange: "limitAndOffset",
  limit: "",
  offset: "",
  notation: "",
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
  actionType: GoogleSheetsActionType
  opts: T
}

export const GoogleSheetsActionInitial: GoogleSheetsAction<GoogleSheetsActionUpdateOpts> =
  {
    actionType: "update",
    opts: GoogleSheetsActionUpdateOptsInitial,
  }

export const GoogleSheetsActionInitialMaps: Record<
  GoogleSheetsActionType,
  GoogleSheetsActionOpts
> = {
  list: GoogleSheetsActionListOptsInitial,
  read: GoogleSheetsActionReadOptsInitial,
  update: GoogleSheetsActionUpdateOptsInitial,
  append: GoogleSheetsActionAppendOptsInitial,
  bulk: GoogleSheetsActionBulkOptsInitial,
  delete: GoogleSheetsActionDeleteOptsInitial,
  create: GoogleSheetsActionCreateOptsInitial,
  copy: GoogleSheetsActionCopyOptsInitial,
  get: GoogleSheetsActionGetOptsInitial,
}
