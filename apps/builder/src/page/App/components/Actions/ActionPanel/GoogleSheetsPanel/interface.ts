import { GoogleSheetsActionOpts } from "@/redux/currentApp/action/googleSheetsAction"

export interface GoogleSheetsActionSubPanelProps {
  opts: GoogleSheetsActionOpts
  onChange: (key: string) => (value: string | boolean) => void
}

export interface BasicSheetConfigProps {
  sheetName: string
  spreadsheet: string
  copyTo?: string
  showCopyTo?: boolean
  showSpreadsheet?: boolean
  onChange: (key: string) => (value: string | boolean) => void
}
