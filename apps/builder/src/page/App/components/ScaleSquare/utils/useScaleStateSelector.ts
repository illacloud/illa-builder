import { useMemo } from "react"
import { useSelector } from "react-redux"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { getScaleSquareState } from "../components/ResizingAndDragContainer/utils"

export const useScaleStateSelector = (displayName: string) => {
  const errors = useSelector(getExecutionError)
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

  const isEditMode = useSelector(getIsILLAEditMode)

  return getScaleSquareState(hasError, isEditMode)
}
