import { FC, useCallback, useContext } from "react"
import { ListItem } from "./listItem"
import { v4 } from "uuid"
import { DatasetsListContext } from "./context/datasetsListContext"

export const ListBody: FC = () => {
  const { options, handleUpdateDsl, widgetId } = useContext(DatasetsListContext)
  console.log("ListBody", options)
  if (!options || !Array.isArray(options)) return null

  const handleUpdateItem = useCallback(
    (index: number, value: Record<string, any>) => {
      const newOptions = [...options]
      newOptions[index] = {
        ...newOptions[index],
        ...value,
      }
      handleUpdateDsl(newOptions)
    },
    [options, handleUpdateDsl],
  )

  const handleCopyItem = useCallback(
    (index) => {
      const newOptions = [...options]
      const newItem = { ...newOptions[index] }
      newItem.key = `option-${v4()}`
      newOptions.splice(index + 1, 0, newItem)
      handleUpdateDsl(newOptions)
    },
    [options, handleUpdateDsl],
  )

  const handleDeleteItem = useCallback(
    (index) => {
      const newOptions = [...options]
      newOptions.splice(index, 1)
      handleUpdateDsl(newOptions)
    },
    [options, handleUpdateDsl],
  )

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = options[dragIndex]
      const newOptions = [...options]
      newOptions.splice(dragIndex, 1)
      newOptions.splice(hoverIndex, 0, dragOptionItem)
      handleUpdateDsl(newOptions)
    },
    [options, handleUpdateDsl],
  )

  return (
    <>
      {options.map((item, index) => {
        const { name, key, values, lineColor, hidden } = item
        console.log("ListItem", item)
        return (
          <ListItem
            key={`${widgetId}-${key}`}
            label={name ?? "set"}
            value={values}
            index={index}
            color={lineColor}
            id={key ?? ""}
            hidden={hidden}
            moveItem={moveItem}
            aggregationMethod={item.aggregationMethod}
            handleUpdateItem={handleUpdateItem}
            handleCopyItem={handleCopyItem}
            handleDeleteItem={handleDeleteItem}
          />
        )
      })}
    </>
  )
}
