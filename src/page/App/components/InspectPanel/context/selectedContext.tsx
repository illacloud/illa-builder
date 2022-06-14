import { createContext, ReactNode, FC, useContext, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySingleSelected } from "@/redux/currentApp/editor/inspect/inspectSelector"
import { inspectActions } from "@/redux/currentApp/editor/inspect/inspectSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"

interface Injected {
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: any) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  propsPanelConfig?: Record<string, any>
  handleUpdateItemPanelConfig?: (value: Record<string, any>) => void
  handleUpdateItemDsl?: (value: Record<string, any>) => void
  children?: ReactNode
}

export const SelectedProvider: FC<Props> = ({
  propsPanelConfig,
  children,
  handleUpdateItemPanelConfig,
  handleUpdateItemDsl,
}) => {
  const allPanelConfig = useSelector(getWidgetInspectBySingleSelected)
  const dispatch = useDispatch()

  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const handleUpdatePanelConfig = useCallback(
    (value: Record<string, any>) => {
      if (!allPanelConfig || !allPanelConfig.widgetDisplayName) return
      dispatch(
        inspectActions.updateWidgetPanelConfig({
          displayName: allPanelConfig.widgetDisplayName,
          value,
        }),
      )
    },
    [allPanelConfig],
  )

  const handleUpdateDsl = (value: Record<string, any>) => {
    if (!allPanelConfig || !allPanelConfig.widgetDisplayName) return
    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: allPanelConfig.widgetDisplayName,
        newProps: value,
      }),
    )
  }

  const value = {
    panelConfig: propsPanelConfig ?? allPanelConfig ?? {},
    handleUpdateDsl: handleUpdateItemDsl ?? handleUpdateDsl,
    handleUpdatePanelConfig:
      handleUpdateItemPanelConfig ?? handleUpdatePanelConfig,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
