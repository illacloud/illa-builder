import { FC, useContext, useMemo } from "react"
import { useSelector } from "react-redux"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getCachedAction } from "@/redux/config/configSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { BaseSelectSetter } from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

export const EventTargetActionSelect: FC<BaseSelectSetterProps> = (props) => {
  const actionList = useSelector(getActionList)

  const selectedContext = useContext(SelectedPanelContext)
  const selectedAction = useSelector(getCachedAction)

  const actionOptions = useMemo(() => {
    if (selectedContext.widgetOrAction === "ACTION") {
      return actionList
        .filter((value) => {
          return value.displayName !== selectedAction?.displayName
        })
        .map((item) => item.displayName)
    }
    if (selectedContext.widgetOrAction === "WIDGET") {
      return actionList.map((item) => {
        return item.displayName
      })
    }
    return []
  }, [actionList, selectedAction?.displayName, selectedContext.widgetOrAction])

  return <BaseSelectSetter {...props} options={actionOptions} />
}
