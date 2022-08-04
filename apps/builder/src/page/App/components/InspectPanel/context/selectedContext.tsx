import { createContext, ReactNode, FC } from "react"

interface Injected {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string | null
  widgetProps: Record<string, any>
  widgetOrAction: "WIDGET" | "ACTION"
  handleUpdateDsl: (attrPath: string, value: any) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  widgetType: string
  widgetDisplayName: string
  widgetParentDisplayName: string | null
  widgetProps: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
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
  } = props

  const value = {
    widgetType,
    widgetDisplayName,
    widgetParentDisplayName,
    widgetProps,
    widgetOrAction,
    handleUpdateDsl,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
