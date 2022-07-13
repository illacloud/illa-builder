import { FC, useContext } from "react"
import { ListItem } from "./listItem"
import { DatasetSetterContext } from "./context/datasetsListContext"

export const ListBody: FC = () => {
  const { optionItems } = useContext(DatasetSetterContext)

  return (
    <>
      {optionItems.map((item, index) => {
        return <ListItem key={item.name ?? ""} index={index} {...item} />
      })}
    </>
  )
}
