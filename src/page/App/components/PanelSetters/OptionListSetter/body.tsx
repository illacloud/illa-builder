import { FC, useCallback } from "react"
import { ListItem } from "./listItem"
import { v4 } from "uuid"
import { OptionListBodyProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { generateOptionItemId } from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"

export const ListBody: FC<OptionListBodyProps> = (props) => {
  const { optionItems, handleUpdateDsl, attrName } = props

  if (!optionItems || !Array.isArray(optionItems)) return null

  const handleUpdateItem = useCallback(
    (index: number, value: Record<string, any>) => {
      const newOptions = [...optionItems]
      newOptions[index] = {
        ...newOptions[index],
        ...value,
      }
      handleUpdateDsl(attrName, newOptions)
    },
    [attrName, optionItems, handleUpdateDsl],
  )

  const handleCopyItem = useCallback(
    (index) => {
      const newOptions = [...optionItems]
      const newItem = { ...newOptions[index] }
      newItem.id = generateOptionItemId()
      newOptions.splice(index + 1, 0, newItem)
      handleUpdateDsl(attrName, newOptions)
    },
    [attrName, optionItems, handleUpdateDsl],
  )

  const handleDeleteItem = useCallback(
    (index) => {
      const newOptions = [...optionItems]
      newOptions.splice(index, 1)
      handleUpdateDsl(attrName, newOptions)
    },
    [attrName, optionItems, handleUpdateDsl],
  )

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = optionItems[dragIndex]
      const newOptions = [...optionItems]
      newOptions.splice(dragIndex, 1)
      newOptions.splice(hoverIndex, 0, dragOptionItem)
      handleUpdateDsl(attrName, newOptions)
    },
    [attrName, optionItems, handleUpdateDsl],
  )

  return (
    <>
      {optionItems.map((item, index) => {
        const { label, value, disabled, id } = item
        return (
          <ListItem
            key={id}
            label={label}
            value={value}
            disabled={disabled}
            index={index}
            id={id}
            moveItem={moveItem}
            handleUpdateItem={handleUpdateItem}
            handleCopyItem={handleCopyItem}
            handleDeleteItem={handleDeleteItem}
          />
        )
      })}
    </>
  )
}
