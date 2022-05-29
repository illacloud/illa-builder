import { FC, useCallback, useContext } from "react"
import { OptionListSetterContext } from "./context/optionListContext"
import { ListItem } from "./listItem"
import { v4 } from "uuid"

export const ListBody: FC = () => {
  const { configPanel, handleUpdateDsl, widgetId } = useContext(
    OptionListSetterContext,
  )

  if (!configPanel || !Array.isArray(configPanel)) return null

  const handleUpdateItem = useCallback(
    (index: number, value: Record<string, any>) => {
      const newConfigPanel = [...configPanel]
      newConfigPanel[index] = {
        ...newConfigPanel[index],
        ...value,
      }
      handleUpdateDsl(newConfigPanel)
    },
    [configPanel, handleUpdateDsl],
  )

  const handleCopyItem = useCallback(
    (index) => {
      const newConfigPanel = [...configPanel]
      const newItem = { ...newConfigPanel[index] }
      newItem.id = `option-${v4()}`
      newConfigPanel.splice(index + 1, 0, newItem)
      handleUpdateDsl(newConfigPanel)
    },
    [configPanel, handleUpdateDsl],
  )

  const handleDeleteItem = useCallback(
    (index) => {
      const newConfigPanel = [...configPanel]
      newConfigPanel.splice(index, 1)
      handleUpdateDsl(newConfigPanel)
    },
    [configPanel, handleUpdateDsl],
  )

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragConfigItem = configPanel[dragIndex]
      const newConfigPanel = [...configPanel]
      newConfigPanel.splice(dragIndex, 1)
      newConfigPanel.splice(hoverIndex, 0, dragConfigItem)
      handleUpdateDsl(newConfigPanel)
    },
    [configPanel, handleUpdateDsl],
  )

  return (
    <>
      {configPanel.map((item, index) => {
        const { label, value, disabled, id } = item
        return (
          <ListItem
            key={`${widgetId}-${id}`}
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
