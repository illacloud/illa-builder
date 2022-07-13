import { FC, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Modal } from "@illa-design/modal"
import { Api } from "@/api/base"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { getSelectedAction } from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource } from "@/redux/resource/resourceState"
import { ActionType } from "@/page/App/components/ActionEditor/ResourceForm/interface"
import { ActionList } from "@/page/App/components/ActionEditor/ActionList"
import { ActionEditorPanel } from "@/page/App/components/ActionEditor/ActionEditorPanel"
import { ResourceForm } from "./ResourceForm"
import { ActionEditorLayout } from "./Layout"
import { ActionEditorProps } from "./interface"
import { ActionEditorContext } from "./context"

export const ActionEditor: FC<ActionEditorProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const params = useParams()
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")
  const [isActionDirty, setIsActionDirty] = useState(false)
  const [editorHeight, setEditorHeight] = useState(300)
  const [actionListLoading, setActionListLoading] = useState(false)
  const [activeActionItemId, setActiveActionItemId] = useState<string>("")
  const actionItems = useSelector(selectAllActionItem)
  const { resourceId = "" } = useSelector(getSelectedAction)
  const baseActionApi = `/versions/${params.versionId}/actions`

  function updateSeletedItemId(id: string) {
    const { length } = actionItems

    if (id !== activeActionItemId) {
      return
    }

    const lastItemId = actionItems[length - 1].actionId

    if (id === lastItemId) {
      if (length === 1) {
        dispatch(
          configActions.updateSelectedAction({
            actionId: "",
            displayName: "",
            actionType: "",
            actionTemplate: {},
          }),
        )
      } else {
        updateActiveActionItemId(actionItems[length - 2].actionId)
      }
    } else {
      updateActiveActionItemId(lastItemId)
    }
  }

  function updateActiveActionItemId(id: string) {
    if (isActionDirty) {
      Modal.confirm({
        content: t("editor.action.action_list.message.confirm_switch"),
        onOk: () => {
          setIsActionDirty(false)
          setActiveActionItemId(id)
        },
      })

      return
    }

    setIsActionDirty(false)
    setActiveActionItemId(id)
  }

  function onAddActionItem(data: Omit<ActionItem, "actionId">) {
    Api.request(
      {
        url: baseActionApi,
        method: "POST",
        data,
      },
      ({ data }: { data: ActionItem }) => {
        dispatch(actionActions.addActionItemReducer(data))
        updateActiveActionItemId(data.actionId)
      },
      () => {
        DisplayNameGenerator.removeDisplayName(data.displayName)
      },
      () => {},
      (loading) => {
        setActionListLoading(loading)
      },
    )
  }

  function onUpdateActionItem(
    actionId: string,
    data: ActionItem & { oldDisplayName?: string },
  ) {
    const {
      resourceId,
      actionType,
      displayName,
      actionTemplate = {},
      oldDisplayName,
    } = data

    // cache new name
    DisplayNameGenerator.updateDisplayName(displayName)

    Api.request(
      {
        url: `${baseActionApi}/${actionId}`,
        method: "PUT",
        data: {
          resourceId,
          actionType,
          displayName,
          actionTemplate,
        },
      },
      ({ data }: { data: ActionItem }) => {
        dispatch(
          actionActions.updateActionItemReducer({
            ...data,
          }),
        )

        // remove old name from cache
        oldDisplayName && DisplayNameGenerator.removeDisplayName(oldDisplayName)
      },
      () => {
        // remove new name from cache
        oldDisplayName && DisplayNameGenerator.removeDisplayName(displayName)
      },
      () => {},
      (loading) => {
        setActionListLoading(loading)
      },
    )
  }

  function onDuplicateActionItem(actionId: string = activeActionItemId) {
    const targetItem = actionItems.find((i) => i.actionId === actionId)

    if (targetItem) {
      const { resourceId, actionType, actionTemplate = {} } = targetItem
      const displayName = DisplayNameGenerator.getDisplayName(actionType)

      Api.request(
        {
          url: baseActionApi,
          method: "POST",
          data: {
            resourceId,
            actionType,
            actionTemplate,
            displayName,
          },
        },
        ({ data }: { data: ActionItem }) => {
          dispatch(actionActions.addActionItemReducer(data))
          onDuplicateActionItem(data?.actionId)
        },
        () => {
          DisplayNameGenerator.removeDisplayName(displayName)
        },
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
        url: `${baseActionApi}/${actionId}`,
        method: "DELETE",
      },
      ({ data }: { data: { actionId: string } }) => {
        const removedActionId = data.actionId
        const removedActionName = actionItems.find(
          ({ actionId }) => actionId === removedActionId,
        )?.displayName

        removedActionName &&
          DisplayNameGenerator.removeDisplayName(removedActionName)
        dispatch(actionActions.removeActionItemReducer(removedActionId))
        setIsActionDirty(false)
        updateSeletedItemId(removedActionId)
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
        url: baseActionApi,
        signal: controller.signal,
      },
      ({ data }: { data: ActionItem[] }) => {
        dispatch(actionActions.updateActionListReducer(data))

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
        setIsActionDirty,
        baseActionApi,
        isActionDirty,
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
              onEditResource={() => {
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
