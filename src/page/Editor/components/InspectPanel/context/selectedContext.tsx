import { createContext, ReactNode, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySelectId } from "@/redux/currentApp/editor/inspect/inspectSelector"
import { inspectActions } from "@/redux/currentApp/editor/inspect/inspectSlice"
import { dslActions } from "@/redux/currentApp/editor/dsl/dslSlice"

interface Injected {
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: any) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

// TODO: only support single select,wait to multi
export const SelectedProvider: FC<Props> = ({ children }) => {
  const panelConfig = useSelector(getWidgetInspectBySelectId) ?? {}

  const dispatch = useDispatch()

  const handleUpdatePanelConfig = (value: Record<string, any>) => {
    dispatch(
      inspectActions.updateWidgetPanelConfig({
        id: panelConfig.id,
        value,
      }),
    )
  }

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
