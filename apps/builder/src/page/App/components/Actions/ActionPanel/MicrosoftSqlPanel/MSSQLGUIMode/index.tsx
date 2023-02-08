import { FC } from "react"
import { Select } from "@illa-design/react"
import { MSSQLModeProps } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  actionItemStyle,
  codeEditorLabelStyle,
} from "@/page/App/components/InputEditor/style"
import { MicrosoftSqlActionGUIMode } from "@/redux/currentApp/action/microsoftSqlAction"

export const MSSQLGUIMode: FC<MSSQLModeProps> = (props) => {
  const { modeContent, onChange } = props
  const newModeContent = modeContent as MicrosoftSqlActionGUIMode

  return (
    <>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>Table</span>
        <Select
          colorScheme="techPurple"
          showSearch={true}
          defaultValue={newModeContent.table}
          value={newModeContent.table}
          ml="16px"
          mr="0"
          width="100%"
          placeholder={"Select a table"}
          onChange={(value: string) => onChange(value, "table")}
          options={[
            {
              label: "Test",
              value: "text",
            },
          ]}
        />
      </div>
      <InputEditor
        style={{ height: "88px" }}
        title={"Array of records to insert"}
        placeholder={"{{ [{x1:1, y1:1}, {x2:1, y2:1},...] }}"}
        lineNumbers={true}
        value={newModeContent.records}
        onChange={(value) => onChange(value, "records")}
      />
    </>
  )
}
MSSQLGUIMode.displayName = "MSSQLGUIMode"
