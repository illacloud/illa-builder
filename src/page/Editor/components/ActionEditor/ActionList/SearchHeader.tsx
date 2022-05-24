import { FC, forwardRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@illa-design/input"
import { Button } from "@illa-design/button"
import { SearchIcon } from "@illa-design/icon"
import { SearchHeaderProps } from "./interface"
import {
  SearchHeaderCSS,
  SearchHeaderInputCSS,
  SearchHeaderTitleCSS,
  SearchHeaderTitleTextCSS,
  SearchHeaderTitleIconCSS,
  SearchInputCSS,
  SearchInputIconCSS,
  SearchInputCloseBtnCSS,
} from "./style"

export const SearchHeader: FC<SearchHeaderProps> = (props) => {
  const { updateAction } = props
  const [isSearch, setIsSearch] = useState(false)

  const MotionHeaderSearchInput = motion(
    forwardRef<HTMLDivElement>((_, ref) => (
      <Input
        ref={ref}
        prefix={{
          render: <SearchIcon size={"12px"} css={SearchInputIconCSS} />,
        }}
        placeholder={"Search"}
        onChange={updateAction}
        onClear={() => updateAction("")}
        css={SearchInputCSS}
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
          updateAction("")
        }}
        colorScheme={"white"}
        css={SearchInputCloseBtnCSS}
      >
        Close
      </Button>
    )),
  )

  const searchTitle = (
    <motion.div
      css={[SearchHeaderCSS, SearchHeaderTitleCSS]}
      key={"search-title"}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, display: "none" }}
    >
      <motion.span
        css={SearchHeaderTitleTextCSS}
        initial={{ flex: 0, width: 25, overflow: "hidden" }}
        animate={{ flex: 1 }}
        transition={{ duration: 0.4 }}
      >
        Action List
      </motion.span>
      <SearchIcon
        size={"12px"}
        onClick={() => setIsSearch(true)}
        css={SearchHeaderTitleIconCSS}
      />
    </motion.div>
  )

  const searchInput = (
    <motion.div
      css={[SearchHeaderCSS, SearchHeaderInputCSS]}
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
