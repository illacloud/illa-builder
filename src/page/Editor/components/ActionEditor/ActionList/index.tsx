import {
  FC,
  useState,
  useMemo,
  useRef,
  MouseEvent,
  forwardRef,
  useContext,
} from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useClickAway } from "react-use"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
import { Input } from "@illa-design/input"
import { Menu } from "@illa-design/menu"
import {
  AddIcon,
  WarningCircleIcon,
  EmptyStateIcon,
  RestApiIcon,
} from "@illa-design/icon"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import { actionListActions } from "@/redux/action/actionList/actionListSlice"
import { ActionEditorContext } from "@/page/Editor/components/ActionEditor/context"
import {
  actionListContainerCss,
  applynewButtonCss,
  newButtonTextCss,
  newButtonIconCss,
  newActionOptionsListCss,
  newActionOptionsItemCss,
  actionItemListCss,
  applyactionItemCss,
  actionItemNameCss,
  applyactionItemNameTextCss,
  actionItemIconCss,
  actionItemTimeCss,
  warningIndicatorCss,
  updatedIndicatorCss,
  noMatchFoundWrapperCss,
  emptyActionListPlaceholderCss,
  applycontextMenuCss,
  deleteActionCss,
  duplicateActionCss,
  applycontextMenuVisibleCss,
} from "./style"
import { ActionListProps } from "./interface"
import { SearchHeader } from "./SearchHeader"

const MenuItem = Menu.Item

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
  const [action, setAction] = useState<string>("")
  const [editingName, setEditingName] = useState("")
  const [editingActionItemId, setEditingActionItemId] = useState("")
  const [actionActionItemId, setActionActionItemId] = useState("")
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const contextMenuRef = useRef<HTMLDivElement | null>(null)

  useClickAway(contextMenuRef, () => {
    setContextMenuVisible(false)
    setActionActionItemId("")
  })

  const matchedActionItems = useMemo(() => {
    if (action === "") {
      return actionItems
    }

    return actionItems.filter(({ name }) =>
      name.toLowerCase().includes(action.toLowerCase()),
    )
  }, [actionItems, action])

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

  function generateName(type: string) {
    const length = actionItems.filter((i) => i.type === type).length
    const prefix = type

    const getUniqueName = (length: number): string => {
      const name = `${prefix}${length + 1}`

      if (actionItemsNameSet.has(name)) {
        return getUniqueName(length + 1)
      }

      return name
    }

    return getUniqueName(length)
  }

  function showContextMenu(event: MouseEvent, id: string) {
    event.preventDefault()

    let offset = 0
    const { clientX, clientY } = event
    const OFFSET_THRESHOLD = 10
    const contextMenuRect = contextMenuRef.current?.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const contextMenuBottom = clientY + (contextMenuRect?.height ?? 0)

    if (contextMenuBottom > viewportHeight) {
      offset = contextMenuBottom - viewportHeight + OFFSET_THRESHOLD
    }

    setContextMenuPosition({ x: clientX, y: clientY - offset })

    setActionActionItemId(id)
    setContextMenuVisible(true)
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
        <span css={actionItemNameCss} onDoubleClick={() => editName(id, name)}>
          <span
            css={applyactionItemNameTextCss(isWarning ?? false)}
            title={name}
          >
            {name}
          </span>
          {isActionDirty && <span css={updatedIndicatorCss}></span>}
        </span>
      )
    }

    return (
      <li
        key={id}
        css={applyactionItemCss(isSelected)}
        onClick={() => onClickActionItem(id, name)}
        onContextMenu={(e) => showContextMenu(e, id)}
      >
        <span css={actionItemIconCss}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={warningIndicatorCss} size={"8px"} />
          )}
        </span>
        {renderName()}
        <span css={actionItemTimeCss}>{time}</span>
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
    <ul css={newActionOptionsListCss}>
      <li css={newActionOptionsItemCss} onClick={addAction}>
        {t("editor.action.actionList.menu.resourceAction")}
      </li>
      <li css={newActionOptionsItemCss} onClick={addTransformer}>
        {t("editor.action.actionList.menu.javascriptTransformer")}
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
        name: generateName(type),
      }),
    )

    onAddActionItem(id)
  }

  function duplicateActionItem() {
    setContextMenuVisible(false)

    const newActionItems = actionItems.slice(0)
    const targetItem = newActionItems.find((i) => i.id === actionActionItemId)

    if (targetItem) {
      const type = targetItem.type
      const id = uuidV4()

      dispatch(
        actionListActions.addActionItemReducer({
          id,
          type,
          name: generateName(type),
        }),
      )

      onDuplicateActionItem(id)
    }
  }

  function deleteActionItem() {
    setContextMenuVisible(false)
    dispatch(actionListActions.removeActionItemReducer(actionActionItemId))

    onDeleteActionItem(actionActionItemId)
  }

  const NoMatchFound = (
    <div css={noMatchFoundWrapperCss}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>{t("editor.action.actionList.tips.notFound")}</span>
    </div>
  )

  const renderActionItemList = () => {
    if (matchedActionItems.length === 0) {
      if (action !== "") {
        return NoMatchFound
      }

      return (
        <span css={emptyActionListPlaceholderCss}>
          {t("editor.action.actionList.tips.empty")}
        </span>
      )
    }

    return actionItemsList
  }

  const MotionContextMenu = motion(
    forwardRef<HTMLDivElement>((_, ref) => (
      <Menu
        css={[
          applycontextMenuCss(contextMenuPosition.y, contextMenuPosition.x),
          applycontextMenuVisibleCss(contextMenuVisible),
        ]}
        onClickMenuItem={handleAction}
        ref={ref}
      >
        <MenuItem
          key={"duplicate"}
          title={t("editor.action.actionList.contextMenu.duplicate")}
          css={duplicateActionCss}
        />
        <MenuItem
          key={"delete"}
          title={t("editor.action.actionList.contextMenu.delete")}
          css={deleteActionCss}
        />
      </Menu>
    )),
  )

  function handleAction(key: string) {
    if (key === "duplicate") {
      duplicateActionItem()
    } else if (key === "delete") {
      deleteActionItem()
    }
  }

  return (
    <div css={actionListContainerCss}>
      <SearchHeader updateAction={setAction} />

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
          css={applynewButtonCss(newActionOptionsVisible)}
          size={"medium"}
        >
          <span css={newButtonTextCss}>
            <AddIcon css={newButtonIconCss} />
            {t("editor.action.actionList.btn.new")}
          </span>
        </Button>
      </Dropdown>

      <ul css={actionItemListCss}>{renderActionItemList()}</ul>

      <MotionContextMenu
        ref={contextMenuRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
