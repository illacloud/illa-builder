import { createContext, ReactNode, FC, useCallback } from "react"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { DatasetConfig } from "@/widgetLibrary/Chart/interface"

interface ProviderProps {
  optionItems: DatasetConfig[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDeleteOptionItem: (index: number) => void
  handleMoveOptionItem: (dragIndex: number, hoverIndex: number) => void
}

export const DatasetSetterContext = createContext<Inject>({} as Inject)

export const DatasetContextSetterProvider: FC<ProviderProps> = (props) => {
  const { optionItems, attrPath, handleUpdateDsl } = props

  const handleDeleteOptionItem = useCallback(
    (index: number) => {
      const updatedArray = optionItems.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      handleUpdateDsl(attrPath, updatedArray)
    },
    [optionItems, handleUpdateDsl, attrPath],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = optionItems[dragIndex]
      const newOptions = [...optionItems]
      newOptions.splice(dragIndex, 1)
      newOptions.splice(hoverIndex, 0, dragOptionItem)
      handleUpdateDsl(attrPath, newOptions)
    },
    [attrPath, optionItems, handleUpdateDsl],
  )

  const value = {
    ...props,
    handleDeleteOptionItem,
    handleMoveOptionItem,
  }

  return (
    <DatasetSetterContext.Provider value={value}>
      {props.children}
    </DatasetSetterContext.Provider>
  )
}

DatasetSetterContext.displayName = "OptionListSetterProvider"
