import { FC, useContext } from "react"
import { ViewListSetterContext } from "./context/viewsListContext"
import { ListItem } from "./listItem"

export const ListBody: FC = () => {
  const { list } = useContext(ViewListSetterContext)
  console.log(list, "TabList useContext")

  if (!Array.isArray(list)) return null
  return (
    <>
      {list.map((item, index) => {
        const { id } = item
        return <ListItem value={item} key={id} index={index} />
      })}
    </>
  )
}
