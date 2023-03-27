import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { GoogleSheetsActionCopyOpts } from "@/redux/currentApp/action/googleSheetsAction"

export const CopySpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange } = props
  const opts = props.opts as GoogleSheetsActionCopyOpts

  return (
    <>
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        onChange={onChange}
      />
      <InputEditor
        value={opts.copyId}
        onChange={onChange("copyId")}
        title={t("editor.action.form.label.gs.sheet_id_to_copy")}
        tips={t("editor.action.form.tips.gs.sheet_id_to_copy")}
      />
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        showCopyTo
        showSpreadsheet={false}
        onChange={onChange}
      />
    </>
  )
}
CopySpreadsheetSubPanel.displayName = "CopySpreadsheetSubPanel"
