import { FC, ReactNode, createContext } from "react"

interface Injected {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string | null
  widgetProps: Record<string, any>
  widgetOrAction: "WIDGET" | "ACTION"
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL: (updateSlice: Record<string, unknown>) => void
  handleUpdateOtherMultiAttrDSL: (
    displayName: string,
    updateSlice: Record<string, any>,
  ) => void
  handleUpdateExecutionResult?: (
    displayName: string,
    updateSlice: Record<string, unknown>,
  ) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string | null
  widgetProps: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL: (updateSlice: Record<string, unknown>) => void
  handleUpdateOtherMultiAttrDSL: (
    displayName: string,
    updateSlice: Record<string, unknown>,
  ) => void
  handleUpdateExecutionResult?: (
    displayName: string,
    updateSlice: Record<string, unknown>,
  ) => void
  widgetOrAction: "WIDGET" | "ACTION"
  children?: ReactNode
}

export const SelectedProvider: FC<Props> = (props) => {
  const {
    children,
    widgetType,
    widgetDisplayName,
    widgetParentDisplayName,
    widgetProps,
    widgetOrAction,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    handleUpdateExecutionResult,
  } = props

  const value = {
    widgetType,
    widgetDisplayName,
    widgetParentDisplayName,
    widgetProps,
    widgetOrAction,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    handleUpdateExecutionResult,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
