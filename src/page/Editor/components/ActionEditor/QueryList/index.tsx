import { FC, useState, useMemo, useRef, MouseEvent, forwardRef } from "react"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
import { Input } from "@illa-design/input"
import { Menu } from "@illa-design/menu"
import { motion, AnimatePresence } from "framer-motion"
import {
  AddIcon,
  SearchIcon,
  WarningCircleIcon,
  EmptyStateIcon,
  RestApiIcon,
} from "@illa-design/icon"
import {
  QueryListContainer,
  QueryListHeader,
  HeaderTitle,
  applyNewButton,
  NewButtonContentWrapper,
  AddIconInNewButton,
  QueryItemList,
  applyQueryItem,
  QueryItemTitleWrapper,
  applyQueryItemTitle,
  QueryItemIcon,
  WarningIndicator,
  UpdatedIndicator,
  QueryItemTime,
  NewQueryOptionsList,
  NewQueryOptionsItem,
  SearchInput,
  SearchInputIcon,
  CloseBtn,
  HeaderSearchIcon,
  NoMatchFoundWrapper,
  EmptyQueryListPlaceholder,
  applyActionMenu,
  DeleteAction,
  DuplicateAction,
  applyActionMenuVisible,
  QueryListHeaderWrapper,
  QueryListHeaderInput,
  QueryListHeaderDisplay,
} from "./style"
import { useClickAway } from "react-use"
import { QueryListProps, QueryItem } from "./interface"

const MenuItem = Menu.Item

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props

  const [queryOptionsVisible, setQueryOptionsVisible] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [selectedQueryId, setSelectedQuery] = useState<string>()
  const [queryItems, setQueryItems] = useState<QueryItem[]>([])
  const [query, setQuery] = useState<string>("")
  const [editingQueryItemId, setEditingQueryItemId] = useState("")
  const [actionQueryItemId, setActionQueryItemId] = useState("")
  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const actionMenuRef = useRef<HTMLDivElement | null>(null)

  useClickAway(actionMenuRef, () => {
    setActionMenuVisible(false)
    setActionQueryItemId("")
  })

  const filteredQueryItems = useMemo(() => {
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
    const newQueryItems = queryItems.slice(0)
    const editingItem = newQueryItems.find((i) => i.id === id)
    editingItem && (editingItem.name = name)
    setQueryItems(newQueryItems)
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

  function showActionMenu(event: MouseEvent, id: string) {
    event.preventDefault()

    const { clientX, clientY } = event
    const OFFSET_THRESHOLD = 10
    let offset = 0
    const contextMenuRect = actionMenuRef.current?.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const contextMenuBottom = clientY + (contextMenuRect?.height ?? 0)

    if (contextMenuBottom > viewportHeight) {
      offset = contextMenuBottom - viewportHeight + OFFSET_THRESHOLD
    }

    setActionMenuPosition({ x: clientX, y: clientY - offset })

    setActionQueryItemId(id)
    setActionMenuVisible(true)
  }

  const queryItemsList = filteredQueryItems.map((item) => {
    const { id, name, time, isWarning, isUpdated } = item
    const icon = <RestApiIcon />

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
        <span css={QueryItemTitleWrapper} onDoubleClick={() => editName(id)}>
          <span css={applyQueryItemTitle(isWarning)} title={name}>
            {name}
          </span>
          {isUpdated && <span css={UpdatedIndicator}></span>}
        </span>
      )
    }

    const isSelected = id === selectedQueryId

    return (
      <li
        key={id}
        css={applyQueryItem(isSelected)}
        onClick={() => onClickQueryItem(id)}
        onContextMenu={(e) => showActionMenu(e, id)}
      >
        <span css={QueryItemIcon}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={WarningIndicator} size={"8px"} />
          )}
        </span>
        {renderName()}
        <span css={QueryItemTime}>{time}</span>
      </li>
    )
  })

  function onClickQueryItem(id: string) {
    setSelectedQuery(id)

    if (queryItems.length === 1) {
      editName(id)
    }
  }

  const newQueryOptions = (
    <ul css={NewQueryOptionsList}>
      <li css={NewQueryOptionsItem} onClick={addQuery}>
        Resource query
      </li>
      <li css={NewQueryOptionsItem} onClick={addTransformer}>
        JavaScript transformer
      </li>
    </ul>
  )

  function addQuery() {
    setQueryItems((prev) => {
      const newItems = prev.slice(0)

      newItems.push({
        id: Date.now().toString(),
        type: "query",
        name: generateName("query"),
        isUpdated: Math.random() > 0.5,
        isWarning: Math.random() > 0.5,
        time: "0.7s",
      })

      return newItems
    })
  }

  function addTransformer() {
    setQueryItems((prev) => {
      const newItems = prev.slice(0)

      newItems.push({
        id: Date.now().toString(),
        type: "transformer",
        name: generateName("transformer"),
        isUpdated: Math.random() > 0.5,
        isWarning: Math.random() > 0.5,
        time: "0.7s",
      })

      return newItems
    })
  }

  const NoMatchFound = (
    <div css={NoMatchFoundWrapper}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>Sorry, No Search result</span>
    </div>
  )

  const renderQueryItemList = () => {
    if (filteredQueryItems.length === 0) {
      if (isSearch && query !== "") {
        return NoMatchFound
      }

      return (
        <span css={EmptyQueryListPlaceholder}>
          Add a query to begin working with data from a connected resource.
        </span>
      )
    }

    return queryItemsList
  }

  const ActionMenu = forwardRef((props, ref) => {
    return (
      <Menu
        css={[
          applyActionMenu(actionMenuPosition.y, actionMenuPosition.x),
          applyActionMenuVisible(actionMenuVisible),
        ]}
        onClickMenuItem={handleAction}
        ref={ref}
      >
        <MenuItem
          key={"duplicate"}
          title={"Duplicate"}
          css={DuplicateAction}
        ></MenuItem>
        <MenuItem key={"delete"} title={"Delete"} css={DeleteAction}></MenuItem>
      </Menu>
    )
  })

  const MotionActionMenu = motion(ActionMenu)

  function handleAction(key: string) {
    if (key === "duplicate") {
      duplicateQueryItem()
    } else if (key === "delete") {
      deleteQueryItem()
    }
  }

  function duplicateQueryItem() {
    setActionMenuVisible(false)
    const newQueryItems = queryItems.slice(0)
    const targetItem = newQueryItems.find((i) => i.id === actionQueryItemId)

    if (targetItem) {
      const type = targetItem.type
      const duplicateItem = Object.assign({}, targetItem, {
        id: Date.now().toString(),
        name: generateName(type),
      })
      setQueryItems([...newQueryItems, duplicateItem])
    }

    setActionQueryItemId("")
  }

  function deleteQueryItem() {
    setActionMenuVisible(false)

    const newQueryItems = queryItems.slice(0)
    const index = newQueryItems.findIndex((i) => i.id === actionQueryItemId)
    newQueryItems.splice(index, 1)
    index !== -1 && setQueryItems(newQueryItems)

    setActionQueryItemId("")
  }

  const MotionHeaderSearchInput = motion(
    forwardRef<HTMLDivElement>((props, ref) => (
      <Input
        ref={ref}
        prefix={{
          render: <SearchIcon size={"12px"} css={SearchInputIcon} />,
        }}
        placeholder={"Search"}
        onChange={setQuery}
        onClear={() => setQuery("")}
        css={SearchInput}
        allowClear
      />
    )),
  )

  const MotionHeaderSearchCloseBtn = motion(
    forwardRef<HTMLButtonElement>((props, ref) => (
      <Button
        ref={ref}
        onClick={() => {
          setIsSearch(false)
          setQuery("")
        }}
        colorScheme={"white"}
        css={CloseBtn}
      >
        Close
      </Button>
    )),
  )

  const headerContent = isSearch ? (
    <motion.div
      css={[QueryListHeader, QueryListHeaderInput]}
      key={"search-title"}
      exit={{ opacity: 0, display: "none" }}
    >
      <MotionHeaderSearchInput
        initial={{ width: "25px" }}
        animate={{ width: "auto" }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0 }}
      />
      <MotionHeaderSearchCloseBtn
        initial={{ opacity: 0, width: 0, padding: 0, overflow: "hidden" }}
        animate={{ opacity: 1, width: "auto", padding: 8 }}
        transition={{ duration: 0 }}
      />
    </motion.div>
  ) : (
    <motion.div
      css={[QueryListHeader, QueryListHeaderDisplay]}
      key={"search-input"}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, display: "none" }}
    >
      <motion.span css={HeaderTitle} animate={{ flex: 1 }} transition={{ duration: 0.4 }}>
        Queries List
      </motion.span>
      <SearchIcon
        size={"12px"}
        onClick={() => setIsSearch(true)}
        css={HeaderSearchIcon}
      />
    </motion.div>
  )

  return (
    <div className={className} css={QueryListContainer}>
      <header css={QueryListHeaderWrapper}>
        <AnimatePresence>{headerContent}</AnimatePresence>
      </header>

      <Dropdown
        dropList={newQueryOptions}
        trigger={"click"}
        triggerProps={{ clickOutsideToClose: true, closeOnClick: false }}
        onVisibleChange={(visible) => setQueryOptionsVisible(visible)}
      >
        <Button css={applyNewButton(queryOptionsVisible)}>
          <span css={NewButtonContentWrapper}>
            <AddIcon css={AddIconInNewButton} />
            New
          </span>
        </Button>
      </Dropdown>

      <ul css={QueryItemList}>{renderQueryItemList()}</ul>

      <MotionActionMenu
        ref={actionMenuRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

QueryList.displayName = "QueryList"
