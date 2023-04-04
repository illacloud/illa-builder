import { FC, ReactNode, createContext, useRef } from "react"

interface MouseMoveContextInjected {
  hoveredWidgets: string[]
  addHoverWidget: (widgetDisplayName: string) => void
  deleteHoverWidget: (widgetDisplayName: string) => void
  resetHoverWidget: () => void
}

export const MouseMoveContext = createContext<MouseMoveContextInjected>(
  {} as MouseMoveContextInjected,
)

interface MouseMoveProviderProps {
  children: ReactNode
}

export const MouseMoveProvider: FC<MouseMoveProviderProps> = (props) => {
  const { children } = props
  const hoverWidgetsRef = useRef<string[]>([])

  const addHoverWidget = (widgetDisplayName: string) => {
    hoverWidgetsRef.current.push(widgetDisplayName)
  }

  const deleteHoverWidget = (widgetDisplayName: string) => {
    const index = hoverWidgetsRef.current.indexOf(widgetDisplayName)
    if (index === -1) return
    hoverWidgetsRef.current.splice(index, 1)
  }
  const resetHoverWidget = () => {
    hoverWidgetsRef.current = []
  }
  const value = {
    hoveredWidgets: hoverWidgetsRef.current,
    addHoverWidget,
    deleteHoverWidget,
    resetHoverWidget,
  }

  return (
    <MouseMoveContext.Provider value={value}>
      {children}
    </MouseMoveContext.Provider>
  )
}
