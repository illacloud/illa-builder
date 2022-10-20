import { FC, useContext } from "react"
import { TabListSetterContext } from "./context/tabListContext"
import { ListItem } from "./listItem"

export const ListBody: FC = () => {
  const { list } = useContext(TabListSetterContext)

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
