import { FC, HTMLAttributes, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGoogleAuthStatus } from "@/hooks/useGoogleAuthStatus"
import { SearchHeader } from "@/page/App/components/Actions/SearchHeader"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
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

  const actionList = useSelector(getActionList)

  const dispatch = useDispatch()

  useGoogleAuthStatus((resourceID: string) => {
    const resourceAction = actionList.find((r) => r.resourceID === resourceID)
    if (resourceAction) {
      dispatch(configActions.changeSelectedAction(resourceAction))
    }
  })

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
