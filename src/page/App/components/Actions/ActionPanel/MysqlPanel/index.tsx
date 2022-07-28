import { FC } from "react"
import {
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { configActions } from "@/redux/config/configSlice"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const MysqlPanel: FC = () => {
  const action = useSelector(getSelectedAction)!!
  const dispatch = useDispatch()

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      {/*  TODO: @longbo value is empty*/}
      <CodeEditor
        tables={action.content}
        placeholder="select * from users;"
        lineNumbers={true}
        height="88px"
        css={sqlInputStyle}
        mode="SQL_JS"
        expectedType={VALIDATION_TYPES.STRING}
        onChange={(value) => {
          dispatch(
            configActions.updateSelectedAction({
              ...action,
              content: {
                ...action.content,
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
