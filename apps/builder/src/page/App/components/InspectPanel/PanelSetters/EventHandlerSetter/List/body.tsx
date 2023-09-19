import { FC } from "react"
import { EventHandlerEmpty } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/List/empty"
import { ListBodyProps } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/List/interface"
import { ListItem } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/List/item"

export const ListBody: FC<ListBodyProps> = (props) => {
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
