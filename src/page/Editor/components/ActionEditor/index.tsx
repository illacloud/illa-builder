import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import { ActionType } from "@/page/Editor/components/ActionEditor/ResourceForm/interface"
import { ActionList } from "@/page/Editor/components/ActionEditor/ActionList"
import { ActionEditorPanel } from "@/page/Editor/components/ActionEditor/ActionEditorPanel"
import { ActionEditorPanelWrapper } from "./style"
import { ResourceForm } from "./ResourceForm"
import { ActionEditorProps } from "./interface"
import { ActionEditorLayout } from "./layout"
import { ActionEditorContext } from "./context"

export const ActionEditor: FC<ActionEditorProps> = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")
  const [resourceId, setResourceId] = useState("")
  const [isActionDirty, setIsActionDirty] = useState(false)
  const [activeActionItemId, setActiveActionItemId] = useState<string>("")

  const actionItems = useSelector(selectAllActionItem)

  function onDeleteActionItem(id: string) {
    const { length } = actionItems

    if (id !== activeActionItemId) {
      return
    }

    const lastItemId = actionItems[length - 1].id

    if (id === lastItemId && length > 1) {
      setActiveActionItemId(actionItems[length - 2].id)
    } else {
      setActiveActionItemId(lastItemId)
    }
  }

  return (
    <ActionEditorContext.Provider
      value={{
        activeActionItemId,
        resourceId,
      }}
    >
      <div css={ActionEditorPanelWrapper}>
        <ActionEditorLayout
          actionList={
            <ActionList
              isActionDirty={isActionDirty}
              activeActionItemId={activeActionItemId}
              onSelectActionItem={setActiveActionItemId}
              onAddActionItem={setActiveActionItemId}
              onDuplicateActionItem={setActiveActionItemId}
              onDeleteActionItem={onDeleteActionItem}
            />
          }
          actionEditorPanel={
            <ActionEditorPanel
              activeActionItemId={activeActionItemId}
              onDeleteActionItem={onDeleteActionItem}
              onDuplicateActionItem={setActiveActionItemId}
              onCreateResource={() => {
                setActionType("select")
                setFormVisible(true)
              }}
              onEditResource={(id: string) => {
                setResourceId(id)
                setActionType("edit")
                setFormVisible(true)
              }}
            />
          }
        />

        <ResourceForm
          visible={formVisible}
          actionType={actionType}
          resourceId={resourceId}
          onCancel={() => setFormVisible(false)}
        />
      </div>
    </ActionEditorContext.Provider>
  )
}

ActionEditor.displayName = "ActionEditor"
