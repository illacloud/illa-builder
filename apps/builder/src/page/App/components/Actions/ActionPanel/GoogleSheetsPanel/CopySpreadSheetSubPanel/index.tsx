import { GoogleSheetsActionCopyOpts } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FxIcon } from "@illa-design/react"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import {
  applyFxIconStyle,
  sheetConfigContainerStyle,
  spreadsheetContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/CopySpreadSheetSubPanel/style"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CopySpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange, spreadsheetsOption } = props
  const opts = props.opts as GoogleSheetsActionCopyOpts
  const {
    toSpreadsheet,
    toSheet,
    sheetName,
    spreadsheet,
    fx,
    toFx = false,
  } = opts

  const handleOnClick = () => {
    onChange("toFx")(!toFx)
  }

  return (
    <>
      <BasicSheetConfig
        sheetName={sheetName}
        spreadsheet={spreadsheet}
        onChange={onChange}
        spreadsheetsOption={spreadsheetsOption}
        fx={fx}
      />
      <div css={sheetConfigContainerStyle}>
        <div css={spreadsheetContainerStyle}>
          {toFx ? (
            <InputEditor
              title={t("editor.action.form.label.gs.sheet_to_copy_to")}
              value={toSpreadsheet}
              onChange={onChange("toSpreadsheet")}
              expectedType={VALIDATION_TYPES.STRING}
            />
          ) : (
            <SingleTypeComponent
              title={t("editor.action.form.label.gs.sheet_to_copy_to")}
              componentType="select"
              value={toSpreadsheet}
              onChange={onChange("toSpreadsheet")}
              options={spreadsheetsOption}
            />
          )}
          <FxIcon onClick={handleOnClick} css={applyFxIconStyle(toFx)} />
        </div>
        <div css={spreadsheetContainerStyle}>
          <InputEditor
            title={t("editor.action.form.label.gs.sheet_name")}
            value={toSheet ?? ""}
            onChange={onChange("toSheet")}
            tips={t("editor.action.form.tips.gs.copy_to_sheet_name")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      </div>
    </>
  )
}
CopySpreadsheetSubPanel.displayName = "CopySpreadsheetSubPanel"
