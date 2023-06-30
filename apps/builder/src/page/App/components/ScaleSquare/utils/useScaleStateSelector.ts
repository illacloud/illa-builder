import { useMemo } from "react"
import { useSelector } from "react-redux"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { getScaleSquareState } from "../components/ResizingContainer/utils"

export const useScaleStateSelector = (displayName: string) => {
  const errors = useSelector(getExecutionError)
  const hasError = useMemo(() => {
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  }, [displayName, errors])

  const isEditMode = useSelector(getIsILLAEditMode)

  return getScaleSquareState(hasError, isEditMode)
}
