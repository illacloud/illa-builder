import { MicrosoftSqlActionSqlMode } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { MSSQLModeProps } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const MSSQLSqlMode: FC<MSSQLModeProps> = (props) => {
  const { modeContent, showSafeModeTips, onChange } = props
  const { t } = useTranslation()

  return (
    <InputEditor
      title={t("editor.action.panel.mssql.query")}
      style={{ height: "88px" }}
      placeholder={t("editor.action.panel.mssql.placeholder.query")}
      lineNumbers={true}
      value={(modeContent as MicrosoftSqlActionSqlMode).sql}
      onChange={(value) => onChange(value, "sql")}
      showSafeModeTips={showSafeModeTips}
    />
  )
}
MSSQLSqlMode.displayName = "MSSQLSqlMode"
