import { FC, useContext, useEffect, useState } from "react"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { EmptyBody } from "@/page/App/components/PanelSetters/OptionListSetter/empty"
import { ListItem } from "./listItem"
import { isEqual } from "lodash"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { AnimatePresence, Reorder } from "framer-motion"

export const ListBody: FC = () => {
  const { optionItems, handleUpdateDsl, attrPath } = useContext(
    OptionListSetterContext,
  )

  const [items, setItems] = useState(optionItems)

  useEffect(() => {
    if (!isEqual(optionItems, items)) {
      setItems(optionItems)
    }
  }, [optionItems])

  if (!optionItems || !Array.isArray(optionItems) || optionItems.length === 0)
    return <EmptyBody />

  return (
    <AnimatePresence initial={false}>
      <Reorder.Group
        axis="y"
        initial={false}
        values={items}
        onReorder={setItems}
        css={removeNativeStyle}
      >
        {items.map((item, index) => {
          const { label, value, id } = item
          return (
            <Reorder.Item
              initial={false}
              css={removeNativeStyle}
              key={item.id}
              value={item}
              onDragEnd={() => {
                handleUpdateDsl(attrPath, items)
              }}
            >
              <ListItem
                key={id}
                id={id}
                label={label}
                value={value}
                index={index}
              />
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </AnimatePresence>
  )
}
