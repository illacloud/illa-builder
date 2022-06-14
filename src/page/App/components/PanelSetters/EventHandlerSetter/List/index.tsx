import { FC, useCallback } from "react"
import ListItem from "./item"
import { v4 } from "uuid"
import { ListProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/interface"
import { BaseEventItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { transformEvent } from "@/page/App/components/PanelSetters/EventHandlerSetter/utils"

const List: FC<ListProps> = (props) => {
  const { events, dslEvents, handleUpdate, childrenSetter } = props

  const handleCopyItem = useCallback(
    (index) => {
      const newOptions = [...events]
      const newItem = { ...newOptions[index] }
      const newDSLEvents = [...dslEvents]
      const newDSLEvent = { ...newDSLEvents[index] }
      newItem.id = `events-${v4()}`
      newOptions.splice(index + 1, 0, newItem)
      newDSLEvents.splice(index + 1, 0, newDSLEvent)
      handleUpdate(newOptions, newDSLEvents)
    },
    [events, handleUpdate],
  )

  const handleDeleteItem = useCallback(
    (index) => {
      const newOptions = [...events]
      const newDSLEvents = [...dslEvents]
      newDSLEvents.splice(index, 1)
      newOptions.splice(index, 1)
      handleUpdate(newOptions, newDSLEvents)
    },
    [events, dslEvents, handleUpdate],
  )

  const handleUpdateItem = useCallback(
    (index: number, value: BaseEventItem) => {
      const newOptions = [...events]
      const newDSLEvents = [...dslEvents]
      newOptions[index] = {
        ...newOptions[index],
        ...value,
      }
      const script = transformEvent(newOptions[index])
      newDSLEvents[index] = {
        ...newDSLEvents[index],
        ...script,
      }
      handleUpdate(newOptions, newDSLEvents)
      console.log(script)
    },
    [events, dslEvents, handleUpdate],
  )

  return (
    <div>
      {events.map((event, index) => (
        <ListItem
          key={event.id}
          index={index}
          event={event}
          handleCopyItem={handleCopyItem}
          handleDeleteItem={handleDeleteItem}
          handleUpdateItem={handleUpdateItem}
          childrenSetter={childrenSetter}
        />
      ))}
    </div>
  )
}

export default List
