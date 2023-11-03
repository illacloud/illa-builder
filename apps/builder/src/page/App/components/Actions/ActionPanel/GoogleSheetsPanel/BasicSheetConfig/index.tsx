import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FxIcon } from "@illa-design/react"
import {
  getFxIconStyle,
  sheetConfigContainerStyle,
  spreadsheetContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig/style"
import { BasicSheetConfigProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const BasicSheetConfig: FC<BasicSheetConfigProps> = (props) => {
  const {
    spreadsheet,
    sheetName,
    onChange,
    spreadsheetsOption,
    isHiddenSheetName = false,
    fx,
  } = props
  const { t } = useTranslation()

  const handleOnClick = () => {
    onChange("fx")(!fx)
  }

  return (
    <div css={sheetConfigContainerStyle}>
      <div css={spreadsheetContainerStyle}>
        {fx ? (
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
            options={spreadsheetsOption}
          />
        )}
        <FxIcon
          onClick={handleOnClick}
          css={getFxIconStyle(isHiddenSheetName, fx)}
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
