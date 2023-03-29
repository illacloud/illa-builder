import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { FxIcon } from "@illa-design/react"
import {
  getFxIconStyle,
  sheetConfigContainerStyle,
  spreadsheetContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig/style"
import { BasicSheetConfigProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const BasicSheetConfig: FC<BasicSheetConfigProps> = (props) => {
  const { spreadsheet, sheetName, onChange, isHiddenSheetName = false } = props
  const { t } = useTranslation()

  const [showInput, setShowInput] = useState<boolean>(false)

  const handleOnClick = () => {
    setShowInput((v) => !v)
  }

  return (
    <div css={sheetConfigContainerStyle}>
      <div css={spreadsheetContainerStyle}>
        {showInput ? (
          <InputEditor
            title={t("editor.action.form.label.gs.spreadsheet")}
            value={spreadsheet}
            onChange={onChange("spreadsheet")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        ) : (
          <SingleTypeComponent
            title={t("editor.action.form.label.gs.spreadsheet")}
            componentType="select"
            value={spreadsheet}
            onChange={onChange("spreadsheet")}
          />
        )}
        <FxIcon
          onClick={handleOnClick}
          css={getFxIconStyle(isHiddenSheetName)}
        />
      </div>
      {!isHiddenSheetName && (
        <div css={spreadsheetContainerStyle}>
          <InputEditor
            title={t("editor.action.form.label.gs.sheet_name")}
            value={sheetName ?? ""}
            onChange={onChange("sheetName")}
            tips={t("editor.action.form.tips.gs.leave_blank_to_selec")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      )}
    </div>
  )
}
BasicSheetConfig.displayName = "BasicSheetConfig"
