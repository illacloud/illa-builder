import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { destroyExecutionTree } from "@/redux/currentApp/executionTree/executionListener"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"

export const useDestroyApp = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(executionActions.resetExecutionResultReducer())
      dispatch(configActions.resetConfig())
      dispatch(actionActions.resetActionReducer())
      dispatch(componentsActions.resetComponentsReducer())
      destroyExecutionTree()
    }
  }, [dispatch])
}
