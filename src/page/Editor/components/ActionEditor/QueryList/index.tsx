import { FC, HTMLAttributes } from "react"
import {
  QueryListContainer,
  QueryListHeader,
  NewButton,
  AddIconInNewButton,
} from "./style"
import { Button } from "@illa-design/button"
import { AddIcon, SearchIcon } from "@illa-design/icon"

interface QueryListProps extends HTMLAttributes<HTMLDivElement> {}

export const QueryList: FC<QueryListProps> = (props) => {
  const { className } = props

  return (
    <div className={className} css={QueryListContainer}>
      <header css={QueryListHeader}>
        Queries List
        <SearchIcon />
      </header>
      <Button css={NewButton}>
        <AddIcon css={AddIconInNewButton} />
        New
      </Button>
      <ul></ul>
    </div>
  )
}

QueryList.displayName = "QueryList"
