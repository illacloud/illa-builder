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
import { BuilderState } from "@/redux/reducers/interface"
import {
  addQueryItem,
  updateQueryItem,
  removeQueryItem,
  selectAllQueryItem,
  selectQueryItemById,
} from "@/redux/reducers/actionReducer/queryListReducer"
import {
  QueryListContainerCss,
  applyNewButtonCss,
  NewButtonTextCss,
  NewButtonIconCss,
  NewQueryOptionsListCss,
  NewQueryOptionsItemCss,
  QueryItemListCss,
  applyQueryItemCss,
  QueryItemNameCss,
  applyQueryItemNameTextCss,
  QueryItemIconCss,
  QueryItemTimeCss,
  WarningIndicatorCss,
  UpdatedIndicatorCss,
  NoMatchFoundWrapperCss,
  EmptyQueryListPlaceholderCss,
  applyContextMenuCss,
  DeleteActionCss,
  DuplicateActionCss,
  applyContextMenuVisibleCss,
} from "./style"
import { QueryListProps, QueryItem } from "./interface"
import { SearchHeader } from "./SearchHeader"

const MenuItem = Menu.Item

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const queryItems = useSelector(selectAllQueryItem)

  const [newQueryOptionsVisible, setNewQueryOptionsVisible] = useState(false)
  const [query, setQuery] = useState<string>("")

  const [selectedQueryItemId, setSelectedQueryItemId] = useState<string>()
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

  function updateName(id: string, name: string) {
    dispatch(updateQueryItem({ id, changes: { name } }))
  }

  function editName(id: string) {
    setEditingQueryItemId(id)
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
            value={name}
            onChange={(value) => updateName(id, value)}
            onBlur={() => setEditingQueryItemId("")}
            onPressEnter={() => setEditingQueryItemId("")}
          />
        )
      }

      return (
        <span css={QueryItemNameCss} onDoubleClick={() => editName(id)}>
          <span
            css={applyQueryItemNameTextCss(isWarning ?? false)}
            title={name}
          >
            {name}
          </span>
          {isUpdated && <span css={UpdatedIndicatorCss}></span>}
        </span>
      )
    }

    return (
      <li
        key={id}
        css={applyQueryItemCss(isSelected)}
        onClick={() => onClickQueryItem(id)}
        onContextMenu={(e) => showContextMenu(e, id)}
      >
        <span css={QueryItemIconCss}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={WarningIndicatorCss} size={"8px"} />
          )}
        </span>
        {renderName()}
        <span css={QueryItemTimeCss}>{time}</span>
      </li>
    )
  })

  function onClickQueryItem(id: string) {
    setSelectedQueryItemId(id)

    if (queryItems.length === 1) {
      editName(id)
    }
  }

  const newNewQueryOptions = (
    <ul css={NewQueryOptionsListCss}>
      <li css={NewQueryOptionsItemCss} onClick={addQuery}>
        Resource query
      </li>
      <li css={NewQueryOptionsItemCss} onClick={addTransformer}>
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
    <div css={NoMatchFoundWrapperCss}>
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
        <span css={EmptyQueryListPlaceholderCss}>
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
          applyContextMenuCss(contextMenuPosition.y, contextMenuPosition.x),
          applyContextMenuVisibleCss(contextMenuVisible),
        ]}
        onClickMenuItem={handleAction}
        ref={ref}
      >
        <MenuItem
          key={"duplicate"}
          title={"Duplicate"}
          css={DuplicateActionCss}
        ></MenuItem>
        <MenuItem
          key={"delete"}
          title={"Delete"}
          css={DeleteActionCss}
        ></MenuItem>
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
    <div className={className} css={QueryListContainerCss}>
      <SearchHeader updateQuery={setQuery} />

      <Dropdown
        dropList={newNewQueryOptions}
        trigger={"click"}
        triggerProps={{ clickOutsideToClose: true, closeOnClick: false }}
        onVisibleChange={(visible) => setNewQueryOptionsVisible(visible)}
      >
        <Button css={applyNewButtonCss(newQueryOptionsVisible)} size={"medium"}>
          <span css={NewButtonTextCss}>
            <AddIcon css={NewButtonIconCss} />
            New
          </span>
        </Button>
      </Dropdown>

      <ul css={QueryItemListCss}>{renderQueryItemList()}</ul>

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
