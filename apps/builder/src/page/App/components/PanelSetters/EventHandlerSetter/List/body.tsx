import { FC } from "react"
import { ListItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/item"
import { ListBodyProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/interface"
import { EventHandlerEmpty } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/empty"

export const ListBody: FC<ListBodyProps> = props => {
  const { events } = props

  if (!events || events.length === 0) return <EventHandlerEmpty />
  return (
    <>
      {events.map((item, index) => {
        return <ListItem key={item.id} index={index} />
      })}
    </>
  )
}
