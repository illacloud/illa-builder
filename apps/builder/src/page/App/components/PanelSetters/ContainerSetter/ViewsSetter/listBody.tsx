import { FC, useContext } from "react"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { ListItem } from "./listItem"

export const ListBody: FC = () => {
  const { viewsList } = useContext(ViewListSetterContext)

  if (!Array.isArray(viewsList)) return null
  return (
    <>
      {viewsList.map((item, index) => {
        const { id } = item
        return <ListItem value={item} key={id} index={index} />
      })}
    </>
  )
}
