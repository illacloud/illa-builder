import { FC, useCallback, useContext } from "react"
import { ChildrenPanelContext } from "@/page/Editor/components/InspectPanel/context/childrenConfigContext"
import { ListItem } from "./listItem"

export const ListBody: FC = () => {
  const { configPanel, handleUpdateDsl, widgetId } =
    useContext(ChildrenPanelContext)

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
            handleUpdateDsl={handleUpdateItem}
          />
        )
      })}
    </>
  )
}
