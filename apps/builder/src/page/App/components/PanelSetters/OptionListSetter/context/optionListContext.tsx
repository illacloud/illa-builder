import { FC, ReactNode, createContext, useCallback } from "react"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { generateNewOptionItem } from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"

interface ProviderProps {
  optionItems: Record<string, any>[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  allViewsKeys: string[]
  generateItemId: () => string
  itemName?: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDeleteOptionItem: (index: number) => void
  handleCopyOptionItem: (index: number) => void
  handleMoveOptionItem: (dragIndex: number, hoverIndex: number) => void
}

export const OptionListSetterContext = createContext<Inject>({} as Inject)

export const OptionListSetterProvider: FC<ProviderProps> = (props) => {
  const {
    optionItems,
    attrPath,
    itemName,
    handleUpdateDsl,
    generateItemId,
    allViewsKeys,
  } = props

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

  const handleCopyOptionItem = useCallback(
    (index: number) => {
      let targetOptionItem = optionItems.find(
        (optionItem: Record<string, any>, i: number) => {
          return i === index
        },
      )
      if (!targetOptionItem) return
      const newItem = generateNewOptionItem(allViewsKeys, itemName)
      targetOptionItem = {
        ...targetOptionItem,
        value: newItem?.value,
        id: generateItemId(),
      }
      const updatedArray = [...optionItems, targetOptionItem]
      handleUpdateDsl(attrPath, updatedArray)
    },
    [
      optionItems,
      allViewsKeys,
      itemName,
      generateItemId,
      handleUpdateDsl,
      attrPath,
    ],
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
    handleCopyOptionItem,
    handleMoveOptionItem,
  }

  return (
    <OptionListSetterContext.Provider value={value}>
      {props.children}
    </OptionListSetterContext.Provider>
  )
}

OptionListSetterProvider.displayName = "OptionListSetterProvider"
