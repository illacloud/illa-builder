import { FC, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Api } from "@/api/base"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { resourceActions } from "@/redux/currentApp/resource/resourceSlice"
import { Resource } from "@/redux/currentApp/resource/resourceState"
import { ActionType } from "@/page/App/components/ActionEditor/ResourceForm/interface"
import { ActionList } from "@/page/App/components/ActionEditor/ActionList"
import { ActionEditorPanel } from "@/page/App/components/ActionEditor/ActionEditorPanel"
import { ResourceForm } from "./ResourceForm"
import { ActionEditorProps } from "./interface"
import { ActionEditorLayout } from "./layout"
import { ActionEditorContext } from "./context"

export const ActionEditor: FC<ActionEditorProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")
  const [resourceId, setResourceId] = useState("preset_REST API")
  const [isActionDirty, setIsActionDirty] = useState(false)
  const [editorHeight, setEditorHeight] = useState(300)
  const [activeActionItemId, setActiveActionItemId] = useState<string>("")

  const actionItems = useSelector(selectAllActionItem)

  function onDeleteActionItem(id: string) {
    const { length } = actionItems

    if (id !== activeActionItemId) {
      return
    }

    const lastItemId = actionItems[length - 1].actionId

    if (id === lastItemId && length > 1) {
      updateActiveActionItemId(actionItems[length - 2].actionId)
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
  }

  useEffect(() => {
    Api.request(
      {
        method: "GET",
        url: "/resources",
      },
      ({ data }: { data: Resource[] }) => {
        dispatch(resourceActions.addResourceListReducer(data))
      },
    )
  }, [])

  useEffect(() => {
    const resourceId =
      actionItems.find(({ actionId }) => activeActionItemId === actionId)
        ?.resourceId ?? ""

    setResourceId(resourceId)
  }, [activeActionItemId, actionItems])

  return (
    <ActionEditorContext.Provider
      value={{
        activeActionItemId,
        resourceId,
        editorHeight,
      }}
    >
      <div className={className}>
        <ActionEditorLayout
          updateEditorHeight={(val: number) => {
            setEditorHeight(val)
          }}
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
