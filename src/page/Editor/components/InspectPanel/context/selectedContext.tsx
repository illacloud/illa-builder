import { createContext, ReactNode, FC, useContext, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySelectId } from "@/redux/currentApp/editor/inspect/inspectSelector"
import { inspectActions } from "@/redux/currentApp/editor/inspect/inspectSlice"
import { dslActions } from "@/redux/currentApp/editor/dsl/dslSlice"
import { GLOBAL_DATA_CONTEXT } from "@/page/Editor/context/globalDataProvider"

interface Injected {
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: any) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

// TODO: @WeiChen only support single select,wait to multi
export const SelectedProvider: FC<Props> = ({ children }) => {
  const panelConfig = useSelector(getWidgetInspectBySelectId) ?? {}

  const dispatch = useDispatch()

  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  // TODO: @WeiChen wait new drag and drop
  const handleUpdatePanelConfig = useCallback(
    (value: Record<string, any>) => {
      dispatch(
        inspectActions.updateWidgetPanelConfig({
          id: panelConfig.id,
          value,
        }),
      )
    },
    [dispatch, globalData, panelConfig],
  )

  const handleUpdateDsl = (value: Record<string, any>) => {
    dispatch(
      dslActions.updateDslProps({
        targetId: panelConfig.id,
        newState: {
          ...value,
        },
      }),
    )
  }

  const value = {
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
