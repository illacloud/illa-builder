import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
} from "@illa-design/react"
import {
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { windowIconBodyStyle, windowIconStyle } from "./style"

export const WindowIcons = () => {
  const dispatch = useDispatch()

  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)

  const handleClickLeftWindowIcon = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "panel_show",
      parameter2: "left",
      parameter3: !leftPanelVisible ? "show" : "hidden",
    })
    dispatch(configActions.updateLeftPanel(!leftPanelVisible))
  }, [dispatch, leftPanelVisible])
  const handleClickRightWindowIcon = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "panel_show",
      parameter2: "right",
      parameter3: !rightPanelVisible ? "show" : "hidden",
    })
    dispatch(configActions.updateRightPanel(!rightPanelVisible))
  }, [dispatch, rightPanelVisible])
  const handleClickBottomWindowIcon = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "panel_show",
      parameter2: "bottom",
      parameter3: !bottomPanelVisible ? "show" : "hidden",
    })
    dispatch(configActions.updateBottomPanel(!bottomPanelVisible))
  }, [bottomPanelVisible, dispatch])

  return (
    <div
      style={{
        pointerEvents: "auto",
      }}
    >
      <span css={windowIconBodyStyle} onClick={handleClickLeftWindowIcon}>
        <WindowLeftIcon _css={windowIconStyle(leftPanelVisible)} />
      </span>
      <span css={windowIconBodyStyle} onClick={handleClickBottomWindowIcon}>
        <WindowBottomIcon _css={windowIconStyle(bottomPanelVisible)} />
      </span>
      <span css={windowIconBodyStyle} onClick={handleClickRightWindowIcon}>
        <WindowRightIcon _css={windowIconStyle(rightPanelVisible)} />
      </span>
    </div>
  )
}
