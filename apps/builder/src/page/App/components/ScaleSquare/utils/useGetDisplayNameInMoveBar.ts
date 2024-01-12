import { get } from "lodash-es"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

export const useDisplayNameInMoveBarSelector = (
  displayName: string,
  widgetType: string,
) => {
  const executionResult = useSelector(
    getExecutionResult,
    (prev, next) => prev === next,
  )
  const realProps: Record<string, any> = get(executionResult, displayName, {})

  const displayNameInMoveBar = useMemo(() => {
    if (
      widgetType === "CONTAINER_WIDGET" &&
      realProps.hasOwnProperty("currentIndex") &&
      realProps.hasOwnProperty("viewList")
    ) {
      const { currentIndex, viewList } = realProps
      if (!Array.isArray(viewList) || currentIndex >= viewList.length)
        return displayName + " / " + "View 1"
      const labelName = viewList[currentIndex]
        ? viewList[currentIndex].label
        : currentIndex
      return displayName + " / " + labelName
    }
    return displayName
  }, [displayName, realProps, widgetType])

  return displayNameInMoveBar
}
