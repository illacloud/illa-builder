import { FC } from "react"
import { MSSQLModeProps } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { MicrosoftSqlActionSqlMode } from "@/redux/currentApp/action/microsoftSqlAction"

export const MSSQLSqlMode: FC<MSSQLModeProps> = (props) => {
  const { modeContent, onChange } = props

  return (
    <>
      <InputEditor
        title={"Query"}
        style={{ height: "88px" }}
        placeholder={"select * from users;"}
        lineNumbers={true}
        value={(modeContent as MicrosoftSqlActionSqlMode).sql}
        onChange={(value) => onChange(value, "sql")}
      />
    </>
  )
}
MSSQLSqlMode.displayName = "MSSQLSqlMode"
