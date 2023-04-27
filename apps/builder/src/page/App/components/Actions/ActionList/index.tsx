import { FC, HTMLAttributes, useCallback, useState } from "react"
import { SearchHeader } from "@/page/App/components/Actions/SearchHeader"
import { PageTrigger } from "../PageTrigger"
import { ActionListWithNewButton } from "./listWithNewButton"
import { searchHeaderContainerStyle } from "./style"

export const ActionList: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props

  const [searchActionValue, setSearchActionValue] = useState("")
  const [activeKey, setActiveKey] = useState("actionList")

  const handleOnSearch = useCallback((value: string) => {
    setSearchActionValue(value)
  }, [])

  const handleClickChangeTab = useCallback((activeKey: string) => {
    setActiveKey(activeKey)
  }, [])

  return (
    <div className={className} css={searchHeaderContainerStyle}>
      <SearchHeader
        onSearch={handleOnSearch}
        activeTab={activeKey}
        handleClickChangeTab={handleClickChangeTab}
      />
      {activeKey === "actionList" && (
        <ActionListWithNewButton searchActionValue={searchActionValue} />
      )}
      {activeKey === "pageTrigger" && <PageTrigger />}
    </div>
  )
}

ActionList.displayName = "ActionList"
