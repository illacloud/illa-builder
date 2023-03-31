import { FC } from "react"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { GoogleSheetsActionGetOpts } from "@/redux/currentApp/action/googleSheetsAction"

export const GetSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { onChange, spreadsheetsOption } = props
  const opts = props.opts as GoogleSheetsActionGetOpts

  return (
    <BasicSheetConfig
      spreadsheet={opts.spreadsheet}
      onChange={onChange}
      isHiddenSheetName={true}
      spreadsheetsOption={spreadsheetsOption}
      fx={opts.fx}
    />
  )
}
GetSpreadsheetSubPanel.displayName = "GetSpreadsheetSubPanel"
