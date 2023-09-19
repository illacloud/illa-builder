import { FC, ReactNode, createContext, useCallback } from "react"
import { CellItemProps } from "@/page/App/components/InspectPanel/PanelSetters/TableSetter/CellSetter/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { generateCellItemId } from "../utils/generateNewColumns"

interface ProviderProps {
  columnItems: CellItemProps[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDeleteColumnItem: (index: number) => void
  handleCopyColumnItem: (index: number) => void
  handleMoveColumnItem: (dragIndex: number, hoverIndex: number) => void
  handleUpdateItemVisible: (attrName: string, visible?: boolean) => void
}

export const ColumnListSetterContext = createContext<Inject>({} as Inject)

export const ColumnsSetterProvider: FC<ProviderProps> = (props) => {
  const { columnItems, attrPath, handleUpdateDsl } = props

  const handleDeleteColumnItem = useCallback(
    (index: number) => {
      const updatedArray = columnItems.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      handleUpdateDsl(attrPath, updatedArray)
    },
    [columnItems, handleUpdateDsl, attrPath],
  )

  const handleCopyColumnItem = useCallback(
    (index: number) => {
      let targetOptionItem = columnItems.find(
        (optionItem: Record<string, any>, i: number) => {
          return i === index
        },
      )
      if (!targetOptionItem) return
      targetOptionItem = {
        ...targetOptionItem,
        id: generateCellItemId(),
      }
      const updatedArray = [...columnItems, targetOptionItem]
      handleUpdateDsl(attrPath, updatedArray)
    },
    [columnItems, handleUpdateDsl, attrPath],
  )

  const handleMoveColumnItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = columnItems[dragIndex]
      const newOptions = [...columnItems]
      newOptions.splice(dragIndex, 1)
      newOptions.splice(hoverIndex, 0, dragOptionItem)
      handleUpdateDsl(attrPath, newOptions)
    },
    [attrPath, columnItems, handleUpdateDsl],
  )

  const handleUpdateItemVisible = useCallback(
    (attrName: string, visible?: boolean) => {
      handleUpdateDsl(attrName, visible)
    },
    [handleUpdateDsl],
  )

  const value = {
    ...props,
    handleDeleteColumnItem,
    handleCopyColumnItem,
    handleMoveColumnItem,
    handleUpdateItemVisible,
  }

  return (
    <ColumnListSetterContext.Provider value={value}>
      {props.children}
    </ColumnListSetterContext.Provider>
  )
}

ColumnsSetterProvider.displayName = "ColumnsSetterProvider"
