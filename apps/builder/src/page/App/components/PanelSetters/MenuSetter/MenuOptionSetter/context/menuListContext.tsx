import { createContext, FC, ReactNode, useCallback } from "react"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import {
  generateMenuItemId,
  generateNewSubMenuItem,
} from "../utils/generateNewMenu"
import { MenuList } from "@/widgetLibrary/MenuWidget/interface"

interface ProviderProps {
  columnItems: MenuList[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDeleteMenuItem: (index: number) => void
  handleCopyColumnItem: (index: number) => void
  handleAddSubMenuItem: (index: number) => void
  handleDeleteSubMenuItem: (index: number, subIndex: number) => void
  handleMoveColumnItem: (dragIndex: number, hoverIndex: number) => void
}

export const MenuListSetterContext = createContext<Inject>({} as Inject)

export const MenusSetterProvider: FC<ProviderProps> = (props) => {
  const { columnItems, attrPath, handleUpdateDsl } = props

  const handleDeleteMenuItem = useCallback(
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

  const handleDeleteSubMenuItem = useCallback(
    (index: number, subIndex: number) => {
      const updatedArray = JSON.parse(JSON.stringify(columnItems))
      updatedArray[index].subMenu = updatedArray[index].subMenu?.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== subIndex
        },
      )
      handleUpdateDsl(attrPath, updatedArray)
    },
    [columnItems, handleUpdateDsl, attrPath],
  )

  const handleAddSubMenuItem = useCallback(
    (index: number) => {
      const updatedArray = JSON.parse(JSON.stringify(columnItems))
      const num = (updatedArray[index]?.subMenu?.length ?? 0) + 1
      const newItem = generateNewSubMenuItem(num)
      if (updatedArray[index].subMenu) {
        updatedArray[index].subMenu.push(newItem)
      } else {
        updatedArray[index]["subMenu"] = [newItem]
      }

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
        id: generateMenuItemId(),
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

  const value = {
    ...props,
    handleDeleteMenuItem,
    handleCopyColumnItem,
    handleMoveColumnItem,
    handleAddSubMenuItem,
    handleDeleteSubMenuItem,
  }

  return (
    <MenuListSetterContext.Provider value={value}>
      {props.children}
    </MenuListSetterContext.Provider>
  )
}

MenusSetterProvider.displayName = "ColumnsSetterProvider"
