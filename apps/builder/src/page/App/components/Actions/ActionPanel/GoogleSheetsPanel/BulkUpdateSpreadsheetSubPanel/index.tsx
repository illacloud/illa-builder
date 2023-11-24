import { GoogleSheetsActionBulkOpts } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const BulkUpdateSpreadsheetSubPanel: FC<
  GoogleSheetsActionSubPanelProps
> = (props) => {
  const { t } = useTranslation()
  const { onChange, spreadsheetsOption } = props
  const opts = props.opts as GoogleSheetsActionBulkOpts

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
        value={opts.primaryKey}
        onChange={onChange("primaryKey")}
        title={t("editor.action.form.label.gs.primary_key_column")}
        placeholder={t("editor.action.form.placeholder.gs.primary_key_column")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        value={opts.rowsArray}
        lineNumbers
        style={{ height: "88px" }}
        onChange={onChange("rowsArray")}
        title={t("editor.action.form.label.gs.array_of_rows_to_upd")}
        placeholder={t(
          "editor.action.form.placeholder.gs.array_of_rows_to_upd",
        )}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
    </>
  )
}
BulkUpdateSpreadsheetSubPanel.displayName = "BulkUpdateSpreadsheetSubPanel"
