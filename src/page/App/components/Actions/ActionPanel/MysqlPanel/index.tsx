import { FC } from "react"
import {
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { useDispatch } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { configActions } from "@/redux/config/configSlice"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { MysqlPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { EditorModes } from "@/components/CodeEditor/interface"

export const MysqlPanel: FC<MysqlPanelProps> = (props) => {
  const dispatch = useDispatch()

  const currentAction = props.action
  const currentContent = props.action.content

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose action={currentAction} />
      <CodeEditor
        placeholder="select * from users;"
        lineNumbers={true}
        height="88px"
        css={sqlInputStyle}
        value={currentContent.query}
        mode="SQL_JS"
        expectedType={VALIDATION_TYPES.STRING}
        onChange={(value) => {
          dispatch(
            configActions.updateSelectedAction({
              ...currentAction,
              content: {
                ...currentContent,
                query: value,
              },
            }),
          )
        }}
      />
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MysqlPanel.displayName = "MysqlPanel"
