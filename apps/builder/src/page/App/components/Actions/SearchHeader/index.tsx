import { css } from "@emotion/react"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Input, SearchIcon } from "@illa-design/react"
import { SimpleTabs } from "@/components/Tabs"
import { ACTION_LIST_TABS } from "@/components/Tabs/constant"
import { SearchHeaderProps } from "./interface"
import {
  actionTitleTabsContainerStyle,
  applySearchHeaderTitleStyle,
  searchHeaderStyle,
  searchHeaderTitleIconStyle,
  searchInputContainerStyle,
  searchInputIconStyle,
  searchInputStyle,
} from "./style"

interface SearchTitleProps {
  setInSearchState: Dispatch<SetStateAction<boolean>>
  activeTab: string
  handleClickChangeTab: (activeKey: string) => void
}

const SearchTitle: FC<SearchTitleProps> = (props) => {
  const { setInSearchState, activeTab, handleClickChangeTab } = props

  return (
    <motion.div
      css={css(
        searchHeaderStyle,
        applySearchHeaderTitleStyle(activeTab === "pageTrigger"),
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <SimpleTabs
        items={ACTION_LIST_TABS}
        activeKey={activeTab}
        handleClickChangeTab={handleClickChangeTab}
        containerStyle={actionTitleTabsContainerStyle}
      />
      {activeTab === "actionList" && (
        <SearchIcon
          size={"12px"}
          onClick={() => setInSearchState(true)}
          css={searchHeaderTitleIconStyle}
        />
      )}
    </motion.div>
  )
}

interface SearchInputProps {
  onSearch: (value: string) => void
  setInSearchState: Dispatch<SetStateAction<boolean>>
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { t } = useTranslation()
  const { onSearch, setInSearchState } = props

  return (
    <div css={css(searchHeaderStyle, searchInputContainerStyle)}>
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
}

export const SearchHeader: FC<SearchHeaderProps> = (props) => {
  const { onSearch, activeTab, handleClickChangeTab } = props
  const [inSearchState, setInSearchState] = useState(false)

  return (
    <AnimatePresence>
      {inSearchState ? (
        <SearchInput setInSearchState={setInSearchState} onSearch={onSearch} />
      ) : (
        <SearchTitle
          setInSearchState={setInSearchState}
          activeTab={activeTab}
          handleClickChangeTab={handleClickChangeTab}
        />
      )}
    </AnimatePresence>
  )
}

SearchHeader.displayName = "SearchHeader"
