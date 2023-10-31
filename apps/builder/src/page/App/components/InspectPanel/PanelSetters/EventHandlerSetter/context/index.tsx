import { FC, ReactNode, createContext, useCallback } from "react"
import { v4 } from "uuid"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

interface ProviderProps {
  eventItems: any[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  children: ReactNode
  widgetType: string
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDeleteEventItem: (index: number) => void
  handleCopyEventItem: (index: number) => void
}

export const BaseEventHandlerContext = createContext<Inject>({} as Inject)

export const BaseEventHandlerProvider: FC<ProviderProps> = (props) => {
  const { eventItems, attrPath, handleUpdateDsl } = props

  const handleDeleteEventItem = useCallback(
    (index: number) => {
      const updatedArray = eventItems.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      handleUpdateDsl(attrPath, updatedArray)
    },
    [eventItems, handleUpdateDsl, attrPath],
  )

  const handleCopyEventItem = useCallback(
    (index: number) => {
      let targetEventItem = eventItems.find(
        (optionItem: Record<string, any>, i: number) => {
          return i === index
        },
      )
      if (!targetEventItem) return
      targetEventItem = {
        ...targetEventItem,
        id: `option-${v4()}`,
      }
      const updatedArray = [...eventItems, targetEventItem]
      handleUpdateDsl(attrPath, updatedArray)
    },
    [eventItems, handleUpdateDsl, attrPath],
  )

  const value = {
    ...props,
    handleDeleteEventItem,
    handleCopyEventItem,
  }

  return (
    <BaseEventHandlerContext.Provider value={value}>
      {props.children}
    </BaseEventHandlerContext.Provider>
  )
}

BaseEventHandlerProvider.displayName = "BaseEventHandlerProvider"
