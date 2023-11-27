import { GoogleSheetsActionAppendOpts } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const AppendSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { onChange, spreadsheetsOption } = props
  const { t } = useTranslation()
  const opts = props.opts as GoogleSheetsActionAppendOpts

  return (
    <>
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        onChange={onChange}
        spreadsheetsOption={spreadsheetsOption}
        fx={opts.fx}
      />
      <InputEditor
        value={opts.values}
        lineNumbers
        style={{ height: "88px" }}
        onChange={onChange("values")}
        title={t("editor.action.form.label.gs.values_to_append")}
        placeholder={t("editor.action.form.tips.gs.values_to_append")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
    </>
  )
}
AppendSpreadsheetSubPanel.displayName = "AppendSpreadsheetSubPanel"
