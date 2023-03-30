import { SelectOptionObject } from "@illa-design/react"
import { GoogleSheetsActionOpts } from "@/redux/currentApp/action/googleSheetsAction"
import { Params } from "@/redux/resource/restapiResource"

export interface GoogleSheetsActionSubPanelProps {
  opts: GoogleSheetsActionOpts
  spreadsheetsOption: SelectOptionObject[]
  onChange: (key: string) => (value: string | boolean | Params[]) => void
}

export interface BasicSheetConfigProps {
  sheetName?: string
  spreadsheet: string
  isHiddenSheetName?: boolean
  spreadsheetsOption: SelectOptionObject[]
  fx: boolean
  onChange: (key: string) => (value: string | boolean) => void
}
