import { FC, useState, useMemo, useRef, MouseEvent, useContext } from "react"
import { Api } from "@/api/base"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { Input } from "@illa-design/input"
import {
  AddIcon,
  WarningCircleIcon,
  EmptyStateIcon,
  RestApiIcon,
} from "@illa-design/icon"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { generateName } from "@/page/App/components/ActionEditor/utils"
import { ActionGenerator } from "@/page/App/components/ActionEditor/ActionGenerator"
import { ActionInfo } from "@/page/App/components/ActionEditor/ActionGenerator/interface"
import {
  actionListContainerStyle,
  newBtnContainerStyle,
  newButtonTextStyle,
  actionItemListStyle,
  applyactionItemStyle,
  actionItemNameStyle,
  applyactionItemNameTextStyle,
  actionItemIconStyle,
  actionItemTimeStyle,
  warningIndicatorStyle,
  updatedIndicatorStyle,
  noMatchFoundWrapperStyle,
  emptyActionListPlaceholderStyle,
} from "./style"
import { ActionListProps } from "./interface"
import { SearchHeader } from "./SearchHeader"
import { ContextMenu } from "./ContextMenu"

export const ActionList: FC<ActionListProps> = (props) => {
  const {
    isActionDirty = false,
    onAddActionItem,
    onDuplicateActionItem,
    onDeleteActionItem,
    onSelectActionItem,
  } = props

  const { activeActionItemId } = useContext(ActionEditorContext)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const actionItems = useSelector(selectAllActionItem)

  const [query, setQuery] = useState<string>("")
  const [editingName, setEditingName] = useState("")
  const [editingActionItemId, setEditingActionItemId] = useState("")
  const [contextMenuActionId, setContextMenuActionId] = useState("")
  const [actionGeneratorVisible, setActionGeneratorVisible] = useState(false)
  const [newActionLoading, setNewActionLoading] = useState(false)
  const [contextMenuEvent, setContextMenuEvent] = useState<MouseEvent>()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const matchedActionItems = useMemo(() => {
    if (query === "") {
      return actionItems
    }

    return actionItems.filter(({ displayName }) =>
      displayName.toLowerCase().includes(query.toLowerCase()),
    )
  }, [actionItems, query])

  const actionItemsNameSet = useMemo(() => {
    return new Set(actionItems.map((i) => i.displayName))
  }, [actionItems])

  function editName(id: string, name: string) {
    setEditingActionItemId(id)
    setEditingName(name)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  function updateName() {
    dispatch(
      actionActions.updateActionItemReducer({
        actionId: editingActionItemId,
        displayName: editingName,
      }),
    )
    setEditingActionItemId("")
    setEditingName("")
  }

  const actionItemsList = matchedActionItems.map((item) => {
    const { actionId: id, displayName: name, status } = item
    const isWarning = status === "warning"
    // TODO: time should retrieve from ActionItem.network
    const time = "0.7s"
    const icon = <RestApiIcon />
    const isSelected = id === activeActionItemId

    function renderName() {
      if (id === editingActionItemId) {
        return (
          <Input
            inputRef={inputRef}
            requirePadding={false}
            value={editingName}
            onChange={(value) => setEditingName(value)}
            onBlur={updateName}
            onPressEnter={updateName}
          />
        )
      }

      return (
        <span
          css={actionItemNameStyle}
          onDoubleClick={() => editName(id, name)}
        >
          <span
            css={applyactionItemNameTextStyle(isWarning ?? false)}
            title={name}
          >
            {name}
          </span>
          {isActionDirty && isSelected && (
            <span css={updatedIndicatorStyle}></span>
          )}
        </span>
      )
    }

    return (
      <li
        key={id}
        css={applyactionItemStyle(isSelected)}
        onClick={() => onClickActionItem(id, name)}
        onContextMenu={(e: MouseEvent) => {
          setContextMenuActionId(id)
          setContextMenuEvent(e)
        }}
      >
        <span css={actionItemIconStyle}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={warningIndicatorStyle} size={"8px"} />
          )}
        </span>
        {renderName()}
        <span css={actionItemTimeStyle}>{time}</span>
      </li>
    )
  })

  function onClickActionItem(id: string, name: string) {
    if (actionItems.length === 1) {
      editName(id, name)
    }

    onSelectActionItem(id)
  }

  function onAddAction(info: ActionInfo) {
    const { category, type, resourceId = "" } = info
    setActionGeneratorVisible(false)

    let actionTemplate

    if (category === "jsTransformer") {
      actionTemplate = { transformer: "" }
    }

    Api.request(
      {
        url: "/actions",
        method: "POST",
        data: {
          displayName: generateName(type, actionItems, actionItemsNameSet),
          type,
          resourceId,
          actionTemplate,
        },
      },
      ({ data }: { data: ActionItem }) => {
        dispatch(actionActions.addActionItemReducer(data))
        onAddActionItem(data?.actionId)
      },
      () => { },
      () => { },
      (loading) => {
        setNewActionLoading(loading)
      },
    )
  }

  function onDuplicate() {
    const newActionItems = actionItems.slice(0)
    const targetItem = newActionItems.find(
      (i) => i.actionId === contextMenuActionId,
    )

    if (targetItem) {
      const type = targetItem.type
      const id = uuidV4()

      dispatch(
        actionActions.addActionItemReducer({
          actionId: id,
          type,
          displayName: generateName(type, actionItems, actionItemsNameSet),
        }),
      )

      onDuplicateActionItem(id)
    }
  }

  function onDelete() {
    dispatch(actionActions.removeActionItemReducer(contextMenuActionId))
    onDeleteActionItem(contextMenuActionId)
  }

  const NoMatchFound = (
    <div css={noMatchFoundWrapperStyle}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>{t("editor.action.action_list.tips.not_found")}</span>
    </div>
  )

  const renderActionItemList = () => {
    if (matchedActionItems.length === 0) {
      if (query !== "") {
        return NoMatchFound
      }

      return (
        <span css={emptyActionListPlaceholderStyle}>
          {t("editor.action.action_list.tips.empty")}
        </span>
      )
    }

    return actionItemsList
  }
  return (
    <div css={actionListContainerStyle}>
      <SearchHeader updateAction={setQuery} />

      <div css={newBtnContainerStyle}>
        <Button
          autoFullHorizontal
          colorScheme="techPurple"
          variant="light"
          buttonRadius="8px"
          size={"medium"}
          leftIcon={<AddIcon />}
          loading={newActionLoading}
          disabled={newActionLoading}
          onClick={() => setActionGeneratorVisible(true)}
        >
          <span css={newButtonTextStyle}>
            {t("editor.action.action_list.btn.new")}
          </span>
        </Button>
      </div>

      <ul css={actionItemListStyle}>{renderActionItemList()}</ul>

      <ContextMenu
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        contextMenuEvent={contextMenuEvent}
      />

      <ActionGenerator
        visible={actionGeneratorVisible}
        onClose={() => setActionGeneratorVisible(false)}
        onAddAction={onAddAction}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
