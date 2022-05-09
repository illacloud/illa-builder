import { FC, useState, useRef } from "react"
import { QueryList } from "./QueryList"
import { ActionEditorPanel } from "./ActionEditorPanel"
import { ActionEditorPanelWrapper } from "./style"
import { FormContainer } from "./FormContainer"
import { ActionEditorProps } from "./interface"
import { ActionEditorLayout } from "./layout"
import { ActionType } from "@/page/Editor/components/ActionEditor/FormContainer/interface"

export const ActionEditor: FC<ActionEditorProps> = (props) => {
  const { className } = props
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")

  return (
    <div css={ActionEditorPanelWrapper}>
      <ActionEditorLayout
        queryList={<QueryList />}
        actionEditorPanel={
          <ActionEditorPanel
            onCreateResource={() => {
              setActionType("select")
              setFormVisible(true)
            }}
            onEditResource={() => {
              setActionType("edit")
              setFormVisible(true)
            }}
          />
        }
      />

      <FormContainer
        visible={formVisible}
        actionType={actionType}
        onCancel={() => setFormVisible(false)}
      />
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
