import { FC, HTMLAttributes, useState } from "react"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
import {
  AddIcon,
  SearchIcon,
  ImageDefaultIcon,
  FilterIcon,
  WarningCircleIcon,
} from "@illa-design/icon"
import {
  QueryListContainer,
  QueryListHeader,
  FilterIconCss,
  HeaderTitle,
  applyNewButton,
  NewButtonContentWrapper,
  AddIconInNewButton,
  QueryItemList,
  QueryItem,
  QueryItemIcon,
  QueryItemTitle,
  WarningIndicator,
  UpdatedIndicator,
  QueryItemTime,
  NewQueryOptionsList,
  NewQueryOptionsItem,
} from "./style"
import { QueryListProps } from "./interface"

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props
  const [queryOptionsVisible, setQueryOptionsVisible] = useState(false)
  const [queryItems, setQueryItems] = useState<
    {
      type: string
      name: string
      isWarning: boolean
      isUpdated: boolean
      time: string
    }[]
  >([])

  const queryItemsList = queryItems.map((item, index) => {
    const { name, time, isWarning, isUpdated } = item
    const icon = <ImageDefaultIcon />

    return (
      <li key={`${name}_${index}`} css={QueryItem}>
        <span css={QueryItemIcon}>
          {icon}
          {isWarning && (
            <WarningCircleIcon css={WarningIndicator} size={"8px"} />
          )}
        </span>
        <span css={QueryItemTitle}>
          {name}
          {isUpdated && <span css={UpdatedIndicator}></span>}
        </span>
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
    const now = Date.now()

    setQueryItems((prev) => {
      const newItems = prev.slice(0)
      newItems.push({
        type: "rest",
        name: `Query_${now}`,
        isUpdated: now % 2 === 0,
        isWarning: now % 2 === 0,
        time: "0.7s",
      })

      return newItems
    })
  }

  return (
    <div className={className} css={QueryListContainer}>
      <header css={QueryListHeader}>
        <span css={HeaderTitle}>Queries List</span>
        <SearchIcon size={"12px"} />
        <FilterIcon size={"12px"} css={FilterIconCss} />
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

      <ul css={QueryItemList}>{queryItemsList}</ul>
    </div>
  )
}

QueryList.displayName = "QueryList"
