import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge, BugIcon, getColor } from "@illa-design/react"
import IconHotSpot from "@/components/IconHotSpot"
import { isOpenDebugger } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"

const DebugButton: FC = () => {
  const debuggerData = useSelector(getExecutionDebuggerData)
  const debuggerVisible = useSelector(isOpenDebugger)

  const debugMessageNumber = debuggerData
    ? Object.keys(debuggerData).length
    : undefined
  const dispatch = useDispatch()

  const handleClickDebuggerIcon = () => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "debug",
      parameter2: debugMessageNumber ?? 0,
    })
    dispatch(configActions.updateDebuggerVisible(!debuggerVisible))
  }

  return (
    <IconHotSpot onClick={handleClickDebuggerIcon}>
      <Badge count={debugMessageNumber}>
        <BugIcon color={getColor("grayBlue", "02")} />
      </Badge>
    </IconHotSpot>
  )
}

export default memo(DebugButton)
