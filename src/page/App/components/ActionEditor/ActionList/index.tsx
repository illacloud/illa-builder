import { FC, useState, useMemo, useRef, MouseEvent, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
import { Input } from "@illa-design/input"
import {
  AddIcon,
  WarningCircleIcon,
  EmptyStateIcon,
  RestApiIcon,
} from "@illa-design/icon"
import { selectAllActionItem } from "@/redux/currentApp/action/actionList/actionListSelector"
import { actionListActions } from "@/redux/currentApp/action/actionList/actionListSlice"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { generateName } from "@/page/App/components/ActionEditor/utils"
import {
  actionListContainerStyle,
  applynewButtonStyle,
  newButtonTextStyle,
  newButtonIconStyle,
  newActionOptionsListStyle,
  newActionOptionsItemStyle,
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

  const [newActionOptionsVisible, setNewActionOptionsVisible] = useState(false)
  const [query, setQuery] = useState<string>("")
  const [editingName, setEditingName] = useState("")
  const [editingActionItemId, setEditingActionItemId] = useState("")
  const [contextMenuActionId, setContextMenuActionId] = useState("")
  const [contextMenuEvent, setContextMenuEvent] = useState<MouseEvent>()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const matchedActionItems = useMemo(() => {
    if (query === "") {
      return actionItems
    }

    return actionItems.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [actionItems, query])

  const actionItemsNameSet = useMemo(() => {
    return new Set(actionItems.map((i) => i.name))
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
      actionListActions.updateActionItemReducer({
        id: editingActionItemId,
        name: editingName,
      }),
    )
    setEditingActionItemId("")
    setEditingName("")
  }

  const actionItemsList = matchedActionItems.map((item) => {
    const { id, name, status } = item
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

  const newNewActionOptions = (
    <ul css={newActionOptionsListStyle}>
      <li css={newActionOptionsItemStyle} onClick={addAction}>
        {t("editor.action.action_list.menu.resource_action")}
      </li>
      <li css={newActionOptionsItemStyle} onClick={addTransformer}>
        {t("editor.action.action_list.menu.javascript_transformer")}
      </li>
    </ul>
  )

  function addAction() {
    addActionItem("action")
  }

  function addTransformer() {
    addActionItem("transformer")
  }

  function addActionItem(type: "action" | "transformer") {
    const id = uuidV4()

    dispatch(
      actionListActions.addActionItemReducer({
        id,
        type,
        name: generateName(type, actionItems, actionItemsNameSet),
      }),
    )

    onAddActionItem(id)
  }

  function onDuplicate() {
    const newActionItems = actionItems.slice(0)
    const targetItem = newActionItems.find((i) => i.id === contextMenuActionId)

    if (targetItem) {
      const type = targetItem.type
      const id = uuidV4()

      dispatch(
        actionListActions.addActionItemReducer({
          id,
          type,
          name: generateName(type, actionItems, actionItemsNameSet),
        }),
      )

      onDuplicateActionItem(id)
    }
  }

  function onDelete() {
    dispatch(actionListActions.removeActionItemReducer(contextMenuActionId))
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

      <Dropdown
        dropList={newNewActionOptions}
        trigger={"click"}
        triggerProps={{
          clickOutsideToClose: true,
          closeOnClick: true,
          openDelay: 0,
          closeDelay: 0,
        }}
        onVisibleChange={(visible) => setNewActionOptionsVisible(visible)}
      >
        <Button
          css={applynewButtonStyle(newActionOptionsVisible)}
          size={"medium"}
        >
          <span css={newButtonTextStyle}>
            <AddIcon css={newButtonIconStyle} />
            {t("editor.action.action_list.btn.new")}
          </span>
        </Button>
      </Dropdown>

      <ul css={actionItemListStyle}>{renderActionItemList()}</ul>

      <ContextMenu
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        contextMenuEvent={contextMenuEvent}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
