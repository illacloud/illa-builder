import { FC, useState, useMemo, useRef, MouseEvent, forwardRef } from "react"
import { motion } from "framer-motion"
import { useClickAway } from "react-use"
import { useDispatch, useSelector } from "react-redux"
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
import {
  addQueryItem,
  updateQueryItem,
  removeQueryItem,
  selectAllQueryItem,
} from "@/redux/reducers/actionReducer/queryListReducer"
import { updateQueryId } from "@/redux/reducers/actionReducer/editorReducer"
import { getActionEditorQueryId } from "@/redux/selectors/actionSelector/editorSeletor"
import {
  QueryListContainerCSS,
  applyNewButtonCSS,
  NewButtonTextCSS,
  NewButtonIconCSS,
  NewQueryOptionsListCSS,
  NewQueryOptionsItemCSS,
  QueryItemListCSS,
  applyQueryItemCSS,
  QueryItemNameCSS,
  applyQueryItemNameTextCSS,
  QueryItemIconCSS,
  QueryItemTimeCSS,
  WarningIndicatorCSS,
  UpdatedIndicatorCSS,
  NoMatchFoundWrapperCSS,
  EmptyQueryListPlaceholderCSS,
  applyContextMenuCSS,
  DeleteActionCSS,
  DuplicateActionCSS,
  applyContextMenuVisibleCSS,
} from "./style"
import { QueryListProps } from "./interface"
import { SearchHeader } from "./SearchHeader"

const MenuItem = Menu.Item

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const queryItems = useSelector(selectAllQueryItem)
  const selectedQueryItemId = useSelector(getActionEditorQueryId)

  const [newQueryOptionsVisible, setNewQueryOptionsVisible] = useState(false)
  const [query, setQuery] = useState<string>("")
  const [editingName, setEditingName] = useState("")
  const [editingQueryItemId, setEditingQueryItemId] = useState("")
  const [actionQueryItemId, setActionQueryItemId] = useState("")

  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const contextMenuRef = useRef<HTMLDivElement | null>(null)

  useClickAway(contextMenuRef, () => {
    setContextMenuVisible(false)
    setActionQueryItemId("")
  })

  const matchedQueryItems = useMemo(() => {
    if (query === "") {
      return queryItems
    }

    return queryItems.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [queryItems, query])

  const queryItemsNameSet = useMemo(() => {
    return new Set(queryItems.map((i) => i.name))
  }, [queryItems])

  function editName(id: string, name: string) {
    setEditingQueryItemId(id)
    setEditingName(name)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  function generateName(type: string) {
    const length = queryItems.filter((i) => i.type === type).length
    const prefix = type

    const getUniqueName = (length: number): string => {
      const name = `${prefix}${length + 1}`

      if (queryItemsNameSet.has(name)) {
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

    setActionQueryItemId(id)
    setContextMenuVisible(true)
  }

  function updateName() {
    dispatch(
      updateQueryItem({
        id: editingQueryItemId,
        changes: { name: editingName },
      }),
    )
    setEditingQueryItemId("")
    setEditingName("")
  }

  const queryItemsList = matchedQueryItems.map((item) => {
    const { id, name, time, isWarning, isUpdated } = item
    const icon = <RestApiIcon />
    const isSelected = id === selectedQueryItemId

    function renderName() {
      if (id === editingQueryItemId) {
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
        <span css={QueryItemNameCSS} onDoubleClick={() => editName(id, name)}>
          <span
            css={applyQueryItemNameTextCSS(isWarning ?? false)}
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
        css={applyQueryItemCSS(isSelected)}
        onClick={() => onClickQueryItem(id, name)}
        onContextMenu={(e) => showContextMenu(e, id)}
      >
        <span css={QueryItemIconCSS}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={WarningIndicatorCSS} size={"8px"} />
          )}
        </span>
        {renderName()}
        <span css={QueryItemTimeCSS}>{time}</span>
      </li>
    )
  })

  function onClickQueryItem(id: string, name: string) {
    dispatch(updateQueryId(id))

    if (queryItems.length === 1) {
      editName(id, name)
    }
  }

  const newNewQueryOptions = (
    <ul css={NewQueryOptionsListCSS}>
      <li css={NewQueryOptionsItemCSS} onClick={addQuery}>
        Resource query
      </li>
      <li css={NewQueryOptionsItemCSS} onClick={addTransformer}>
        JavaScript transformer
      </li>
    </ul>
  )

  function addQuery() {
    dispatch(
      addQueryItem({
        type: "query",
        name: generateName("query"),
        isUpdated: Math.random() > 0.5,
        isWarning: Math.random() > 0.5,
        time: "0.7s",
      }),
    )
  }

  function addTransformer() {
    dispatch(
      addQueryItem({
        type: "transformer",
        name: generateName("transformer"),
        isUpdated: Math.random() > 0.5,
        isWarning: Math.random() > 0.5,
        time: "0.7s",
      }),
    )
  }

  const NoMatchFound = (
    <div css={NoMatchFoundWrapperCSS}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>Sorry, No Search result</span>
    </div>
  )

  const renderQueryItemList = () => {
    if (matchedQueryItems.length === 0) {
      if (query !== "") {
        return NoMatchFound
      }

      return (
        <span css={EmptyQueryListPlaceholderCSS}>
          Add a query to begin working with data from a connected resource.
        </span>
      )
    }

    return queryItemsList
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
      duplicateQueryItem()
    } else if (key === "delete") {
      deleteQueryItem()
    }
  }

  function duplicateQueryItem() {
    setContextMenuVisible(false)
    const newQueryItems = queryItems.slice(0)
    const targetItem = newQueryItems.find((i) => i.id === actionQueryItemId)

    if (targetItem) {
      const type = targetItem.type

      dispatch(
        addQueryItem({
          type,
          name: generateName(type),
          isUpdated: Math.random() > 0.5,
          isWarning: Math.random() > 0.5,
          time: "0.7s",
        }),
      )
    }

    setActionQueryItemId("")
  }

  function deleteQueryItem() {
    setContextMenuVisible(false)
    dispatch(removeQueryItem(actionQueryItemId))
    setActionQueryItemId("")
  }

  return (
    <div className={className} css={QueryListContainerCSS}>
      <SearchHeader updateQuery={setQuery} />

      <Dropdown
        dropList={newNewQueryOptions}
        trigger={"click"}
        triggerProps={{
          clickOutsideToClose: true,
          closeOnClick: true,
          openDelay: 0,
          closeDelay: 0,
        }}
        onVisibleChange={(visible) => setNewQueryOptionsVisible(visible)}
      >
        <Button css={applyNewButtonCSS(newQueryOptionsVisible)} size={"medium"}>
          <span css={NewButtonTextCSS}>
            <AddIcon css={NewButtonIconCSS} />
            New
          </span>
        </Button>
      </Dropdown>

      <ul css={QueryItemListCSS}>{renderQueryItemList()}</ul>

      <MotionContextMenu
        ref={contextMenuRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

QueryList.displayName = "QueryList"
