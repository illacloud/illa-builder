import { FC, ReactNode, createContext } from "react"

interface Injected {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string | null
  widgetProps: Record<string, any>
  widgetOrAction: "WIDGET" | "ACTION"
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL: (updateSlice: Record<string, any>) => void
  handleUpdateOtherMultiAttrDSL: (
    displayName: string,
    updateSlice: Record<string, any>,
  ) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string | null
  widgetProps: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL: (updateSlice: Record<string, any>) => void
  handleUpdateOtherMultiAttrDSL: (
    displayName: string,
    updateSlice: Record<string, any>,
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
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
