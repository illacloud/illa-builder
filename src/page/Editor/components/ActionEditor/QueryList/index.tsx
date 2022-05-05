import { FC, HTMLAttributes, useState } from "react"
import {
  QueryListContainer,
  QueryListHeader,
  FilterIconCss,
  HeaderTitle,
  NewButton,
  NewButtonContentWrapper,
  AddIconInNewButton,
  QueryItemList,
  QueryItem,
  QueryItemIcon,
  QueryItemTitle,
  WarningIndicator,
  UpdatedIndicator,
  QueryItemTime,
} from "./style"
import { Button } from "@illa-design/button"
import {
  AddIcon,
  SearchIcon,
  ImageDefaultIcon,
  FilterIcon,
  WarningCircleIcon,
} from "@illa-design/icon"

interface QueryListProps extends HTMLAttributes<HTMLDivElement> { }

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props
  const [queryItems, setQueryItems] = useState(
    Array.from({ length: 10 }, (_, index) => {
      return {
        type: "rest",
        name: `Query_${index}`,
        isUpdated: index % 2 === 0,
        isWarning: index % 2 === 0,
        time: "0.7s",
      }
    }),
  )

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

  return (
    <div className={className} css={QueryListContainer}>
      <header css={QueryListHeader}>
        <span css={HeaderTitle}>Queries List</span>
        <SearchIcon size={"12px"} />
        <FilterIcon size={"12px"} css={FilterIconCss} />
      </header>
      <Button css={NewButton}>
        <span css={NewButtonContentWrapper}>
          <AddIcon css={AddIconInNewButton} />
          New
        </span>
      </Button>
      <ul css={QueryItemList}>{queryItemsList}</ul>
    </div>
  )
}

QueryList.displayName = "QueryList"
