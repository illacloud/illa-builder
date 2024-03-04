import { get } from "lodash-es"
import { FC, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getIsILLAEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { WrapperContainerProps } from "./interface"
import { applyWrapperPendingStyle, hoverHotSpotStyle } from "./style"

const WrapperContainer: FC<WrapperContainerProps> = (props) => {
  const { displayName, widgetHeight, children } = props
  const executionResult = useSelector(getExecutionResult)

  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isEditMode = useSelector(getIsILLAEditMode)
  const errors = useSelector(getExecutionError)

  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const realProps: Record<string, any> = get(executionResult, displayName, {})
  const hasError = useMemo(() => {
    const keys = Object.keys(errors)
    return (
      keys.length > 0 &&
      keys.some((key) => {
        return (
          Array.isArray(errors[key]) &&
          errors[key].length > 0 &&
          key.startsWith(displayName)
        )
      })
    )
  }, [displayName, errors])

  const isAutoLimitedMode = realProps?.dynamicHeight === "limited"
  const isOverLap =
    isAutoLimitedMode &&
    (realProps?.dynamicMaxHeight === widgetHeight ||
      realProps?.dynamicMinHeight === widgetHeight)

  return (
    <div css={hoverHotSpotStyle}>
      <div
        css={applyWrapperPendingStyle({
          hasError,
          isSelected,
          isEditor: isEditMode,
          isLimitedModeAndOverLap: isOverLap,
        })}
      >
        {children}
      </div>
    </div>
  )
}

WrapperContainer.displayName = "WrapperContainer"

export default memo(WrapperContainer)
