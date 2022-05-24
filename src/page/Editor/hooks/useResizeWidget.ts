import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { widgetStatesActions } from "@/redux/editor/widgetStatesReducer"

export const useResizeWidget = () => {
  const dispatch = useDispatch()
  return useCallback(
    (isResizing: boolean) => {
      dispatch(widgetStatesActions.setWidgetResizing(isResizing))
    },
    [dispatch],
  )
}
