import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { FxIcon } from "@illa-design/react"
import {
  fxIconStyle,
  sheetConfigContainerStyle,
  spreadsheetContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig/style"
import { BasicSheetConfigProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/InputEditor"

export const BasicSheetConfig: FC<BasicSheetConfigProps> = (props) => {
  const {
    spreadsheet,
    sheetName,
    copyTo,
    onChange,
    showSpreadsheet = true,
    showCopyTo = false,
  } = props
  const { t } = useTranslation()

  const [showInput, setShowInput] = useState<boolean>(false)

  const handleOnClick = () => {
    setShowInput((v) => !v)
  }

  return (
    <div css={sheetConfigContainerStyle}>
      {showSpreadsheet && (
        <div css={spreadsheetContainerStyle}>
          {showInput ? (
            <InputEditor
              title={t("editor.action.form.label.gs.spreadsheet")}
              value={spreadsheet}
              onChange={onChange("spreadsheet")}
            />
          ) : (
            <SingleTypeComponent
              title={t("editor.action.form.label.gs.spreadsheet")}
              componentType="select"
              value={spreadsheet}
              onChange={onChange("spreadsheet")}
            />
          )}
          <FxIcon onClick={handleOnClick} css={fxIconStyle} />
        </div>
      )}
      {showCopyTo && (
        <div css={spreadsheetContainerStyle}>
          {showInput ? (
            <InputEditor
              title={"Sheet to copy to"}
              value={copyTo ?? ""}
              onChange={onChange("copyTo")}
            />
          ) : (
            <SingleTypeComponent
              title={"Sheet to copy to"}
              componentType="select"
              value={copyTo ?? ""}
              onChange={onChange("copyTo")}
            />
          )}
          <FxIcon onClick={handleOnClick} css={fxIconStyle} />
        </div>
      )}
      <div css={spreadsheetContainerStyle}>
        <InputEditor
          title={t("editor.action.form.label.gs.sheet_name")}
          value={sheetName}
          onChange={onChange("sheetName")}
          tips={t("editor.action.form.tips.gs.leave_blank_to_selec")}
        />
      </div>
    </div>
  )
}
BasicSheetConfig.displayName = "BasicSheetConfig"
