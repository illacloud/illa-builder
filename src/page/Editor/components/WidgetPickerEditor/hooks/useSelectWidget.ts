import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { widgetStatesActions } from "@/redux/reducers/editorReducer/widgetStatesReducer"

export const useSelectWidget = () => {
  const dispatch = useDispatch()
  return {
    selectWidget: useCallback(
      (widgetId?: string, isMultiSelect?: boolean) => {
        dispatch(widgetStatesActions.selectWidget({ widgetId, isMultiSelect }))
      },
      [dispatch],
    ),
    focusWidget: useCallback(
      (widgetId?: string) => {
        dispatch(widgetStatesActions.focusWidget({ widgetId }))
      },
      [dispatch],
    ),
    deselectAll: useCallback(() => {
      dispatch(widgetStatesActions.selectMultipleWidgets({ widgetIds: [] }))
    }, [dispatch]),
  }
}
