import { FC, useContext } from "react"
import { ListItem } from "./listItem"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"

export const ListBody: FC = () => {
  const { optionItems } = useContext(OptionListSetterContext)

  if (!optionItems || !Array.isArray(optionItems)) return null

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
