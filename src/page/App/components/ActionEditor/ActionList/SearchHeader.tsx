import { FC, forwardRef, useState, useMemo } from "react"
import { css } from "@emotion/react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { Button } from "@illa-design/button"
import { SearchIcon } from "@illa-design/icon"
import { SearchHeaderProps } from "./interface"
import {
  searchHeaderStyle,
  searchHeaderInputStyle,
  searchHeaderTitleStyle,
  searchHeaderTitleTextStyle,
  searchHeaderTitleIconStyle,
  searchInputStyle,
  searchInputIconStyle,
  searchInputCloseBtnStyle,
} from "./style"

export const SearchHeader: FC<SearchHeaderProps> = (props) => {
  const { updateAction } = props
  const { t } = useTranslation()
  const [isSearch, setIsSearch] = useState(false)

  const MotionHeaderSearchInput = motion(
    forwardRef<HTMLDivElement>((_, ref) => (
      <Input
        ref={ref}
        prefix={{
          render: <SearchIcon size={"12px"} css={searchInputIconStyle} />,
        }}
        placeholder={t("editor.action.action_list.placeholder.search")}
        onChange={updateAction}
        onClear={() => updateAction("")}
        css={searchInputStyle}
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
        css={searchInputCloseBtnStyle}
      >
        {t("editor.action.action_list.btn.close")}
      </Button>
    )),
  )

  const searchTitle = (
    <motion.div
      css={css(searchHeaderStyle, searchHeaderTitleStyle)}
      key={"search-title"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, position: "absolute" }}
    >
      <span css={searchHeaderTitleTextStyle}>
        {t("editor.action.action_list.title")}
      </span>
      <SearchIcon
        size={"12px"}
        onClick={() => setIsSearch(true)}
        css={searchHeaderTitleIconStyle}
      />
    </motion.div>
  )

  const searchInput = (
    <motion.div
      css={css(searchHeaderStyle, searchHeaderInputStyle)}
      key={"search-input"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, position: "absolute" }}
    >
      <MotionHeaderSearchInput
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        transition={{ duration: 0.2 }}
        exit={{ width: 0, opacity: 0 }}
      />
      <MotionHeaderSearchCloseBtn
        initial={{ opacity: 0, overflow: "hidden" }}
        animate={{ opacity: 1 }}
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

SearchHeader.displayName = "AcionListSearchHeader"
