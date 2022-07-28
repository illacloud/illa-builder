import { FC, useState } from "react"
import {
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { useDispatch, useSelector } from "react-redux"
import {
  getSelectedAction,
  getSelectedContent,
} from "@/redux/config/configSelector"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { configActions } from "@/redux/config/configSlice"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { MysqlAction } from "@/redux/currentApp/action/mysqlAction"
import { ResourceEditor } from "@/page/Dashboard/DashboardResources/ResourceEditor"

export const MysqlPanel: FC = () => {
  const dispatch = useDispatch()
  const [editorVisible, setEditorVisible] = useState<boolean>()
  const [editType, setEditType] = useState<boolean>()
  const currentAction = useSelector(
    getSelectedAction,
  ) as ActionItem<MysqlAction>

  const currentContent = (useSelector(getSelectedContent) ??
    getInitialContent(currentAction.actionType)) as MysqlAction

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose
        onChange={(type) => {
          setEditType(type)
          setEditorVisible(true)
        }}
      />
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
      <ResourceEditor
        visible={editorVisible}
        edit={editType}
        resourceId={currentAction.resourceId}
        onClose={() => {
          setEditorVisible(false)
        }}
      />
    </div>
  )
}

MysqlPanel.displayName = "MysqlPanel"
