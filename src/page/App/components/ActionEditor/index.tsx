import { FC, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Api } from "@/api/base"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource } from "@/redux/resource/resourceState"
import { ActionType } from "@/page/App/components/ActionEditor/ResourceForm/interface"
import { ActionList } from "@/page/App/components/ActionEditor/ActionList"
import { ActionEditorPanel } from "@/page/App/components/ActionEditor/ActionEditorPanel"
import { generateName } from "@/page/App/components/ActionEditor/utils"
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
  const [resourceId, setResourceId] = useState("")
  const [isActionDirty, setIsActionDirty] = useState(false)
  const [editorHeight, setEditorHeight] = useState(300)
  const [actionListLoading, setActionListLoading] = useState(false)
  const [activeActionItemId, setActiveActionItemId] = useState<string>("")
  const actionItems = useSelector(selectAllActionItem)

  function updateSeletedItemId(id: string) {
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

  function onAddActionItem(data: Partial<ActionItem>) {
    Api.request(
      {
        url: "/actions",
        method: "POST",
        data,
      },
      ({ data }: { data: ActionItem }) => {
        dispatch(actionActions.addActionItemReducer(data))
        updateActiveActionItemId(data.actionId)
      },
      () => {},
      () => {},
      (loading) => {
        setActionListLoading(loading)
      },
    )
  }

  function onUpdateActionItem(actionId: string, data: Partial<ActionItem>) {
    Api.request(
      {
        url: `/actions/${actionId}`,
        method: "PUT",
        data: data,
      },
      ({ data }: { data: ActionItem }) => {
        dispatch(
          actionActions.updateActionItemReducer({
            ...data,
          }),
        )
      },
      () => {},
      () => {},
      (loading) => {
        setActionListLoading(loading)
      },
    )
  }

  function onDuplicateActionItem(actionId: string = activeActionItemId) {
    const targetItem = actionItems.find((i) => i.actionId === actionId)

    if (targetItem) {
      const actionType = targetItem.actionType
      const { actionId, ...duplicateActionData } = targetItem

      Api.request(
        {
          url: "/actions",
          method: "POST",
          data: {
            ...duplicateActionData,
            displayName: generateName(actionType, actionItems),
          },
        },
        ({ data }: { data: ActionItem }) => {
          dispatch(actionActions.addActionItemReducer(data))
          onDuplicateActionItem(data?.actionId)
        },
        () => {},
        () => {},
        (loading) => {
          setActionListLoading(loading)
        },
      )
    }
  }

  function onDeleteActionItem(actionId: string = activeActionItemId) {
    Api.request(
      {
        url: `/actions/${actionId}`,
        method: "DELETE",
      },
      ({ data }: { data: { actionId: string } }) => {
        dispatch(actionActions.removeActionItemReducer(data?.actionId))
        updateSeletedItemId(data?.actionId)
      },
      () => {},
      () => {},
      (loading) => {
        setActionListLoading(loading)
      },
    )
  }

  useEffect(() => {
    const controller = new AbortController()

    Api.request(
      {
        method: "GET",
        url: "/resources",
        signal: controller.signal,
      },
      ({ data }: { data: Resource[] }) => {
        dispatch(resourceActions.addResourceListReducer(data))
      },
      () => {
        // TODO: handle error
      },
      () => {},
      () => {
        // TODO: handle loading
      },
    )

    Api.request(
      {
        method: "GET",
        url: "/actions",
        signal: controller.signal,
      },
      ({ data }: { data: ActionItem[] }) => {
        dispatch(actionActions.addActionListReducer(data))

        if (data.length) {
          setActiveActionItemId(data[0].actionId)
        }
      },
      () => {
        // TODO: handle error
      },
      () => {},
      (loading) => {
        setActionListLoading(loading)
      },
    )

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const selectedAction = actionItems.find(
      ({ actionId }) => actionId === activeActionItemId,
    )
    selectedAction &&
      dispatch(configActions.updateSelectedAction(selectedAction))
  }, [activeActionItemId, actionItems])

  return (
    <ActionEditorContext.Provider
      value={{
        editorHeight,
        setActionListLoading,
      }}
    >
      <div className={className}>
        <ActionEditorLayout
          updateEditorHeight={(val: number) => {
            setEditorHeight(val)
          }}
          actionList={
            <ActionList
              loading={actionListLoading}
              isActionDirty={isActionDirty}
              onSelectActionItem={updateActiveActionItemId}
              onUpdateActionItem={onUpdateActionItem}
              onAddActionItem={onAddActionItem}
              onDuplicateActionItem={onDuplicateActionItem}
              onDeleteActionItem={onDeleteActionItem}
            />
          }
          actionEditorPanel={
            <ActionEditorPanel
              key={activeActionItemId}
              isActionDirty={isActionDirty}
              onDeleteActionItem={onDeleteActionItem}
              onDuplicateActionItem={onDuplicateActionItem}
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
