import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { FxIcon } from "@illa-design/react"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import {
  fxIconStyle,
  sheetConfigContainerStyle,
  spreadsheetContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/CopySpreadSheetSubPanel/style"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/InputEditor"
import { GoogleSheetsActionCopyOpts } from "@/redux/currentApp/action/googleSheetsAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CopySpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange } = props
  const opts = props.opts as GoogleSheetsActionCopyOpts
  const { toSpreadsheet, toSheet, sheetName, spreadsheet } = opts
  const [showInput, setShowInput] = useState<boolean>(false)

  const handleOnClick = () => {
    setShowInput((v) => !v)
  }

  return (
    <>
      <BasicSheetConfig
        sheetName={sheetName}
        spreadsheet={spreadsheet}
        onChange={onChange}
      />
      <div css={sheetConfigContainerStyle}>
        <div css={spreadsheetContainerStyle}>
          {showInput ? (
            <InputEditor
              title={t("editor.action.form.label.gs.spreadsheet")}
              value={toSpreadsheet}
              onChange={onChange("toSpreadsheet")}
              expectedType={VALIDATION_TYPES.STRING}
            />
          ) : (
            <SingleTypeComponent
              title={t("editor.action.form.label.gs.spreadsheet")}
              componentType="select"
              value={toSpreadsheet}
              onChange={onChange("toSpreadsheet")}
            />
          )}
          <FxIcon onClick={handleOnClick} css={fxIconStyle} />
        </div>
        <div css={spreadsheetContainerStyle}>
          <InputEditor
            title={t("editor.action.form.label.gs.sheet_name")}
            value={toSheet ?? ""}
            onChange={onChange("toSheet")}
            tips={t("editor.action.form.tips.gs.leave_blank_to_selec")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      </div>
    </>
  )
}
CopySpreadsheetSubPanel.displayName = "CopySpreadsheetSubPanel"
