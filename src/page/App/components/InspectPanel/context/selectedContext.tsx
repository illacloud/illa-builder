import { createContext, ReactNode, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySingleSelected } from "@/redux/currentApp/editor/inspect/inspectSelector"
import { inspectActions } from "@/redux/currentApp/editor/inspect/inspectSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

interface Injected {
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: any) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export const SelectedProvider: FC<Props> = ({ children }) => {
  const panelConfig = useSelector(getWidgetInspectBySingleSelected)

  const dispatch = useDispatch()

  const handleUpdatePanelConfig = (value: Record<string, any>) => {
    if (!panelConfig || !panelConfig.widgetDisplayName) return
    dispatch(
      inspectActions.updateWidgetPanelConfig({
        displayName: panelConfig.widgetDisplayName,
        value,
      }),
    )
  }

  const handleUpdateDsl = (value: Record<string, any>) => {
    if (!panelConfig || !panelConfig.widgetDisplayName) return
    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: panelConfig.widgetDisplayName,
        newProps: value,
      }),
    )
  }

  const value = {
    panelConfig: panelConfig || {},
    handleUpdateDsl: handleUpdateDsl,
    handleUpdatePanelConfig,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SingleSelectContext"
