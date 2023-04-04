import { FC, ReactNode, createContext, useRef } from "react"
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/config/configSlice"

interface MouseHoverContextInjected {
  hoveredWidgets: string[]
  addHoverWidget: (widgetDisplayName: string) => void
  deleteHoverWidget: (widgetDisplayName: string) => void
  resetHoverWidget: () => void
}

export const MouseHoverContext = createContext<MouseHoverContextInjected>(
  {} as MouseHoverContextInjected,
)

interface MouseHoverProviderProps {
  children: ReactNode
}

export const MouseHoverProvider: FC<MouseHoverProviderProps> = (props) => {
  const { children } = props
  const hoverWidgetsRef = useRef<string[]>([])
  const dispatch = useDispatch()

  const addHoverWidget = (widgetDisplayName: string) => {
    hoverWidgetsRef.current.push(widgetDisplayName)
    hoverWidgetsRef.current = Array.from(new Set(hoverWidgetsRef.current))
    const currentHoverWidgets = [...hoverWidgetsRef.current]
    dispatch(configActions.updateHoveredComponent(currentHoverWidgets))
  }

  const deleteHoverWidget = (widgetDisplayName: string) => {
    const index = hoverWidgetsRef.current.indexOf(widgetDisplayName)
    if (index === -1) return
    hoverWidgetsRef.current.splice(index, 1)
    const currentHoverWidgets = [...hoverWidgetsRef.current]
    dispatch(configActions.updateHoveredComponent(currentHoverWidgets))
  }
  const resetHoverWidget = () => {
    hoverWidgetsRef.current = []
    dispatch(configActions.updateHoveredComponent([]))
  }
  const value = {
    hoveredWidgets: hoverWidgetsRef.current,
    addHoverWidget,
    deleteHoverWidget,
    resetHoverWidget,
  }

  return (
    <MouseHoverContext.Provider value={value}>
      {children}
    </MouseHoverContext.Provider>
  )
}
