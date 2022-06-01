import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { selectAllActionItem } from "@/redux/currentApp/action/actionList/actionListSelector"
import { ActionType } from "@/page/Editor/components/ActionEditor/ResourceForm/interface"
import { ActionList } from "@/page/Editor/components/ActionEditor/ActionList"
import { ActionEditorPanel } from "@/page/Editor/components/ActionEditor/ActionEditorPanel"
import { ResourceForm } from "./ResourceForm"
import { ActionEditorProps } from "./interface"
import { ActionEditorLayout } from "./layout"
import { ActionEditorContext } from "./context"

export const ActionEditor: FC<ActionEditorProps> = () => {
  const { t } = useTranslation()
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")
  const [resourceId, setResourceId] = useState("preset_REST API")
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
      updateActiveActionItemId(actionItems[length - 2].id)
    } else {
      updateActiveActionItemId(lastItemId)
    }
  }

  function updateActiveActionItemId(id: string) {
    if (
      isActionDirty &&
      !confirm(t("editor.action.action_list.message.confirm_switch"))
    ) {
      return
    }

    setIsActionDirty(false)
    setActiveActionItemId(id)
    const resourceId =
      actionItems.find(({ id: actionItemId }) => id === actionItemId)
        ?.resourceId ?? "preset_REST API"

    setResourceId(resourceId)
  }

  return (
    <ActionEditorContext.Provider
      value={{
        activeActionItemId,
        resourceId,
      }}
    >
      <div>
        <ActionEditorLayout
          actionList={
            <ActionList
              isActionDirty={isActionDirty}
              onSelectActionItem={updateActiveActionItemId}
              onAddActionItem={updateActiveActionItemId}
              onDuplicateActionItem={updateActiveActionItemId}
              onDeleteActionItem={onDeleteActionItem}
            />
          }
          actionEditorPanel={
            <ActionEditorPanel
              key={activeActionItemId}
              isActionDirty={isActionDirty}
              onDeleteActionItem={onDeleteActionItem}
              onDuplicateActionItem={updateActiveActionItemId}
              onCreateResource={() => {
                setActionType("select")
                setFormVisible(true)
              }}
              onEditResource={(id: string) => {
                setResourceId(id)
                setActionType("edit")
                setFormVisible(true)
              }}
              onChangeResource={setResourceId}
              onChange={() => setIsActionDirty(true)}
              onSave={() => setIsActionDirty(false)}
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
