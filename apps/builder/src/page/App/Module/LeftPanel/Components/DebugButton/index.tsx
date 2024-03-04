import IconHotSpot from "@illa-public/icon-hot-spot"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { t } from "i18next"
import { FC, memo, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge, BugIcon, Trigger, getColor } from "@illa-design/react"
import { isOpenDebugger } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"

const DebugButton: FC = () => {
  const debuggerData = useSelector(getExecutionError)
  const debuggerVisible = useSelector(isOpenDebugger)

  const debugMessageNumber = useMemo(() => {
    if (debuggerData) {
      let count = 0
      Object.keys(debuggerData).forEach((errors) => {
        if (Array.isArray(debuggerData[errors])) {
          count += debuggerData[errors].length
        }
      })
      return count
    }
    return undefined
  }, [debuggerData])
  const dispatch = useDispatch()

  const handleClickDebuggerIcon = () => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "debug",
      parameter2: debugMessageNumber ?? 0,
    })
    dispatch(configActions.updateDebuggerVisible(!debuggerVisible))
  }

  return (
    <Trigger position="right" content={t("flow.editor.app.tooltips.debug")}>
      <IconHotSpot onClick={handleClickDebuggerIcon}>
        <Badge count={debugMessageNumber}>
          <BugIcon color={getColor("grayBlue", "02")} />
        </Badge>
      </IconHotSpot>
    </Trigger>
  )
}

export default memo(DebugButton)
