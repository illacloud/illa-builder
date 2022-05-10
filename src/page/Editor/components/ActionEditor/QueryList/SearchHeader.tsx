import { FC, forwardRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@illa-design/input"
import { Button } from "@illa-design/button"
import { SearchIcon } from "@illa-design/icon"
import { SearchHeaderProps } from "./interface"
import {
  SearchHeaderCss,
  SearchHeaderInputCss,
  SearchHeaderTitleCss,
  SearchHeaderTitleTextCss,
  SearchHeaderTitleIconCss,
  SearchInputCss,
  SearchInputIconCss,
  SearchInputCloseBtnCss,
} from "./style"

export const SearchHeader: FC<SearchHeaderProps> = (props) => {
  const { updateQuery } = props
  const [isSearch, setIsSearch] = useState(false)

  const MotionHeaderSearchInput = motion(
    forwardRef<HTMLDivElement>((_, ref) => (
      <Input
        ref={ref}
        prefix={{
          render: <SearchIcon size={"12px"} css={SearchInputIconCss} />,
        }}
        placeholder={"Search"}
        onChange={updateQuery}
        onClear={() => updateQuery("")}
        css={SearchInputCss}
        allowClear
      />
    )),
  )

  const MotionHeaderSearchCloseBtn = motion(
    forwardRef<HTMLButtonElement>((_, ref) => (
      <Button
        ref={ref}
        onClick={() => {
          setIsSearch(false)
          updateQuery("")
        }}
        colorScheme={"white"}
        css={SearchInputCloseBtnCss}
      >
        Close
      </Button>
    )),
  )

  const searchTitle = (
    <motion.div
      css={[SearchHeaderCss, SearchHeaderTitleCss]}
      key={"search-title"}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, display: "none" }}
    >
      <motion.span
        css={SearchHeaderTitleTextCss}
        initial={{ flex: 0, width: 25, overflow: "hidden" }}
        animate={{ flex: 1 }}
        transition={{ duration: 0.4 }}
      >
        Queries List
      </motion.span>
      <SearchIcon
        size={"12px"}
        onClick={() => setIsSearch(true)}
        css={SearchHeaderTitleIconCss}
      />
    </motion.div>
  )

  const searchInput = (
    <motion.div
      css={[SearchHeaderCss, SearchHeaderInputCss]}
      key={"search-input"}
      exit={{ opacity: 0, display: "none" }}
    >
      <MotionHeaderSearchInput
        initial={{ width: 25 }}
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
  )

  const headerContent = isSearch ? searchInput : searchTitle

  return useMemo(
    () => (
      <header>
        <AnimatePresence initial={false}>{headerContent}</AnimatePresence>
      </header>
    ),
    [isSearch],
  )
}
