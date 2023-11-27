import { GoogleSheetsActionOpts } from "@illa-public/public-types"
import { Params } from "@illa-public/public-types"
import { SelectOptionObject } from "@illa-design/react"

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
