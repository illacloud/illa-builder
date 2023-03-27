import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { GoogleSheetsActionAppendOpts } from "@/redux/currentApp/action/googleSheetsAction"

export const AppendSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { onChange } = props
  const { t } = useTranslation()
  const opts = props.opts as GoogleSheetsActionAppendOpts

  return (
    <>
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        onChange={onChange}
      />
      <InputEditor
        value={opts.appendValues}
        lineNumbers
        style={{ height: "88px" }}
        onChange={onChange("appendValues")}
        title={t("editor.action.form.label.gs.values_to_append")}
        placeholder={t("editor.action.form.tips.gs.values_to_append")}
      />
    </>
  )
}
AppendSpreadsheetSubPanel.displayName = "AppendSpreadsheetSubPanel"
