import { css } from "@emotion/react"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Input, SearchIcon } from "@illa-design/react"
import { SearchHeaderProps } from "./interface"
import {
  searchHeaderStyle,
  searchHeaderTitleIconStyle,
  searchHeaderTitleStyle,
  searchHeaderTitleTextStyle,
  searchInputContainerStyle,
  searchInputIconStyle,
  searchInputStyle,
} from "./style"

export const SearchHeader: FC<SearchHeaderProps> = (props) => {
  const { onSearch } = props
  const { t } = useTranslation()
  const [inSearchState, setInSearchState] = useState(false)

  const searchTitle = (
    <motion.div
      className={props.className}
      css={css(searchHeaderStyle, searchHeaderTitleStyle)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <span css={searchHeaderTitleTextStyle}>
        {t("editor.action.action_list.title")}
      </span>
      <SearchIcon
        size={"12px"}
        onClick={() => setInSearchState(true)}
        css={searchHeaderTitleIconStyle}
      />
    </motion.div>
  )

  const searchInput = (
    <div
      className={props.className}
      css={css(searchHeaderStyle, searchInputContainerStyle)}
    >
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          colorScheme="techPurple"
          prefix={<SearchIcon size={"12px"} css={searchInputIconStyle} />}
          placeholder={t("editor.action.action_list.placeholder.search")}
          onChange={onSearch}
          onClear={() => onSearch("")}
          css={searchInputStyle}
          allowClear
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => {
            setInSearchState(false)
            onSearch("")
          }}
          variant="text"
          colorScheme={"white"}
          size="small"
        >
          {t("editor.action.action_list.btn.close")}
        </Button>
      </motion.div>
    </div>
  )

  const headerContent = inSearchState ? searchInput : searchTitle

  return <AnimatePresence>{headerContent}</AnimatePresence>
}

SearchHeader.displayName = "SearchHeader"
