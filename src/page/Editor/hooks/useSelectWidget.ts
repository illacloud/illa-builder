import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { widgetStatesActions } from "@/redux/currentApp/editor/widgetStates/widgetStatesSlice"

export const useSelectWidget = () => {
  const dispatch = useDispatch()
  return {
    selectWidget: useCallback(
      (id?: string, isMultiSelect?: boolean) => {
        dispatch(widgetStatesActions.selectWidget({ id, isMultiSelect }))
      },
      [dispatch],
    ),
    focusWidget: useCallback(
      (id?: string) => {
        dispatch(widgetStatesActions.focusWidget({ id }))
      },
      [dispatch],
    ),
    deselectAll: useCallback(() => {
      dispatch(widgetStatesActions.selectMultipleWidgets({ ids: [] }))
    }, [dispatch]),
  }
}
