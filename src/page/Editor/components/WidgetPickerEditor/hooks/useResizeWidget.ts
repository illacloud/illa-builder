import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { widgetStatesActions } from "@/redux/reducers/editorReducer/widgetStatesReducer"

export const useResizeWidget = () => {
  const dispatch = useDispatch()
  return useCallback(
    (isResizing: boolean) => {
      dispatch(widgetStatesActions.setWidgetResizing(isResizing))
    },
    [dispatch],
  )
}

// let Resize = useResizeWidget()
// Resize(true)
