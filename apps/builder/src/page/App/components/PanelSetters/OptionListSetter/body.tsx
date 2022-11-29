import { FC, useContext } from "react"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { EmptyBody } from "@/page/App/components/PanelSetters/OptionListSetter/empty"
import { ListItem } from "./listItem"

export const ListBody: FC = () => {
  const { optionItems } = useContext(OptionListSetterContext)

  if (!optionItems || !Array.isArray(optionItems) || optionItems.length === 0)
    return <EmptyBody />

  return (
    <>
      {optionItems.map((item, index) => {
        const { label, value, id } = item
        return (
          <ListItem
            key={id}
            id={id}
            label={label}
            value={value}
            index={index}
          />
        )
      })}
    </>
  )
}
