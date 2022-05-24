import { FC, useState, useMemo, useRef, MouseEvent, forwardRef } from "react"
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
import {
  updateActionItem,
  addActionItem,
  removeActionItem,
} from "@/redux/action/actionList/actionListSlice"
import {
  ActionListContainerCSS,
  applyNewButtonCSS,
  NewButtonTextCSS,
  NewButtonIconCSS,
  NewActionOptionsListCSS,
  NewActionOptionsItemCSS,
  ActionItemListCSS,
  applyActionItemCSS,
  ActionItemNameCSS,
  applyActionItemNameTextCSS,
  ActionItemIconCSS,
  ActionItemTimeCSS,
  WarningIndicatorCSS,
  UpdatedIndicatorCSS,
  NoMatchFoundWrapperCSS,
  EmptyActionListPlaceholderCSS,
  applyContextMenuCSS,
  DeleteActionCSS,
  DuplicateActionCSS,
  applyContextMenuVisibleCSS,
} from "./style"
import { ActionListProps } from "./interface"
import { SearchHeader } from "./SearchHeader"

const MenuItem = Menu.Item

export const ActionList: FC<ActionListProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const actionItems = useSelector(selectAllActionItem)
  const selectedActionItemId = ""

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
    /* dispatch(
     *   updateActionItem({
     *     id: editingActionItemId,
     *     changes: { name: editingName },
     *   }),
     * ) */
    setEditingActionItemId("")
    setEditingName("")
  }

  const actionItemsList = matchedActionItems.map((item) => {
    const { id, name, status } = item
    const isWarning = status === "warning"
    // TODO: isUpdated should a props
    const isUpdated = false
    // TODO: time should retrieve from ActionItem.network
    const time = "0.7s"
    const icon = <RestApiIcon />
    const isSelected = id === selectedActionItemId

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
        <span css={ActionItemNameCSS} onDoubleClick={() => editName(id, name)}>
          <span
            css={applyActionItemNameTextCSS(isWarning ?? false)}
            title={name}
          >
            {name}
          </span>
          {isUpdated && <span css={UpdatedIndicatorCSS}></span>}
        </span>
      )
    }

    return (
      <li
        key={id}
        css={applyActionItemCSS(isSelected)}
        onClick={() => onClickActionItem(id, name)}
        onContextMenu={(e) => showContextMenu(e, id)}
      >
        <span css={ActionItemIconCSS}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={WarningIndicatorCSS} size={"8px"} />
          )}
        </span>
        {renderName()}
        <span css={ActionItemTimeCSS}>{time}</span>
      </li>
    )
  })

  function onClickActionItem(id: string, name: string) {
    if (actionItems.length === 1) {
      editName(id, name)
    }
  }

  const newNewActionOptions = (
    <ul css={NewActionOptionsListCSS}>
      <li css={NewActionOptionsItemCSS} onClick={addAction}>
        Resource action
      </li>
      <li css={NewActionOptionsItemCSS} onClick={addTransformer}>
        JavaScript transformer
      </li>
    </ul>
  )

  function addAction() {
    dispatch(
      addActionItem({
        id: uuidV4(),
        type: "action",
        name: generateName("action"),
        status: Math.random() > 0.5 ? "warning" : "",
      }),
    )
  }

  function addTransformer() {
    dispatch(
      addActionItem({
        id: uuidV4(),
        type: "transformer",
        name: generateName("transformer"),
        status: Math.random() > 0.5 ? "warning" : "",
      }),
    )
  }

  const NoMatchFound = (
    <div css={NoMatchFoundWrapperCSS}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>Sorry, No Search result</span>
    </div>
  )

  const renderActionItemList = () => {
    if (matchedActionItems.length === 0) {
      if (action !== "") {
        return NoMatchFound
      }

      return (
        <span css={EmptyActionListPlaceholderCSS}>
          Add a action to begin working with data from a connected resource.
        </span>
      )
    }

    return actionItemsList
  }

  const MotionContextMenu = motion(
    forwardRef<HTMLDivElement>((_, ref) => (
      <Menu
        css={[
          applyContextMenuCSS(contextMenuPosition.y, contextMenuPosition.x),
          applyContextMenuVisibleCSS(contextMenuVisible),
        ]}
        onClickMenuItem={handleAction}
        ref={ref}
      >
        <MenuItem
          key={"duplicate"}
          title={"Duplicate"}
          css={DuplicateActionCSS}
        />
        <MenuItem key={"delete"} title={"Delete"} css={DeleteActionCSS} />
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

  function duplicateActionItem() {
    setContextMenuVisible(false)

    const newActionItems = actionItems.slice(0)
    const targetItem = newActionItems.find((i) => i.id === actionActionItemId)

    if (targetItem) {
      const type = targetItem.type
      dispatch(
        addActionItem({
          id: uuidV4(),
          type,
          name: generateName(type),
          status: Math.random() > 0.5 ? "warning" : "",
        }),
      )
    }

    setActionActionItemId("")
  }

  function deleteActionItem() {
    setContextMenuVisible(false)
    dispatch(removeActionItem(actionActionItemId))
    setActionActionItemId("")
  }

  return (
    <div className={className} css={ActionListContainerCSS}>
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
          css={applyNewButtonCSS(newActionOptionsVisible)}
          size={"medium"}
        >
          <span css={NewButtonTextCSS}>
            <AddIcon css={NewButtonIconCSS} />
            New
          </span>
        </Button>
      </Dropdown>

      <ul css={ActionItemListCSS}>{renderActionItemList()}</ul>

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
