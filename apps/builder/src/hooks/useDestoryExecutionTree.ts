import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { cursorActions } from "@/redux/currentApp/cursor/cursorSlice"
import { dragShadowActions } from "@/redux/currentApp/dragShadow/dragShadowSlice"
import { destroyExecutionTree } from "@/redux/currentApp/executionTree/executionListener"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { removeAllActionPeriod } from "@/utils/action/runAction"
import IllaUndoRedoManager from "@/utils/undoRedo/undo"

export const useDestroyApp = () => {
  const dispatch = useDispatch()

  const { appId } = useParams()

  useEffect(() => {
    return () => {
      dispatch(executionActions.resetExecutionResultReducer())
      dispatch(configActions.resetConfig())
      dispatch(actionActions.resetActionReducer())
      dispatch(componentsActions.resetComponentsReducer())
      dispatch(cursorActions.resetCursorReducer())
      dispatch(dragShadowActions.resetDragShadowInfoReducer())
      destroyExecutionTree()
      removeAllActionPeriod()
      IllaUndoRedoManager.destroy()
    }
  }, [dispatch, appId])
}
