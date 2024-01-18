import { css } from "@emotion/react"
import IconHotSpot from "@illa-public/icon-hot-spot"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Input, SearchIcon } from "@illa-design/react"
import { SearchHeaderProps } from "./interface"
import {
  actionListHeaderContainerStyle,
  actionTitleStyle,
  searchHeaderStyle,
  searchInputContainerStyle,
  searchInputIconStyle,
  searchInputStyle,
} from "./style"

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
  const { onSearch } = props
  const [inSearchState, setInSearchState] = useState(false)

  const { t } = useTranslation()
  return (
    <AnimatePresence>
      {inSearchState ? (
        <SearchInput setInSearchState={setInSearchState} onSearch={onSearch} />
      ) : (
        <div css={actionListHeaderContainerStyle}>
          <h3 css={actionTitleStyle}>{t("editor.action.action_list.title")}</h3>
          <IconHotSpot iconSize={12} onClick={() => setInSearchState(true)}>
            <SearchIcon />
          </IconHotSpot>
        </div>
      )}
    </AnimatePresence>
  )
}

SearchHeader.displayName = "SearchHeader"
