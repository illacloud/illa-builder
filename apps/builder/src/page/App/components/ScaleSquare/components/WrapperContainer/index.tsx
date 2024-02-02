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
  const { displayName, parentNodeDisplayName, widgetHeight, children } = props
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
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  }, [displayName, errors])
  const isAutoLimitedMode = realProps?.dynamicHeight === "limited"
  const isOverLap =
    isAutoLimitedMode &&
    (realProps?.dynamicMaxHeight === widgetHeight ||
      realProps?.dynamicMinHeight === widgetHeight)

  return (
    <div
      css={hoverHotSpotStyle}
      data-displayname={displayName}
      data-parentnode={parentNodeDisplayName}
    >
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
