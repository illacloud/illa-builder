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
import { lineStyle, windowIconBodyStyle, windowIconStyle } from "./style"

export const WindowIcons = () => {
  const dispatch = useDispatch()

  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)

  const handleClickLeftWindowIcon = useCallback(() => {
    dispatch(configActions.updateLeftPanel(!leftPanelVisible))
  }, [dispatch, leftPanelVisible])
  const handleClickRightWindowIcon = useCallback(() => {
    dispatch(configActions.updateRightPanel(!rightPanelVisible))
  }, [dispatch, rightPanelVisible])
  const handleClickBottomWindowIcon = useCallback(() => {
    dispatch(configActions.updateBottomPanel(!bottomPanelVisible))
  }, [bottomPanelVisible, dispatch])

  return (
    <>
      <span css={windowIconBodyStyle} onClick={handleClickLeftWindowIcon}>
        <WindowLeftIcon _css={windowIconStyle(leftPanelVisible)} />
      </span>
      <span css={windowIconBodyStyle} onClick={handleClickBottomWindowIcon}>
        <WindowBottomIcon _css={windowIconStyle(bottomPanelVisible)} />
      </span>
      <span css={windowIconBodyStyle} onClick={handleClickRightWindowIcon}>
        <WindowRightIcon _css={windowIconStyle(rightPanelVisible)} />
      </span>
      <span css={lineStyle} />
    </>
  )
}
