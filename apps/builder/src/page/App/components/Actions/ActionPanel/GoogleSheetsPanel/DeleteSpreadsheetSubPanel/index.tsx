import { GoogleSheetsActionDeleteOpts } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DeleteSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange, spreadsheetsOption } = props
  const opts = props.opts as GoogleSheetsActionDeleteOpts

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
        value={opts.rowIndex}
        onChange={onChange("rowIndex")}
        title={t("editor.action.form.label.gs.filters_to_match_row")}
        placeholder="{{ 2 }}"
        expectedType={VALIDATION_TYPES.NUMBER}
      />
    </>
  )
}
DeleteSpreadsheetSubPanel.displayName = "DeleteSpreadsheetSubPanel"
