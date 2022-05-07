import { FC, useState, useMemo, useRef } from "react"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
import { Input } from "@illa-design/input"
import {
  AddIcon,
  SearchIcon,
  ImageDefaultIcon,
  WarningCircleIcon,
  EmptyStateIcon,
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
} from "./style"
import { QueryListProps, QueryItem } from "./interface"

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props
  const [queryOptionsVisible, setQueryOptionsVisible] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<string>()
  const [queryItems, setQueryItems] = useState<QueryItem[]>([])
  const [query, setQuery] = useState<string>("")
  const [editingQueryItemId, setEditingQueryItemId] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const filteredQueryItems = useMemo(() => {
    if (query === "") {
      return queryItems
    }

    return queryItems.filter(({ name }) => name.includes(query))
  }, [queryItems, query])

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

  const queryItemsList = filteredQueryItems.map((item) => {
    const { id, name, time, isWarning, isUpdated } = item
    const icon = <ImageDefaultIcon />

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

    return (
      <li
        key={id}
        css={applyQueryItem(id === selectedQuery)}
        onClick={() => setSelectedQuery(id)}
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

  const newQueryOptions = (
    <ul css={NewQueryOptionsList}>
      <li css={NewQueryOptionsItem} onClick={addQuery}>
        Resource query
      </li>
      <li css={NewQueryOptionsItem}>JavaScript transformer</li>
    </ul>
  )

  function addQuery() {
    setQueryItems((prev) => {
      const newItems = prev.slice(0)
      const length = newItems.filter((i) => i.type === "query").length

      newItems.push({
        id: Date.now().toString(),
        type: "query",
        name: `Query${length + 1}`,
        isUpdated: Math.random() > 0.5,
        isWarning: Math.random() > 0.5,
        time: "0.7s",
      })

      return newItems
    })
  }

  const headerContent = isSearch ? (
    <>
      <Input
        prefix={{
          render: <SearchIcon size={"12px"} css={SearchInputIcon} />,
        }}
        placeholder={"Search"}
        onChange={setQuery}
        onClear={() => setQuery("")}
        css={SearchInput}
        allowClear
      />
      <Button
        onClick={() => {
          setIsSearch(false)
          setQuery("")
        }}
        colorScheme={"white"}
        css={CloseBtn}
      >
        Close
      </Button>
    </>
  ) : (
    <>
      <span css={HeaderTitle}>Queries List</span>
      <SearchIcon
        size={"12px"}
        onClick={() => setIsSearch(true)}
        css={HeaderSearchIcon}
      />
    </>
  )

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

  return (
    <div className={className} css={QueryListContainer}>
      <header css={QueryListHeader}>{headerContent}</header>

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
    </div>
  )
}

QueryList.displayName = "QueryList"
