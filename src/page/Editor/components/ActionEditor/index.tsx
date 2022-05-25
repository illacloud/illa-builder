import { FC, useState } from "react"
import { ActionType } from "@/page/Editor/components/ActionEditor/FormContainer/interface"
import { ActionList } from "@/page/Editor/components/ActionEditor/ActionList"
import { ActionEditorPanel } from "@/page/Editor/components/ActionEditor/ActionEditorPanel"
import { ActionEditorPanelWrapper } from "./style"
import { FormContainer } from "./FormContainer"
import { ActionEditorProps } from "./interface"
import { ActionEditorLayout } from "./layout"

export const ActionEditor: FC<ActionEditorProps> = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")
  const [isActionDirty, setIsActionDirty] = useState(false)
  const [activeActionItemId, setActiveActionItemId] = useState<string>("")

  return (
    <div css={ActionEditorPanelWrapper}>
      <ActionEditorLayout
        actionList={
          <ActionList
            isActionDirty={isActionDirty}
            setIsActionDirty={setIsActionDirty}
            activeActionItemId={activeActionItemId}
            setActiveActionItemId={setActiveActionItemId}
          />
        }
        actionEditorPanel={
          <ActionEditorPanel
            activeActionItemId={activeActionItemId}
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
